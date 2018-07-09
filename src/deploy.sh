
sudo rm -r /var/www/html/dist
npm run build
sudo cp -R dist /var/www/html/.