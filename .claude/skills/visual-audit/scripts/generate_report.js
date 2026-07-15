#!/usr/bin/env node
/**
 * Compile manifest.json + analysis.json (+ diff.json si présent) en rapport Markdown lisible.
 *
 * Usage:
 *   node generate_report.js --run=.visual-audit/runs/<id> [--out=<run>/report.md]
 */
const fs = require("fs");
const path = require("path");
const { parseArgs, readManifest } = require("./lib");

const SEVERITY_ORDER = { critical: 0, major: 1, minor: 2 };
const SEVERITY_BADGE = { critical: "🔴 critique", major: "🟠 majeur", minor: "🟡 mineur" };

function loadJsonIfExists(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.run) {
    console.error("Usage: node generate_report.js --run=.visual-audit/runs/<id> [--out=<path>]");
    process.exit(1);
  }
  const runDir = path.resolve(args.run);
  const manifest = readManifest(runDir);
  const analysis = loadJsonIfExists(path.join(runDir, "analysis.json"));
  const diff = loadJsonIfExists(path.join(runDir, "diff.json"));
  const outPath = args.out ? path.resolve(args.out) : path.join(runDir, "report.md");

  const resultsByFile = new Map((analysis?.results || []).map((r) => [r.file, r]));
  const diffByFile = new Map((diff?.entries || []).map((e) => [e.file, e]));

  const sectionsById = Object.fromEntries(manifest.sections.map((s) => [s.id, s]));
  const allIssues = [];
  for (const r of analysis?.results || []) {
    for (const issue of r.issues || []) {
      allIssues.push({ ...issue, file: r.file, section: r.section, viewport: r.viewport });
    }
  }
  const counts = { critical: 0, major: 0, minor: 0 };
  for (const i of allIssues) if (counts[i.severity] !== undefined) counts[i.severity]++;

  const lines = [];
  lines.push(`# Rapport d'audit visuel — ${manifest.timestamp}`);
  lines.push("");
  lines.push(`- Run: \`${manifest.runId}\``);
  lines.push(`- Commit: \`${manifest.gitCommit || "n/a"}\``);
  lines.push(`- URL testée: ${manifest.baseUrl}`);
  lines.push(`- Modèle vision: ${analysis?.model || "non analysé"}`);
  lines.push("");
  lines.push("## Résumé");
  lines.push("");
  if (!analysis) {
    lines.push("_Aucune analyse vision disponible pour ce run (analyze.js n'a pas été exécuté)._");
  } else {
    lines.push(`| Sévérité | Nombre |`);
    lines.push(`|---|---|`);
    lines.push(`| 🔴 Critique | ${counts.critical} |`);
    lines.push(`| 🟠 Majeur | ${counts.major} |`);
    lines.push(`| 🟡 Mineur | ${counts.minor} |`);
    lines.push(`| **Total** | **${allIssues.length}** |`);
  }
  if (diff) {
    const changed = diff.entries.filter((e) => e.status === "changed");
    lines.push("");
    lines.push(`**Régression visuelle** (vs baseline \`${diff.baselineDir}\`): ${changed.length} capture(s) modifiée(s).`);
  }
  lines.push("");

  const bySection = new Map();
  for (const f of manifest.files) {
    if (!bySection.has(f.section)) bySection.set(f.section, []);
    bySection.get(f.section).push(f);
  }

  const orderedSectionIds = ["full", ...manifest.sections.map((s) => s.id)];
  for (const sectionId of orderedSectionIds) {
    const files = bySection.get(sectionId);
    if (!files) continue;
    const label = sectionId === "full" ? "Page complète" : sectionsById[sectionId]?.label || sectionId;
    lines.push(`## ${label}`);
    lines.push("");

    for (const f of files) {
      const result = resultsByFile.get(f.file);
      const diffEntry = diffByFile.get(f.file);
      lines.push(`### ${f.viewport} (${f.width}x${f.height})`);
      lines.push("");
      lines.push(`![${f.file}](./${f.file})`);
      lines.push("");

      if (diffEntry && diffEntry.status === "changed") {
        lines.push(`> 🔁 Diff vs baseline: ${diffEntry.diffPercentage}% de pixels changés — [voir le diff](./${diffEntry.diffFile})`);
        lines.push("");
      } else if (diffEntry && diffEntry.status === "size-changed") {
        lines.push(`> 🔁 Dimensions changées vs baseline (${diffEntry.baselineDims.width}x${diffEntry.baselineDims.height} → ${diffEntry.currentDims.width}x${diffEntry.currentDims.height})`);
        lines.push("");
      }

      if (!result) {
        lines.push("_Non analysé._");
      } else if (result.apiError) {
        lines.push(`⚠️ _Erreur API (image non analysée): ${result.apiError}_`);
      } else if (result.parseError) {
        lines.push(`_Erreur d'analyse (réponse du modèle non exploitable): ${result.parseError}_`);
      } else if (!result.issues || result.issues.length === 0) {
        lines.push(`✅ Aucun problème détecté. ${result.summary || ""}`);
      } else {
        const sorted = [...result.issues].sort((a, b) => (SEVERITY_ORDER[a.severity] ?? 9) - (SEVERITY_ORDER[b.severity] ?? 9));
        for (const issue of sorted) {
          lines.push(`- **${SEVERITY_BADGE[issue.severity] || issue.severity}** [${issue.type}] ${issue.description} _(${issue.location})_`);
        }
        if (result.summary) {
          lines.push("");
          lines.push(`_${result.summary}_`);
        }
      }
      lines.push("");
    }
  }

  fs.writeFileSync(outPath, lines.join("\n"));
  console.log(`Rapport écrit: ${outPath}`);
}

main();
