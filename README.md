Site de présentation — Agelou Studio

Ceci est un site statique d'exemple pour présenter des services de création de sites web haut de gamme.

Fichiers principaux :

- `index.html` — page d'accueil (logo intégré : `assets/agelou-logo.svg`)
- `assets/agelou-logo-mono.svg` — version monochrome pour impressions et papier en-tête
- `assets/favicon.svg` — favicon scalable (pour compatibilité PNG/ICO : voir `tools/generate-favicons.sh`)
- Pages de démonstration : `realisations/site-1.html`, `realisations/site-2.html`, `realisations/site-3.html` (liens depuis la section Réalisations).

Les pages de démonstration sont enrichies : menu, sections (services, portfolio/produits, équipe), et formulaires fonctionnels qui envoient les messages à l'API `POST /api/contact` (stockés dans `messages.json`).

Captures d'écran

- Générez des captures PNG des pages de démonstration avec :

```bash
npm install
npm run screenshots
```

Le script `tools/screenshot.js` utilise `puppeteer` et enregistre les captures dans `assets/screenshots/`.

Pages additionnelles

- `realisations/product-1.html` — fiche produit exemple (accessible depuis `realisations/site-2.html`).

- `styles.css` — styles
- `scripts.js` — interactions (validation du formulaire)

Tester localement

Ouvrez `index.html` dans votre navigateur, ou lancez le serveur Node.js inclus :

```bash
# installer les dépendances
npm install

# lancer le serveur
npm start

# puis ouvrez http://localhost:3000
```

Admin / CMS

- Page d'administration : `/admin.html` (Administration — Agelou Studio)
- Identifiants par défaut : `admin` / `password` (définissables via variables d'environnement `ADMIN_USER` et `ADMIN_PASS`)

Fonctionnalités ajoutées : formulaire de contact fonctionnel (stocke les messages dans `messages.json`) et CMS simple (modifiez le JSON et sauvegardez via l'interface).

Souhaitez-vous que j'ajoute l'envoi d'emails (SMTP) ou une intégration CMS plus avancée (Netlify, Strapi) ?
