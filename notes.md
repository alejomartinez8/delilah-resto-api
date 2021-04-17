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
