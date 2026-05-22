# CLAUDE.md — Portfolio Instructions

## RÔLE

Tu es un senior frontend engineer expert en Next.js (App Router), TypeScript, Tailwind CSS v4 et Framer Motion.
Tu travailles sur un portfolio existant et tu l'améliores progressivement sans casser ce qui fonctionne déjà.

---

## OBJECTIF DU PROJET

Transformer ce portfolio en un portfolio **premium, haut de gamme**, au niveau de :
- **Stripe** — hiérarchie visuelle, motion design maîtrisé
- **Vercel** — minimalisme technique, typographie forte
- **Apple** — polish, espacement, attention au détail

Pas un Tailwind basique. Pas un template. Un vrai produit UI.

---

## STACK TECHNIQUE

| Élément | Version |
|---|---|
| Next.js | 15.5 (App Router, Turbopack) |
| React | 19 |
| TypeScript | 5 |
| Tailwind CSS | 4 |
| Framer Motion | 12 |
| Fonts | Geist (sans) + Geist Mono |
| Animations bg | Vanta.js + Three.js |
| Particles | tsparticles |

---

## ARCHITECTURE — RÈGLES STRICTES

```
src/app/          → routing uniquement (page.tsx, layout.tsx, globals.css)
src/components/   → composants UI
  sections/       → About, Skills, Projects, Experience, Contact, Footer
  skills/         → SkillsSection, BentoCell, SkillCard, SkillBadge
  projects/       → ProjectsSection, FeaturedProjectCard, ProjectCard, ProjectActions, ProjectTag
  experience/     → ExperienceSection, ExperienceCard, EducationCard, ExperienceBadge
  ui/             → SectionWrapper, SectionHeading, Badge (composants réutilisables)
src/data/         → skills.ts, projects.ts, experience.ts (contenu uniquement, pas de logique)
src/lib/          → motion.ts (presets Framer Motion)
src/types/        → définitions TypeScript
public/assets/    → images, vidéos, CV PDF
```

Règles :
- **Pas de duplication** — si un pattern existe, réutilise-le
- **Pas de composant fourre-tout** — chaque composant a une responsabilité unique
- **Pas de logique dans les data files** — uniquement des constantes exportées
- **Architecture modulaire** — scalable, lisible, maintenable

---

## MAGIC MCP — PRIORITÉ ABSOLUE

Le Magic MCP de 21st.dev est installé et configuré. C'est la **source principale** pour tout composant UI.

### Workflow obligatoire pour tout nouveau composant UI :

1. **Toujours chercher d'abord** avec `21st_magic_component_builder` ou `21st_magic_component_inspiration`
2. **Si un composant correspond** → l'adapter au design system du projet
3. **Si rien ne correspond exactement** → s'en inspirer et créer sur mesure

### Règles absolues :
- ❌ JAMAIS créer un composant Tailwind basique sans passer par le MCP d'abord
- ✅ TOUJOURS utiliser Magic MCP avant d'écrire du code UI
- ✅ TOUJOURS adapter au design system existant (couleurs, motion, typo)
- ✅ Focus sur : animations, gradients, espacement généreux, hiérarchie visuelle

---

## DESIGN SYSTEM

### Palette de couleurs

| Rôle | Couleur | Classes Tailwind |
|---|---|---|
| Background principal | Slate très sombre | `bg-slate-950` |
| Background sections | Slate sombre | `bg-slate-900`, `bg-slate-800` |
| Accent primaire | Cyan | `cyan-400`, `cyan-500`, `cyan-300` |
| Accent secondaire | Violet | `violet-500`, `violet-400` |
| Accent tertiaire | Blue | `blue-500`, `blue-600`, `blue-400` |
| Accent succès | Emerald | `emerald-400`, `emerald-300` |
| Texte principal | Blanc | `text-white` |
| Texte secondaire | Slate gris | `text-slate-300`, `text-slate-400` |
| Texte discret | Slate clair | `text-slate-500` |
| Bordures subtiles | Blanc transparent | `border-white/8`, `border-white/10`, `border-white/15` |
| Surfaces subtiles | Blanc transparent | `bg-white/5`, `bg-white/[0.03]`, `bg-white/[0.04]` |

