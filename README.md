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
- config bootstrap v5
- add notification of information request
- Implement Pago
- Implement Comments

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
