# Guide de Déploiement sur Hostinger

## 📋 Prérequis

1. Compte Hostinger avec accès SSH
2. Node.js installé sur le serveur (version 18 ou supérieure)
3. Accès FTP/SFTP ou SSH
4. Variables d'environnement configurées

---

## 🚀 Option 1 : Déploiement sur VPS Hostinger (Recommandé)

### Étape 1 : Préparer le projet localement

1. **Créer un fichier `.env.production`** avec vos variables d'environnement :
```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_supabase
NEXT_PUBLIC_EMAILJS_SERVICE_ID=votre_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=votre_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=votre_cle_publique
```

2. **Tester le build localement** :
```bash
npm run build
npm run start
```

### Étape 2 : Se connecter au serveur Hostinger

1. **Via SSH** (si vous avez un VPS) :
```bash
ssh username@votre-ip-serveur
```

2. **Via File Manager** dans le panneau Hostinger (hébergement web)

### Étape 3 : Installer Node.js sur le serveur

Si Node.js n'est pas installé :

```bash
# Sur Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Vérifier l'installation
node --version
npm --version
```

### Étape 4 : Transférer les fichiers

**Méthode 1 : Via Git (Recommandé)**
```bash
# Sur le serveur
cd /home/votre-utilisateur
git clone https://github.com/votre-repo/em-immo.git
cd em-immo
```

**Méthode 2 : Via FTP/SFTP**
- Utiliser FileZilla ou WinSCP
- Transférer tous les fichiers du projet vers `/home/votre-utilisateur/em-immo/`

### Étape 5 : Installer les dépendances

```bash
cd /home/votre-utilisateur/em-immo
npm install --production
```

### Étape 6 : Configurer les variables d'environnement

```bash
# Créer le fichier .env.local
nano .env.local
```

Ajouter vos variables :
```env
NEXT_PUBLIC_SUPABASE_URL=votre_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle
NEXT_PUBLIC_EMAILJS_SERVICE_ID=votre_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=votre_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=votre_cle_publique
```

### Étape 7 : Builder le projet

```bash
npm run build
```

### Étape 8 : Configurer PM2 (Process Manager)

```bash
# Installer PM2 globalement
sudo npm install -g pm2

# Démarrer l'application
pm2 start npm --name "em-immo" -- start

# Sauvegarder la configuration PM2
pm2 save

# Configurer PM2 pour démarrer au boot
pm2 startup
```

### Étape 9 : Configurer Nginx (Reverse Proxy)

1. **Installer Nginx** :
```bash
sudo apt-get update
sudo apt-get install nginx
```

2. **Créer la configuration** :
```bash
sudo nano /etc/nginx/sites-available/em-immo
```

3. **Ajouter cette configuration** :
```nginx
server {
    listen 80;
    server_name votre-domaine.com www.votre-domaine.com;

    location / {
        proxy_pass http://localhost:3100;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

4. **Activer le site** :
```bash
sudo ln -s /etc/nginx/sites-available/em-immo /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Étape 10 : Configurer SSL (HTTPS)

```bash
# Installer Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtenir le certificat SSL
sudo certbot --nginx -d votre-domaine.com -d www.votre-domaine.com
```

---

## 🌐 Option 2 : Déploiement sur Hébergement Web Hostinger (cPanel)

### Étape 1 : Préparer le projet pour export statique

1. **Modifier `next.config.js`** :
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Export statique
  images: {
    unoptimized: true, // Désactiver l'optimisation d'images
  },
  async redirects() {
    return [
      {
        source: '/accueil',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
```

2. **Builder le projet** :
```bash
npm run build
```

3. **Le dossier `out/` contient les fichiers statiques**

### Étape 2 : Transférer les fichiers

1. **Via File Manager Hostinger** :
   - Aller dans `public_html` ou `www`
   - Supprimer les fichiers par défaut
   - Uploader tous les fichiers du dossier `out/`

2. **Via FTP** :
   - Utiliser FileZilla
   - Se connecter avec les identifiants FTP Hostinger
   - Transférer le contenu de `out/` vers `public_html/`

### Étape 3 : Configurer les variables d'environnement

⚠️ **Note** : Avec un export statique, les variables d'environnement doivent être intégrées au build. Utilisez `.env.production` avant de builder.

---

## 🔧 Option 3 : Utiliser Vercel (Recommandé pour Next.js)

Vercel est optimisé pour Next.js et gratuit pour les projets personnels :

1. **Installer Vercel CLI** :
```bash
npm i -g vercel
```

2. **Déployer** :
```bash
vercel
```

3. **Configurer les variables d'environnement** dans le dashboard Vercel

---

## 📝 Checklist de Déploiement

- [ ] Variables d'environnement configurées
- [ ] Build testé localement (`npm run build`)
- [ ] Node.js installé sur le serveur (version 18+)
- [ ] Fichiers transférés sur le serveur
- [ ] Dépendances installées (`npm install`)
- [ ] Application démarrée avec PM2
- [ ] Nginx configuré comme reverse proxy
- [ ] SSL/HTTPS configuré
- [ ] Domaine pointé vers le serveur
- [ ] Tests de fonctionnement effectués

---

## 🐛 Dépannage

### Erreur "Port 3100 already in use"
```bash
# Trouver le processus
lsof -i :3100
# Tuer le processus
kill -9 PID
```

### PM2 ne démarre pas
```bash
# Vérifier les logs
pm2 logs em-immo
# Redémarrer
pm2 restart em-immo
```

### Nginx erreur 502
- Vérifier que l'application Next.js tourne : `pm2 list`
- Vérifier les logs Nginx : `sudo tail -f /var/log/nginx/error.log`

### Variables d'environnement non chargées
- Vérifier que `.env.local` existe sur le serveur
- Redémarrer l'application après modification : `pm2 restart em-immo`

---

## 🔐 Sécurité

1. **Ne jamais commiter `.env`** dans Git
2. **Utiliser des permissions restrictives** :
```bash
chmod 600 .env.local
```
3. **Configurer un firewall** :
```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## 📞 Support

Pour plus d'aide :
- Documentation Hostinger : https://www.hostinger.com/tutorials
- Documentation Next.js : https://nextjs.org/docs/deployment
- Support Hostinger : Via le panneau de contrôle

