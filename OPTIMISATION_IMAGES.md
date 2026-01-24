# Guide d'optimisation des images

## Images volumineuses à optimiser

Les fichiers suivants sont très volumineux et doivent être optimisés :

1. **`/public/image.png`** - 2 853,2 KiB (2.8 MB)
2. **`/public/image.webp`** - 1 314,9 KiB (1.3 MB)

## Solutions recommandées

### Option 1 : Compression avec outils en ligne
- Utilisez [Squoosh](https://squoosh.app/) ou [TinyPNG](https://tinypng.com/)
- Ciblez une qualité de 70-80% pour les images de fond
- Format recommandé : WebP ou AVIF

### Option 2 : Compression avec Sharp (déjà installé)
```bash
# Installer sharp-cli si nécessaire
npm install -g sharp-cli

# Compresser image.png
sharp -i public/image.png -o public/image-optimized.png --webp --quality 75

# Compresser image.webp
sharp -i public/image.webp -o public/image-optimized.webp --quality 75
```

### Option 3 : Script d'optimisation automatique
Créez un script `scripts/optimize-images.js` pour automatiser l'optimisation.

## Utilisation actuelle

Ces images sont utilisées comme :
- Background images dans les CSS (`formulaire.module.css`, `processus.module.css`, `faq.module.css`, `services/style.css`)
- Image dans `PatternDecoratif.js` (déjà optimisé avec Next.js Image)

## Objectif

Réduire la taille totale de ces images de ~4 MB à moins de 500 KB (compression ~85%).

