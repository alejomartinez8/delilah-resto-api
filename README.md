# Delilah resto api

Project 3 - Acamica Fullstack Web Dev Career

- [Delilah resto api](#delilah-resto-api)
  - [Main Modules](#main-modules)
  - [Installation](#installation)
    - [Node](#node)
    - [Database](#database)
    - [JWT](#jwt)
    - [Migrations](#migrations)
    - [Data Example](#data-example)
  - [Running the api](#running-the-api)
    - [Using local node server](#using-local-node-server)
    - [Swagger](#swagger)

## Main Modules

- express
- joi
- sequelize
- swagger-ui-express
- eslint
- husky
- sequelize-cli

## Installation

### Node

```bash
npm install
```

### Database

1. Add env vars to the `.env` file

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=password
DB_NAME=delila-resto-db
```

2. Install mysql and create a new databe with the same name above (`DB_NANE`), alternatively you can create it with the next command after created `.env` fila and adding the env vars:

```bash
sequelize-cli db:create
```

Verify that db was created on mysql

### JWT

Add the secret word to `.env` file

```
JWT_SECRET=My_secret_jwt
```

### Migrations

You can create the table with the commands

```bash
sequelize-cli db:migrate
```

### Data Example

You can add some data example to DB, this command must be after migrations

```bash
sequelize-cli db:seed:all
```

## Running the api

### Using local node server
Yo can run the api with command
```
npm run dev
```

### Swagger
To interact with the api, and its endpotins and models, you can use 2 options:

1. http://localhost:4000/api-docs/ (Be sure you choose this server on Swagger Web UI)
2. https://delilah-resto-api-am.herokuapp.com/api-docs/ (Live version)

To use an admin example you can use these credentials:

```
username: admin
password: admin123
```

To access to restricted endpoint, use the `login` endpoint first, copy the JWT and click on `Authorize` option.