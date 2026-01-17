// Configuration PM2 pour la production
// Utilisation: pm2 start ecosystem.config.js

module.exports = {
  apps: [{
    name: 'em-immo',
    script: 'npm',
    args: 'start',
    cwd: process.cwd(), // Utilise le répertoire courant (modifiez si nécessaire)
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3100
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    time: true
  }]
};

