# Delilah restó API

## Products

Model:

```
- name
- price
- imgUrl
- description
```

### Endpoints

- [x] GET /products -> Get all (All)
- [x] GET /products/:id -> Get Product (All)
- [x] POST /products/create -> Create product (Admin)
- [x] PUT /products/:id -> Update product (Admin)
- [x] DELETE /products/:id -> Delete (Admin)

## Orders

### Model:

```
- orderId
- orderDate
- productsList
- paymentType
- paymentValue
- address
- user
- status
```

### Endpoints

- [ ] POST /orders/create -> Create an order (User - Admin)
- [ ] GET /orders -> Get all orders (User(owner) - Admin)
- [ ] GET /order/getById -> Get an specific order (User(owner) - Admin)
- [ ] PUT /orders/:id -> Update order (User(owner) - Admin)
- [ ] DELETE /orders/:id -> Delete order (User(owner) - Admin)

### Exceptions:

- only admin can modify state
- if order is close only admin can modify or delete

## Users

### Model:

```
- username
- names
- email
- phone
- address
- password
```

### Endpoints:

- [x] POST /users/login -> Login (All)
- [x] POST /users/register -> Register (All)
- [x] GET /users/getProfile -> Get self info (All)
- [x] GET /users/getById/:id -> Infor User by Id (Only Admin)
- [x] GET /users -> Get all (Only Admin)
- [x] PUT /users/:id -> Update User (Only self or Admin)
- [x] DELETE /users/:id -> Delete User (Only self or Admin)

## Sequelize CLI

> `npm install -D sequelize-cli` for local use or
> `npm -g sequelize` to use global

### Steps to create migrations, models and seeds

1. Init sequelize

   > `npx sequelize-cli init`

   > `sequelize init`

2. Configure DATA_BASES in config/config.js
3. Create users
   > `npx sequelize-cli model:generate --name User --attributes username:string,names:string,email:string,phone:string,address:string,password:string`
4. Add param to field of tables in migrations and model, depending on project.
5. To create the table use
   > `npx sequelize-cli db:migrate`
6. To undo all the migration use

   > `npx sequelize-cli db:migrate:all`

   or specific migration use

   > `npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js`

7. To create a seeds
   > `npx sequelize-cli seed:generate --name demo-user`
8. Complete seeds on 'seeders'.
9. To load data to DB use
   > `npx sequelize-cli db:seed:all`

### Commands used

// Creating the User model and migratio

> `npx sequelize-cli model:generate --name User --attributes username:string,names:string,email:string,phone:string,address:string,password:string` > `npx sequelize-cli seed:generate --name demo-user`

// Creating the Product model and migration

> `npx sequelize-cli model:generate --name Product --attribute name:string,price:number,description:string,imageURL:string` > `npx sequelize-cli seed:generate --name demo-product`

// Creating the Order model and migration

> `npx sequelize-cli model:generate --name Order --attributes orderDate:date,paymentType:string,total:decimal,status:string`

// Creating the ProductOrder model and migration

> `sequelize model:create --name ProductOrder --attributes productId:integer,orderId:integer,quantity:decimal`

# Docker

## download the image

> `docker pull mysql`

# run the container

> `docker run --name docker-mysql --network host -e MYSQL_ROOT_PASSWORD=password -d mysql` > `docker run --rm --name=docker-mysql --env MYSQL_ROOT_PASSWORD=password --detach --publish 3306:3306 mysql`

`--name` container name
`--network` specify the network of container
`-e` environment variable
`-d` run detached #[image name] image name

# list docker containers running

> `docker ps -a`

# Download the image of phpmyadmin

> `docker pull phpmyadmin`

# Connect to database in the same network with phpmyadmin

> `docker run --name myadmin -d --link docker-mysql:db -p 8080:80 phpmyadmin`

# Usage with external server

> `docker run --name myadmin -d -e PMA_HOST=host -p 8080:80 phpmyadmin`
