Étapes locales pour générer vignettes, tester et committer

Prérequis
- Installer Node.js + npm (https://nodejs.org)
- Installer Git si nécessaire (https://git-scm.com)

Étapes (dans le dossier du projet)

```powershell
# 1) Installer dépendances
cd "c:\Users\agelo\OneDrive\Desktop\Mon autre site"
npm install

# 2) Générer PNG à partir des SVG (script ajouté: `svg2png`)
# Note: this requires Node.js + npm and a headless browser (Puppeteer). The environment I'm running in here doesn't have `npm` installed, so I couldn't execute the script.
# Pour générer localement les PNGs (ex: site-3.png) :
npm install
npm run svg2png
# sortie attendue (ex): assets/screenshots/site-3.png
# Si vous voulez, je peux préparer un petit script pour générer uniquement la vignette `site-3` (optionnel).

# 3) Démarrer le serveur local et vérifier l'UI
# (ou) npm start / node server.js selon votre script
node server.js
# puis ouvrir http://localhost:3000

# 4) Commit & push
git add .
git commit -F COMMIT_MESSAGE.txt
git push
```

Notes
- Si `npm` ou `git` ne sont pas installés ici, exécutez ces commandes localement sur votre machine.
- Si vous voulez, je peux préparer un patch (diff) prêt à appliquer et committer à votre place (à exécuter localement).