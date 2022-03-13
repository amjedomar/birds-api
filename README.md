# Birds API

A Public Restful API server built using Express.js and documented via Swagger, To retrieve and manipulate birds data

**Table of Contents**

- [Run `birds-api` in your local machine](#run-birds-api-in-your-local-machine)

## Run `birds-api` in your local machine

- Clone repository

```bash
git clone https://github.com/amjedomar/birds-api
```

- Navigate to `birds-api` directory, And Install dependencies

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

- Finally run the following command to start dev server

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
