# Birds API

A Public Restful API server built using Express.js and documented via Swagger, To retrieve and manipulate birds data

**Table of Contents**

- [Run `birds-api` in your local machine](#run-birds-api-in-your-local-machine)
- [Deploy `birds-api` to Dokku](#deploy-birds-api-to-dokku)

## Run `birds-api` in your local machine

- Clone repository

```bash
git clone https://github.com/amjedomar/birds-api
```

- Navigate to `birds-api` directory, And Install the dependencies

```bash
yarn
```

- Create a MySQL or MariaDB database

- Then create `.env` file in the `birds-api` root directory, And paste the following content

```txt
DB_HOST=$
DB_PORT=$
DB_USERNAME=$
DB_PASSWORD=$
DB_NAME=$
```

> NOTE: replace `$` with your own compatible values, for example

```txt
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=1234
DB_NAME=birds
```

- Navigate to `birds-api` directory again, And run the following two commands to run migrations

```bash
# First Compile Project
yarn build
# Then Run migrations
yarn migration:run
```

- Finally run the following command to start the dev server

```
yarn dev
```

- And if you want to run the server in the production mode, Then run the following two commands

```bash
# First Compile Project
yarn build
# Then start the server
yarn start
```

## Deploy `birds-api` to Dokku
First Install Dokku in a cloud machine like Microsoft Azure, DigitalOcean, DreamHost Cloud, ...ect.

After you installed and configured Dokku, follow the following steps:

### App

- Create app
```
dokku apps:create birds-api
```

- set `NODE_ENV` env variable value
```
dokku config:set birds-api NODE_ENV=production
```

### Buildpack
```
dokku buildpacks:set birds-api https://github.com/heroku/heroku-buildpack-nodejs#v189
```

### MariaDB Database

- Install plugin

```
sudo dokku plugin:install https://github.com/dokku/dokku-mariadb.git mariadb
```

- Create the database

```
sudo docker pull mariadb:latest
```

```
dokku mariadb:create birds --image-version latest
```

- Link the database

```
dokku mariadb:link birds birds-api
```

- Get the database connect info

```
dokku config:show birds-api
```

Then you will see the `DATABASE_URL` value like following form 

```
DATABASE_URL = mysql://USERNAME:PASSWORD@HOST:PORT/NAME
```

- Set the following environment variables to the app

> NOTE: replace `$` with your own values from the `DATABASE_URL` env variable

```
dokku config:set birds-api DB_USERNAME=$ DB_PASSWORD=$ DB_HOST=$ DB_PORT=$ DB_NAME=$
```

- Unset `DATABASE_URL` variable because we don't need it anymore

```
dokku config:unset birds-api DATABASE_URL
```

### Setup Domain
> NOTE: first make sure that you add a record to your DNS domain that point to the machine that dokku in
```
dokku domains:set birds-api <your domain>
```

- set `DEV_SERVER_URL` to the domain that points to the `birds-api` (with https:// at the begin)
```
dokku config:set birds-api DEV_SERVER_URL=https://<your domain>
```

### HTTPS Certificate

- enter your email

```
dokku config:set --no-restart birds-api DOKKU_LETSENCRYPT_EMAIL=<your email>
```

- issue the certificate

```
dokku letsencrypt:enable birds-api
```

### Push the Code
- go to your local computer
- navigate to this repository root
- push code
```
git push dokku@<your domain>:birds-api main
```
