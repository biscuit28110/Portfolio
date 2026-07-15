#!/usr/bin/env node
/**
 * Capture des screenshots (page complète + par section) pour chaque viewport configuré.
 *
 * Usage:
 *   node capture.js [--sections=all|hero,about,...] [--viewports=all|mobile,tablet,desktop]
 *                    [--base-url=http://localhost:3000] [--out=.visual-audit/runs/<id>]
 *                    [--no-server] [--dry-run]
 */
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const {
  CONFIG,
  PROJECT_ROOT,
  parseArgs,
  resolveList,
  ensureDir,
  newRunId,
  gitCommit,
} = require("./lib");

async function waitForServer(url, timeoutMs) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
      if (res.ok || res.status < 500) return true;
    } catch {
      // pas encore prêt
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

// locator.scrollIntoViewIfNeeded() peut atterrir n'importe où dans une section
// (ex: sections à scènes "sticky" empilées beaucoup plus hautes que le viewport),
// contrairement à un vrai scroll utilisateur ou un clic de nav (scrollIntoView natif,
// aligné en haut). On force donc un alignement "start" natif, on attend que le scroll
// se stabilise (le CSS scroll-behavior:smooth anime), puis on laisse le temps aux
// animations whileInView/spring de Framer Motion de se déclencher et se stabiliser.
async function scrollSectionIntoView(page, anchor) {
  await page.evaluate((sel) => {
    document.querySelector(sel)?.scrollIntoView({ block: "start" });
  }, anchor);
  let lastY = -1, stable = 0;
  for (let i = 0; i < 30; i++) {
    const y = await page.evaluate(() => window.scrollY);
    if (Math.abs(y - lastY) < 1) {
      stable++;
      if (stable >= 3) break;
    } else {
      stable = 0;
    }
    lastY = y;
    await page.waitForTimeout(100);
  }
  await page.waitForTimeout(1200); // laisse les animations Framer Motion (whileInView, spring) se stabiliser
}

async function isServerUp(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
    return res.ok || res.status < 500;
  } catch {
    return false;
  }
}

function startDevServer() {
  const child = spawn(CONFIG.devCommand, CONFIG.devArgs, {
    cwd: PROJECT_ROOT,
    stdio: "ignore",
    detached: true,
  });
  return child;
}

async function waitForServerDown(url, timeoutMs) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (!(await isServerUp(url))) return true;
    await new Promise((r) => setTimeout(r, 300));
  }
  return false;
}

// next dev/turbopack arrête souvent de répondre sur le port avant d'avoir vraiment
// terminé son arrêt (processus enfant qui traîne, non reaped) : le port qui ne répond
// plus n'est donc PAS une preuve suffisante que le process a quitté. On envoie SIGTERM,
// on laisse une courte grâce, puis on force TOUJOURS un SIGKILL sur le groupe entier
// pour éviter les process orphelins qui s'accumulent d'un run à l'autre.
async function stopDevServer(child, baseUrl) {
  if (!child || child.killed) return;
  try {
    process.kill(-child.pid, "SIGTERM");
  } catch {
    return; // déjà arrêté
  }
  await waitForServerDown(baseUrl, 3000);
  try {
    process.kill(-child.pid, "SIGKILL");
  } catch {
    // déjà arrêté
  }
  await waitForServerDown(baseUrl, 2000);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const baseUrl = args["base-url"] || CONFIG.baseUrl;
  const sections = resolveList(args.sections, CONFIG.sections, "id");
  const viewports = resolveList(args.viewports, CONFIG.viewports, "id");
  const runId = newRunId();
  const outDir = args.out
    ? path.resolve(PROJECT_ROOT, args.out)
    : path.join(PROJECT_ROOT, CONFIG.outDir, "runs", runId);

  const combos = [];
  for (const vp of viewports) {
    combos.push({ file: `full__${vp.id}.png`, section: "full", label: "Page complète", viewport: vp.id, anchor: null });
    for (const sec of sections) {
      combos.push({ file: `${sec.id}__${vp.id}.png`, section: sec.id, label: sec.label, viewport: vp.id, anchor: sec.anchor });
    }
  }

  if (args["dry-run"]) {
    console.log(`[dry-run] ${combos.length} captures prévues (${sections.length} sections x ${viewports.length} viewports + page complète)\n`);
    console.log("Viewports:", viewports.map((v) => `${v.id} (${v.width}x${v.height})`).join(", "));
    console.log("Sections:", sections.map((s) => s.id).join(", "));
    console.log(`\nSortie prévue: ${outDir}`);
    console.table(combos.map(({ file, label, viewport }) => ({ file, section: label, viewport })));
    return;
  }

  let startedServer = false;
  let serverChild = null;
  const up = await isServerUp(baseUrl);
  if (!up) {
    if (args["no-server"]) {
      console.error(`Erreur: ${baseUrl} n'est pas accessible et --no-server est passé. Démarre le serveur toi-même.`);
      process.exit(1);
    }
    console.log(`Serveur non détecté sur ${baseUrl}, démarrage de "${CONFIG.devCommand} ${CONFIG.devArgs.join(" ")}"...`);
    serverChild = startDevServer();
    startedServer = true;
    const ready = await waitForServer(baseUrl, CONFIG.serverStartTimeoutMs);
    if (!ready) {
      await stopDevServer(serverChild, baseUrl);
      console.error(`Erreur: le serveur n'a pas répondu sur ${baseUrl} après ${CONFIG.serverStartTimeoutMs}ms.`);
      process.exit(1);
    }
    console.log("Serveur prêt.");
  }

  ensureDir(outDir);

  const { chromium } = require("playwright");
  const browser = await chromium.launch();
  const manifestFiles = [];

  try {
    for (const vp of viewports) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 2,
      });
      const page = await context.newPage();
      await page.goto(baseUrl, { waitUntil: "networkidle" });
      await page.waitForTimeout(300);

      const fullFile = `full__${vp.id}.png`;
      await page.screenshot({ path: path.join(outDir, fullFile), fullPage: true });
      manifestFiles.push({ file: fullFile, section: "full", viewport: vp.id, width: vp.width, height: vp.height });
      console.log(`captured ${fullFile}`);

      for (const sec of sections) {
        const locator = page.locator(sec.anchor);
        try {
          await scrollSectionIntoView(page, sec.anchor);
          const secFile = `${sec.id}__${vp.id}.png`;
          await locator.screenshot({ path: path.join(outDir, secFile) });
          manifestFiles.push({ file: secFile, section: sec.id, viewport: vp.id, width: vp.width, height: vp.height });
          console.log(`captured ${secFile}`);
        } catch (err) {
          console.warn(`Attention: section "${sec.id}" (${sec.anchor}) introuvable ou non capturable: ${err.message}`);
        }
      }

      await context.close();
    }
  } finally {
    await browser.close();
    if (startedServer) await stopDevServer(serverChild, baseUrl);
  }

  const manifest = {
    runId,
    timestamp: new Date().toISOString(),
    gitCommit: gitCommit(),
    baseUrl,
    sections: sections.map((s) => ({ id: s.id, label: s.label })),
    viewports,
    files: manifestFiles,
  };
  fs.writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(`\nManifest écrit: ${path.join(outDir, "manifest.json")}`);
  console.log(`Run: ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
