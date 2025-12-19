#!/usr/bin/env bash
# Génère `favicon-32.png` et `favicon.ico` depuis `assets/favicon.svg` (ImageMagick requis)
set -e
SRC="assets/favicon.svg"
OUT_PNG="assets/favicon-32.png"
OUT_ICO="assets/favicon.ico"

if ! command -v convert >/dev/null 2>&1; then
  echo "ImageMagick convert introuvable. Installez ImageMagick pour générer PNG/ICO." >&2
  exit 2
fi

convert -background none -resize 32x32 "$SRC" "$OUT_PNG"
convert "$OUT_PNG" -define icon:auto-resize=64,48,32,16 "$OUT_ICO"
echo "Généré: $OUT_PNG et $OUT_ICO"
