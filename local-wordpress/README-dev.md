```markdown
# Local WordPress (Docker) — dev.bapihvac.com (dev only)

Quick start:
1. Copy .env.example -> .env and set values (do NOT commit .env)
2. Install mkcert and create certs:
   mkcert -install
   mkcert -cert-file certs/dev.bapihvac.com.crt -key-file certs/dev.bapihvac.com.key dev.bapihvac.com localhost 127.0.0.1

3. Add hosts entry (admin):
   127.0.0.1 dev.bapihvac.com

4. Build & start:
   docker compose up -d --build

5. Import DB / copy wp-content:
   - Put dump.sql into local-wordpress/wordpress/dump.sql
   - Copy wp-content into local-wordpress/wordpress/wp-content
   - Import:
       docker exec -i wp_db sh -c 'exec mysql -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE"' < wordpress/dump.sql

6. Search & replace URLs (from wp_cli container)
   wp --path=/var/www/html search-replace 'https://dev.stage.bapihvac.com' 'https://dev.bapihvac.com:8443' --skip-columns=guid --precise

Access:
- HTTP:  http://localhost:8080
- HTTPS: https://dev.bapihvac.com:8443
- phpMyAdmin: http://localhost:8081
```