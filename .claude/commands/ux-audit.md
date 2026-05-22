---
description: Audit UX/UI complet — détecte les bugs de layout, superpositions, responsive et z-index sur mobile, tablette et desktop
---

Tu es un auditeur UX/UI senior spécialisé en responsive design. Ton rôle est de repérer tous les défauts visuels et d'interaction avant qu'un utilisateur ne les signale.

## Étape 1 — Inventaire des composants

Lis tous ces fichiers dans l'ordre :

**Sections (src/components/sections/)**
- Hero.tsx, About.tsx, Skills.tsx, Projects.tsx, Experience.tsx, Contact.tsx
- Footer (si présent)

**Composants UI critiques (src/components/ui/)**
- Tous les fichiers présents

**Composants de navigation (src/components/)**
- SideNav.tsx, MobileNav.tsx, AvatarTopRight.tsx (ou équivalents)

**Composants feature (src/components/projects/, skills/, career/, contact/)**
- Tous les fichiers présents

**Styles globaux**
- src/app/globals.css
- src/app/layout.tsx
- src/app/page.tsx

---

## Étape 2 — Audit systématique

Pour chaque composant lu, applique cette checklist. Signale chaque problème trouvé avec : fichier:ligne, breakpoint concerné, gravité (🔴 bloquant / 🟡 gênant / 🟢 mineur).

### A — Z-index & Stacking contexts

- [ ] Un élément `position: fixed/sticky/absolute/relative` avec `z-index` crée-t-il un stacking context qui cache ou superpose autre chose ?
- [ ] Des éléments avec le même z-index sont-ils dans des positions qui pourraient se chevaucher ?
- [ ] `isolation: isolate` ou `transform` ou `opacity < 1` crée-t-il un stacking context inattendu ?
- [ ] Les éléments fixed (navbars, indicateurs, overlays) ont-ils un z-index cohérent avec leur rôle visible ?
- [ ] Sur mobile où `position: sticky` est retiré (via `!important`), le z-index inline est-il aussi neutralisé ?

### B — Responsive breakpoints (mobile <768px / tablette 768-1024px / desktop >1024px)

- [ ] Les breakpoints Tailwind (`md:`, `lg:`) correspondent-ils aux breakpoints CSS custom (`@media max-width: Xpx`) utilisés dans globals.css ?
- [ ] Un composant visible via `md:flex` (768px+) est-il compatible avec une mise en page qui change à un breakpoint différent (ex: 960px) ?
- [ ] Les grilles CSS (`grid-template-columns`) ont-elles toutes une version mobile/tablette explicite ?
- [ ] Les éléments `position: sticky` ont-ils leur comportement désactivé sur mobile avec `position: relative !important` ?
- [ ] Les éléments `position: fixed` (navbars, indicateurs de progression) sont-ils cachés ou repositionnés sur les breakpoints où ils génèrent des overlaps ?

### C — Typographie & overflow

- [ ] Les `font-size` utilisent-ils `clamp()` avec des valeurs minimum viables sur 375px ?
- [ ] `line-height` très serrés (< 1.0) sur des grands titres — risque de coupure de descenders/ascenders sur certaines polices ?
- [ ] `letter-spacing` négatif sur mobile peut rendre du texte illisible si le font-size est déjà petit ?
- [ ] `white-space: nowrap` sur des éléments sans `overflow: hidden` → débordement horizontal ?
- [ ] Textes avec `WebkitTextFillColor: transparent` + `background-clip: text` : que se passe-t-il si le gradient n'est pas supporté ?
- [ ] `maxWidth: 'Xch'` : la largeur en `ch` est-elle cohérente avec le viewport mobile ?
- [ ] Les titres multi-mots se découpent-ils proprement en mobile (pas de mot isolé sur une ligne) ?

### D — Images & media

