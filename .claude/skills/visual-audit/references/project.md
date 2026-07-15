# Contexte projet pour l'audit visuel

## Architecture
Ce portfolio est une **single-page app** Next.js (App Router) : `src/app/page.tsx`.
Il n'y a pas de routes multiples — la navigation se fait par ancres vers des sections
identifiées par `id` dans le DOM :

| Ancre | Composant | Fichier |
|---|---|---|
| `#hero` | Hero / Navbar | `src/components/sections/Hero.tsx` (ou `navbar.tsx`) |
| `#about` | About | `src/components/sections/About.tsx` |
| `#skills` | Skills | `src/components/sections/Skills.tsx` |
| `#projects` | Projects | `src/components/sections/Projects.tsx` |
| `#experience` | Experience | `src/components/sections/Experience.tsx` |
| `#contact` | Contact | `src/components/sections/Contact.tsx` |

Ces IDs sont définis dans `scripts/config.json`. Si de nouvelles sections sont ajoutées
au portfolio, mets à jour ce fichier de config avant de relancer un audit.

## Authentification
Aucune — le site est entièrement public, pas de page protégée à gérer.

## Serveur de dev
- Commande : `npm run dev` (Next.js + Turbopack)
- Port par défaut : `3000`
- `capture.js` démarre automatiquement le serveur s'il n'est pas déjà up sur
  `http://localhost:3000`, et l'arrête à la fin s'il l'a lui-même démarré.

## Breakpoints custom (globals.css)
Le CSS du projet utilise des media queries sur-mesure, pas seulement les breakpoints
Tailwind par défaut. Points de rupture observés dans `src/app/globals.css` :
`400px`, `560px`, `640px`, `760px`, `860px`, `960px`, `1280px`.

Les viewports par défaut du skill (`mobile` 375px, `tablet` 768px, `desktop` 1440px)
couvrent la majorité de ces seuils, mais si un bug est suspecté précisément autour d'un
breakpoint (ex: 860px), envisage un viewport custom via `--viewports` avec une valeur
ajoutée temporairement dans `config.json`.

## Design system (à ne pas signaler comme bug)
Voir aussi `CLAUDE.md` à la racine. Résumé utilisé dans le prompt d'analyse vision :
- Thème sombre : `slate-950/900/800`, texte blanc/slate-300/400
- Accents voulus : cyan `#22d3ee`, violet `#a78bfa`, blue `#60a5fa`, emerald `#34d399`
- Blobs de gradient flous en arrière-plan (opacité ~0.07, blur 140px) : effet de profondeur voulu
- Bordures très subtiles en blanc transparent (`white/8` à `white/15`) : voulu
- Police Geist (sans) + Geist Mono
