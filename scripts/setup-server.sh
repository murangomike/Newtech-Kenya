#!/bin/bash
# Run once on the server: bash setup-server.sh
set -e

echo "=== Installing dependencies ==="
apt-get update -qq
apt-get install -y git docker.io docker-compose-plugin nginx certbot python3-certbot-nginx

systemctl enable docker
systemctl start docker
systemctl enable nginx
systemctl start nginx

echo "=== Cloning repo ==="
mkdir -p /opt/newtech-kenya
cd /opt/newtech-kenya

if [ -d ".git" ]; then
  git pull origin main
else
  git clone https://github.com/murangomike/Newtech-Kenya.git .
fi

echo "=== Configuring nginx ==="
cp nginx/newtechkenya.conf /etc/nginx/sites-available/newtechkenya.conf
ln -sf /etc/nginx/sites-available/newtechkenya.conf /etc/nginx/sites-enabled/newtechkenya.conf
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

echo "=== Starting containers ==="
# backend/.env must be populated before this step (done by GitHub Actions)
docker compose up -d --build

echo "=== Issuing SSL certificates ==="
certbot --nginx -d newtechkenya.com -d www.newtechkenya.com -d api.newtechkenya.com \
  --non-interactive --agree-tos -m m.murango@newtechkenya.com

systemctl reload nginx

echo "=== Done! ==="
docker compose ps
