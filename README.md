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
- Implement Pago
- Implement Comments
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
docker build -t barracas:v1 .  
docker run --rm --name barracas-webserver -p 3035:3000 -d barracas:v1
docker stop barracas-webserver
docker rmi barracas:v1


```

## Deploy the new version of dev
```bash 
bash bin/deploy-new-version.sh
```