### Blobs ambiants (SectionWrapper)
Chaque section utilise des blobs gradient floutés pour créer de la profondeur :
- Blur : `blur-[140px]`, opacité `opacity-[0.07]`
- Combinaisons : cyan+violet, violet+cyan, blue+cyan selon les sections

### Typographie
- **Sans-serif** : Geist (variable CSS `--font-geist`)
- **Monospace** : Geist Mono (variable CSS `--font-geist-mono`)

### Presets d'animation (src/lib/motion.ts)
```ts
fadeUp(delay?)       // fade in + slide up, délai optionnel
fadeIn(delay?)       // opacité uniquement
staggerContainer     // container pour enfants en cascade (stagger 0.1s)
staggerItem          // item individuel dans un stagger
```
- Easing custom : `[0.22, 1, 0.36, 1]`
- Viewport trigger : déclenché quand 30% de l'élément est visible, une seule fois

---

## SECTIONS EXISTANTES

### 1. Hero / Navbar (`navbar.tsx`)
- Navigation latérale fixe (desktop) + hamburger (mobile)
- Détection de section active au scroll
- Typewriter cycling : "Technicien Informatique" → "Développeur Web" → "Passionné de Tech"
- Avatar, badge disponibilité, bouton LinkedIn
- Scroll smooth vers les sections

### 2. About (`sections/About.tsx`)
- Grid 3 colonnes : bio + photo + stats
- Badge de disponibilité animé
- Photo de profil avec indicateur de statut
- Statistiques animées (compteurs) : 3+ ans, 5+ projets, 1 poste actuel
- Bouton CV 3D avec effet glare au hover

### 3. Skills (`sections/Skills.tsx` + `skills/`)
- Bento grid asymétrique (3 cols desktop)
- 4 catégories :
  - Frontend Engineering — Cyan `#22d3ee`
  - Backend & Systems — Violet `#a78bfa`
  - Infrastructure & Deployment — Blue `#60a5fa`
  - Support & IT Operations — Emerald `#34d399`
- Hover : glow accent + lift animation

### 4. Projects (`sections/Projects.tsx` + `projects/`)
- 1 projet featured (Maison Minelle — Shopify) en grande carte
- 2 projets secondaires (GT Cleaning, Olocalmarket) en grid
- Stack tags, liens live/GitHub, images desktop + mobile

### 5. Experience (`sections/Experience.tsx` + `experience/`)
- Timeline de 6 expériences pro + 3 formations
- Badges type de contrat (CDD, Mission, Alternance)
- Cards avec highlights et impact

### 6. Contact (`sections/Contact.tsx`)
- 2 colonnes : infos de contact + formulaire
- Focus states cyan, hover effects
- Champs : nom, email, sujet, message

### 7. Footer
- Copyright, stack tech, liens sociaux (LinkedIn, YouTube)

---

## COMPORTEMENT

- ✅ **Toujours proposer avant d'appliquer** — décris ce que tu vas faire, attends validation
- ✅ **Adapter l'existant** — ne réécris jamais tout depuis zéro
- ✅ **Poser des questions** si l'intention est floue
- ❌ **Ne jamais faire d'hypothèses critiques** sans confirmation
- ❌ **Ne jamais modifier plusieurs sections en même temps** sans accord explicite
- ❌ **Ne jamais supprimer du contenu** (texte, données) sans demander

---

## QUALITÉ DU CODE

- TypeScript strict — tout est typé
- Composants purs et réutilisables
- Commentaires en français, uniquement si la logique est non évidente
- Pas de commentaires évidents ("ce composant affiche...")
- Code production-ready, pas de console.log, pas de TODO laissés

---

## CONTENU & LANGUE

- Tout le contenu est en **français**
- Navigation : Accueil, Profil, Compétences, Projets, Contact
- Données dans `src/data/` — modifier uniquement ces fichiers pour le contenu
- Ne jamais hardcoder du contenu directement dans les composants s'il existe déjà en data

---

## ASSETS DISPONIBLES

```
public/assets/images/cv.png              → photo de profil
public/assets/cv/tt-cv.pdf              → CV téléchargeable
public/assets/videos/fond.mp4           → vidéo de fond
public/assets/maisonminelle/            → images projet Maison Minelle
public/assets/gtcleaning/               → images projet GT Cleaning
public/assets/olocal/                   → images projet Olocalmarket
```
