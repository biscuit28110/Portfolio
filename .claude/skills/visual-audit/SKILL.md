---
name: visual-audit
description: Audit visuel automatisé du portfolio avec Playwright (screenshots mobile/tablette/desktop) et analyse vision Claude pour détecter débordements, chevauchements, alignements et contrastes cassés, puis génère un rapport Markdown. Utiliser sur demande explicite ("audite mon UI", "vérifie le visuel", "check les screenshots").
---

# Visual Audit

Audit visuel du portfolio (single-page app Next.js) : capture des screenshots par
section et par viewport, analyse vision faite directement par l'agent Claude courant
(pas d'appel API séparé), rapport Markdown. Contexte projet détaillé (sections,
breakpoints, design system) dans `references/project.md` — la lire avant un premier
run si le contexte n'est pas déjà en mémoire.

Ce skill est déclenché **uniquement à la demande** de l'utilisateur. Ne jamais le
lancer automatiquement après une modif de code sans demande explicite.

## Pipeline

Toutes les commandes se lancent depuis la racine du repo. Node ≥ 18 (fetch natif
requis). Playwright (chromium) est déjà installé en devDependency du projet.

### 1. Dry-run obligatoire avant tout premier run
Vérifie la liste des captures prévues sans lancer de navigateur ni consommer de
tokens :
```bash
node .claude/skills/visual-audit/scripts/capture.js --dry-run
```
Montre-le à l'utilisateur / vérifie que ça correspond à ce qu'il attend avant de
continuer. Ajuster avec `--sections=` et `--viewports=` si besoin (valeurs dans
`scripts/config.json`).

### 2. Capture des screenshots
```bash
node .claude/skills/visual-audit/scripts/capture.js \
  [--sections=all|hero,about,skills,projects,experience,contact] \
  [--viewports=all|mobile,tablet,desktop] \
  [--base-url=http://localhost:3000] [--out=<dir>] [--no-server]
```
- Démarre `npm run dev` automatiquement si rien ne répond déjà sur `--base-url`, et
  l'arrête à la fin (sauf si un serveur tournait déjà avant, dans ce cas il est
  laissé tel quel).
- Écrit dans `.visual-audit/runs/<timestamp>/` : un PNG par `<section>__<viewport>.png`
  + `full__<viewport>.png` (page complète) + `manifest.json`.
- Note le chemin du run affiché en fin de commande (`Run: ...`), il est réutilisé
  dans les étapes suivantes.

### 3. Analyse vision — directement par l'agent, sans API séparée
Pas de clé API à configurer : l'agent Claude courant regarde chaque screenshot avec
l'outil `Read` (support natif des images), compare au design system attendu
(`references/project.md` + `CLAUDE.md` du projet), puis écrit lui-même
`analysis.json` dans le run dir avec `Write`, au schéma suivant :
```json
{
  "model": "claude (analyse directe, agent courant)",
  "results": [
    {
      "file": "hero__mobile.png",
      "section": "hero",
      "viewport": "mobile",
      "issues": [
        { "type": "overflow|overlap|alignment|contrast|missing-element|spacing|typography|other",
          "severity": "critical|major|minor",
          "description": "...",
          "location": "..." }
      ],
      "summary": "..."
    }
  ]
}
```
Lire chaque PNG un par un (`Read` sur `<run-dir>/<file>.png`) avant d'écrire le JSON —
ne pas deviner le contenu des images.

### 4. Génération du rapport
```bash
node .claude/skills/visual-audit/scripts/generate_report.js --run=<run-dir>
```
Compile `manifest.json` + `analysis.json` en `<run-dir>/report.md` : résumé par
sévérité, puis détail par section/viewport avec capture intégrée (lien relatif) et
liste des problèmes.

## Après le run

- Lire `report.md` et en donner un résumé concis à l'utilisateur (nombre de problèmes
  critiques/majeurs/mineurs, sections concernées) plutôt que de coller tout le
  Markdown brut dans le chat.
- Ne pas corriger automatiquement les problèmes détectés sans validation — proposer
  les corrections et attendre l'accord, conformément aux règles de `CLAUDE.md` du
  projet (ne jamais modifier plusieurs sections sans accord explicite).
- Les fichiers de `.visual-audit/` ne sont pas versionnés (voir `.gitignore`).

## Premier test recommandé

Avant d'étendre à toutes les sections, proposer à l'utilisateur de tester sur 1-2
sections seulement, ex :
```bash
node .claude/skills/visual-audit/scripts/capture.js --sections=hero,about --viewports=mobile,desktop
```
puis l'analyse vision directe (étape 3) et `generate_report.js` sur ces 2 sections
seulement.
