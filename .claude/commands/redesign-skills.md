# /redesign-skills

Skill de refonte complète de la section Compétences.

## Contexte projet

Design system : `bg-slate-950`, accents cyan/violet/blue/emerald, Geist font, Framer Motion.
Décisions validées :
- Layout : **bento grid asymétrique**
- Catégories : **Développement Web**, **Support & IT**, **Infrastructure & DevOps**
- Niveaux de maîtrise : **aucun** — les projets valident le niveau
- Animations : **maximum** — hover glow, stagger à l'entrée, effets interactifs riches

## Étape 1 — Analyse

Lis tous les fichiers liés à la section Skills :
- `src/components/sections/Skills.tsx`
- Tous les fichiers dans `src/components/skills/`
- `src/data/skills.ts`

Dresse un rapport concis :
- Structure actuelle (composants, props, données)
- Points faibles visuels et techniques
- Ce qui peut être conservé

## Étape 2 — Inspiration MCP

Utilise `21st_magic_component_inspiration` avec :
1. "skills bento grid"
2. "tech stack showcase"
3. "skills cards hover animation"

Synthétise les patterns intéressants (interactions, layouts, effets visuels).

## Étape 3 — Propositions

Propose exactement **3 directions** de bento grid, chacune avec :
- Organisation des 3 catégories dans la grid (tailles des cellules, disposition)
- Élément visuel fort par cellule (icône, fond, effet hover)
- Animations spécifiques (entrée, hover, interactions)
- Mood général (1 mot)

Les 3 directions doivent être clairement distinctes dans leur parti pris visuel.

## ⚠️ STOP

N'écris aucun code avant validation.
Attends le choix explicite de l'utilisateur.

## Étape 4 — Implémentation (après validation)

Une fois la direction validée :

1. **`src/data/skills.ts` est déjà à jour** — ne pas modifier le contenu, uniquement le typage si nécessaire :
   - Développement Web (cyan `#22d3ee`) : Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Node.js, Supabase, REST APIs
   - Infrastructure & DevOps (blue `#60a5fa`) : Linux, Docker, Nginx, Vercel, Cloudflare, Git
   - Support & IT (emerald `#34d399`) : Active Directory, ServiceNow, Windows 7-11, VMware, DHCP / DNS

2. **Refactoriser les composants** dans `src/components/skills/` :
   - Respecter l'architecture modulaire du projet
   - Réutiliser `SectionWrapper`, `fadeUp`, `staggerContainer`, `staggerItem`
   - Animations : `whileHover` sur chaque skill, stagger à l'entrée, glow sur les cellules de catégorie
   - Pas de niveaux de compétence

3. **Mettre à jour `src/components/sections/Skills.tsx`**

## Règles absolues

- ❌ Pas de barres de progression, étoiles ou indicateurs de niveau
- ❌ Pas de contenu hardcodé dans les composants — tout dans `src/data/skills.ts`
- ✅ Utiliser Magic MCP avant d'écrire du code UI
- ✅ Respecter le design system (couleurs, motion presets, typographie)
- ✅ TypeScript strict, composants purs
