# barracas
Gestao de espaços 


### Building dependencies

```bash
npm run build
```

## Setting new master Password
To set a new master password i.e. for user.id==1 run:
```bash
node install.js
```

## TODO
- Popper might not be required by using v.5 of bootstrap
- update google auth
- add notification of information request
- Add global view for date
- Add modal as component (Row view)
- Fix edit, not al
- Implement Comments
- Fix logout /redirect messes up revoke in access
- Add method to change rent to another tent
- Rent online (MBWay/paypal/receipt - verification) Some tents are already setup and an inspector comes and checks only the rented are ocuppied. A receipt is generated to verify purchuse if necessary //https://docs.adyen.com/online-payments https://docs.adyen.com/payment-methods?countries=pt
   https://developer.sibsapimarket.com/sandbox/node/3088

## DB setup
Either run config.sh if you are setting up a new AWS instance.
Alternatively use this:

```bash
sudo mysql -u root -p -e "CREATE DATABASE barracas;"
mysql -u brunocosta -D barracas -p <SQL/LATEST_dump.sql
mysql -u brunocosta -p -e "CREATE USER '[user]'@'localhost' IDENTIFIED BY ''; GRANT ALL PRIVILEGES ON barracas.* TO 'myapp'@'localhost'; FLUSH PRIVILEGES;" 
```


## QR code:
Site: \<dominio>/informacoes
Preço e mapa


## Docker
```bash
docker build -t barracas:v2024-1 .  
docker run --rm --name barracas-webserver -p 3037:3000 --mount type=bind,src=/run/mysqld/mysqld.sock,dst=/run/mysqld/mysqld.sock -d barracas:v2024-1
docker stop barracas-webserver
docker rmi barracas:v1


```

## Nginx
Add the proxy for docker instance
```nginx
server {
	server_name barracas.obanheiro.pt;
        listen 443 ssl; # managed by Certbot
        ssl_certificate /etc/letsencrypt/live/barracas.obanheiro.pt-0001/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/barracas.obanheiro.pt-0001/privkey.pem; # managed by Certbot
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
	
	access_log /var/log/nginx/barracas.obanheiro.pt.log;

	location / {
	       	proxy_set_header X-Real-IP $remote_addr;
	       	proxy_set_header X-Forward-Proto $scheme;
		proxy_set_header X_Forwarded_Proto $scheme;
		proxy_set_header X_Forwarded_Host $host;
		proxy_set_header HTTP_X_FORWARDED_PROTO $scheme;
		proxy_pass       http://127.0.0.1:3037;
	       	proxy_http_version 1.1;
	       	proxy_set_header Upgrade $http_upgrade;
	       	proxy_set_header Connection 'upgrade';
	       	proxy_set_header Host $host;
       		proxy_cache_bypass $http_upgrade;
	}	
}


```
Generate certificates
```bash 
sudo certbot
```

## Deploy the new version of dev
```bash 
bash bin/deploy-new-version.sh
```
