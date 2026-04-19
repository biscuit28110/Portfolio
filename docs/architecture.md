# Architecture

## Structure globale

- src/app → routing Next.js App Router
- src/components → composants UI réutilisables
- src/lib → logique métier / helpers
- src/data → données / configs
- supabase → backend (auth + DB)

## Routing

Utilisation du App Router avec groupements :

- (auth) → login / register
- (checkout) → paiement
- (dashboard) → admin
- (driver) → livreur
- (storefront) → client

## Patterns

- séparation par rôles (admin / client / livreur)
- pages dynamiques ([id], [slug])
- architecture modulaire

## Middleware

- gestion auth globale via middleware.ts