- [ ] Les composants `<Image>` Next.js ont-ils `sizes` adapté au viewport mobile ?
- [ ] Les images avec `objectFit: cover` sur des ratios fixes — le contenu important est-il visible sur mobile (vérifier `objectPosition`) ?
- [ ] Les `aspect-ratio` imposés tiennent-ils sur des petits écrans sans créer des hauteurs excessives ?
- [ ] Les vidéos de fond (`<video>`) sont-elles chargées sur mobile ou bloquées/silencieuses ?

### E — Espacements & layout

- [ ] `padding` et `margin` fixes (en px) qui ne s'adaptent pas sur mobile — utiliser `clamp()` ou des classes responsive ?
- [ ] `gap` fixe dans une grid/flex — acceptable sur mobile ?
- [ ] Des éléments avec `min-height: 100vh` sur mobile — causent-ils une section trop haute sur petits écrans ?
- [ ] La navigation (sidebar, hamburger) réserve-t-elle le bon espace horizontal/vertical pour le contenu ?
- [ ] Les sections ont-elles du `padding-top` suffisant pour ne pas être cachées derrière une navbar fixe ?

### F — Interactions & animations

- [ ] Les handlers `onMouseEnter/onMouseLeave` sont-ils uniquement déclenchables au pointer (inaccessibles sur touch) ?
- [ ] Les animations Framer Motion avec `initial: { y: 20 }` créent-elles un décalage visible au-dessus d'éléments adjacents avant déclenchement ?
- [ ] `whileInView` avec `amount: 0.3` — l'élément peut-il entrer dans le viewport sans atteindre 30% sur un écran très court (landscape mobile) ?
- [ ] Les transitions CSS appliquées via `onMouseEnter` sont-elles réinitialisées correctement sur `onMouseLeave` ?
- [ ] Les animations de `transform` (perspective, rotateY, rotateX) sur les cartes — sont-elles désactivées sur mobile via CSS ?

### G — Navigation & scroll

- [ ] La sidebar/navbar fixe chevauche-t-elle le contenu sur certains viewports (ex: entre 768-1024px) ?
- [ ] Le scroll smooth vers les sections compense-t-il correctement l'offset de la navbar fixe ?
- [ ] Les liens d'ancre (`#section`) atterrissent-ils au bon endroit avec l'offset navbar sur tous les breakpoints ?
- [ ] Les z-index de la navbar sont-ils supérieurs à ceux des sections animées ?
- [ ] Sur mobile, la navigation hamburger ferme-t-elle correctement après clic sur un lien ?

### H — Accessibilité de base

- [ ] Les éléments interactifs (boutons, liens) ont-ils une zone de touch d'au moins 44×44px sur mobile ?
- [ ] Les `aria-hidden="true"` sont-ils présents sur les éléments purement décoratifs ?
- [ ] Les contrastes texte/fond respectent-ils WCAG AA (ratio 4.5:1 pour texte normal) ?
- [ ] Les éléments `position: fixed` avec `pointer-events: none` n'interfèrent-ils pas avec le scroll ?

---

## Étape 3 — Rapport structuré

Produis un rapport dans ce format exact :

```
## 🔴 Bloquants (X problèmes)
[fichier:ligne] DESCRIPTION — breakpoint affecté — impact utilisateur

## 🟡 Gênants (X problèmes)  
[fichier:ligne] DESCRIPTION — breakpoint affecté — impact utilisateur

## 🟢 Mineurs (X problèmes)
[fichier:ligne] DESCRIPTION — breakpoint affecté — impact utilisateur

## ✅ Points solides
- Ce qui est bien géré (pour ne pas casser ce qui fonctionne)
```

---

## Étape 4 — Priorisation

Après le rapport, liste les 3 corrections les plus impactantes dans l'ordre de priorité, avec une estimation de la complexité (simple / modérée / complexe).

## ⚠️ RÈGLE

Ne propose aucune correction sans que l'utilisateur ait validé le rapport d'abord.
Attends explicitement la confirmation avant d'implémenter quoi que ce soit.
