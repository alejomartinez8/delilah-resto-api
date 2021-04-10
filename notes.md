# Delilah restó API

## User

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

- POST /users/login -> Login (All)
- POST /users/register -> Register (All)
- GET /users/getUser -> Get self info (All)
- GET /users/getById/:id -> Infor User by Id (Only Admin)
- GET /users -> Get all (Only Admin)
- PUT /users/:id -> Update User (Only self or Admin)
- DELETE /users/:id -> Delete User (Only self or Admin)

## Products

Model:

```
- name
- price
- imgUrl
- description
```

### Endpoints

- GET /products -> Get all (All)
- GET /products/:id -> Get Product (All)
- POST /products/create -> Create product (Admin)
- PUT /products/:id -> Update product (Admin)
- DELETE /products/:id -> Delete (Admin)

## Orders

### Model:

```
- productsList
- state
- paymentType
- paymentValue
- address
- user
- hour
- orderId
```

### Endpoints

- POST /orders/create -> Create an order (User - Admin)
- GET /orders -> Get all orders (User(owner) - Admin)
- GET /order/getById -> Get an specific order (User(owner) - Admin)
- PUT /orders/:id -> Update order (User(owner) - Admin)
- DELETE /orders/:id -> Delete order (User(owner) - Admin)

### Exceptions:

- only admin can modify state
- if order is close only admin can modify or delete
