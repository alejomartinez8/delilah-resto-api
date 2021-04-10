## Orders

# Model:

_ productsList
_ state
_ paymentType
_ paymentValue
_ address
_ user
_ hour
_ id

POST /orders/create -> Create an order (All)
PUT /orders/update/:id -> Update order (All) - Admin only can update state
GET /orders/getAll -> Get all orders (Admin - User if owner)
GET /order/getById -> Get an specific order (Admin - Users if owner)
DELETE /orders/delete/:id -> Delete order (Admin)

# Excepctions:

- only admin can modify state
- if order is close only admin can modify or delete

## Products

Model:

- name
- price
- imgUrl
- description

GET /products -> Get all (All)
GET /products/:id -> Get Product (All)
POST /products/create -> Create product (Admin)
PUT /products/update/:id -> Update product (Admin)
DELETE /products/delete/:id -> Delete (Admin)

## User

# Model:

- username
- names
- email
- phone
- address
- password

# Endpoints:

POST /users/login -> Login (All)
POST /users/register -> Register (All)
GET /users/getUser -> Get self info (All)
GET /users/getById/:id -> Infor User by Id (Only Admin)
GET /users -> Get all (Only Admin)
PUT /users/update/:id -> Update User (Only self or Admin)
DELETE /users/delete/:id -> Delete User (Only self or Admin)