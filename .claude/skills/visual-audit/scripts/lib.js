const fs = require("fs");
const path = require("path");

const CONFIG = require("./config.json");
const PROJECT_ROOT = path.resolve(__dirname, "..", "..", "..", "..");

function parseArgs(argv) {
  const args = {};
  for (const raw of argv) {
    if (!raw.startsWith("--")) continue;
    const [key, ...rest] = raw.slice(2).split("=");
    args[key] = rest.length ? rest.join("=") : true;
  }
  return args;
}

function resolveList(argValue, all, idKey) {
  if (!argValue || argValue === "all") return all;
  const wanted = new Set(String(argValue).split(",").map((s) => s.trim()));
  const resolved = all.filter((item) => wanted.has(item[idKey]));
  const unknown = [...wanted].filter((id) => !all.some((item) => item[idKey] === id));
  if (unknown.length) {
    throw new Error(`Valeurs inconnues: ${unknown.join(", ")} (attendu: ${all.map((i) => i[idKey]).join(", ")})`);
  }
  return resolved;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function newRunId() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

function gitCommit() {
  try {
    return require("child_process")
      .execSync("git rev-parse --short HEAD", { cwd: PROJECT_ROOT })
      .toString()
      .trim();
  } catch {
    return null;
  }
}

function readManifest(runDir) {
  const manifestPath = path.join(runDir, "manifest.json");
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`manifest.json introuvable dans ${runDir}. Lance d'abord capture.js.`);
  }
  return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
}

module.exports = {
  CONFIG,
  PROJECT_ROOT,
  parseArgs,
  resolveList,
  ensureDir,
  newRunId,
  gitCommit,
  readManifest,
};
