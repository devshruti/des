# E-commerce Backend Application

This repository contains a Node.js and Express-based backend for an e-commerce application, implementing user authentication, product management, and access control.

## Table of Contents

1. [Installation](#installation)
2. [Environment Variables](#environment-variables)
3. [Usage](#usage)
4. [API Endpoints](#api-endpoints)
    - [User Routes](#user-routes)
    - [Product Routes](#product-routes)
5. [Middleware](#middleware)
6. [Dependencies](#dependencies)

## Installation

To install and run this application locally:

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Ensure you have a MongoDB instance running and accessible.

4. Create a `.env` file in the root directory and add the necessary environment variables (see below).

5. Start the server:
    ```bash
    npm start
    ```

## Environment Variables

The application uses the following environment variables:

- `port`: The port number the server will listen on (default: 8080).
- `secretkey`: Secret key for generating JWT access tokens.
- `refreshSecretkey`: Secret key for generating JWT refresh tokens.
- `mongo_URI`: MongoDB connection string.

## Usage

Run the application using:

```bash
npm start
```

The server will run on the specified port (default: 8080).

## API Endpoints

### User Routes

- **POST `/user/register`**: Register a new user.
  - Request Body: `{ username, email, password, role }`
  - Response: `200 OK` on success, `400 Bad Request` for missing fields, `409 Conflict` for duplicate email.

- **POST `/user/login`**: Log in a user.
  - Request Body: `{ email, password }`
  - Response: `200 OK` with access and refresh tokens, `401 Unauthorized` for invalid credentials.

- **GET `/user/getnewtoken`**: Refresh access token using a refresh token.
  - Request Header: `{ authorization: refresh_token }`
  - Response: `200 OK` with new access token, `401 Unauthorized` for invalid/expired refresh token.

- **POST `/user/logout`**: Log out a user.
  - Request Header: `{ authorization: access_token }`
  - Response: `200 OK` on successful logout.

### Product Routes

- **GET `/product`**: Get a list of products, optionally filtered or sorted by category, name, or price.
  - Query Params: `category`, `name`, `sort` (`asc` or `desc`).
  - Response: `200 OK` with product data.

- **GET `/product/:id`**: Get details of a specific product by ID.
  - Response: `200 OK` with product data, `404 Not Found` if the product doesn't exist.

- **POST `/product/search`**: Search for products by name or description.
  - Request Body: `{ text }`
  - Response: `200 OK` with matching products, `404 Not Found` if no matches found.

- **POST `/product/create`**: Add a new product (requires 'write' role).
  - Request Body: `{ name, category, price, description, ... }`
  - Response: `200 OK` on success, `401 Unauthorized` or `400 Bad Request` on failure.

- **PATCH `/product/update/:id`**: Update an existing product (requires 'update' role).
  - Request Body: `{ ...updatedFields }`
  - Response: `200 OK` on success, `404 Not Found` or `500 Internal Server Error` on failure.

- **DELETE `/product/delete/:id`**: Delete a product by ID (requires 'delete' role).
  - Response: `200 OK` on success, `400 Bad Request` on failure.

## Middleware

- **`authMiddleware`**: Ensures that a user is authenticated before accessing certain routes.
- **`checkRole`**: Checks the user's role to authorize specific actions like creating, updating, or deleting products.

## Dependencies

- `express`: A web framework for Node.js.
- `bcrypt`: A library for hashing passwords.
- `jsonwebtoken`: A library for generating and verifying JSON Web Tokens (JWTs).
- `mongoose`: An ODM (Object Data Modeling) library for MongoDB and Node.js.

---

