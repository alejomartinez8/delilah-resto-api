# Delilah resto api

Project 3 - Acamica Fullstack Web Dev Career

- [Delilah resto api](#delilah-resto-api)
  - [Installation](#installation)
    - [Node](#node)
    - [Database](#database)
    - [JWT](#jwt)
    - [Migrations](#migrations)
    - [Data Example](#data-example)
  - [Running the api](#running-the-api)
    - [Using local node server](#using-local-node-server)
    - [Swagger](#swagger)

## Installation

### Node

```bash
npm install
```

### Database

1. Install mysql and create a new table.
2. Add env vars to the `.env` file

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=password
DB_NAME=delila-resto-db
```

### JWT

Add the secret word to `env` file

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
Yo can run the api with commmand
```
npm run dev
```

### Swagger
To interact with the api, and its endpotins and models, you can use 2 options:

1. http://localhost:4000/api-docs/ (Be sure you choose this server on Swagger Web)
2. https://delilah-resto-api-am.herokuapp.com/api-docs/ (Live version with some examples)

To use an admin example you can use these credentials:

```
username: admin
password: admin123
```

To access to restricted endpoint, use the `login` endpoint first, copy the JWT and click on `Authorize` option.