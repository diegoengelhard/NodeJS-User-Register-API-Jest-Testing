# Register Users API + Jest Testing

## Description
This is a register user API with field validations, email verifiaction, password validation, with JWT and Jest Testing.

## How to use

1. Clone the repo:
    ```bash
    git clone <repo_url>
    ```
2. Change directory:
    ```bash
    cd user-api
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up your .env file:
    ```plaintext
    DB_PORT=your_port # e.g. 3000
    TOKEN_SECRET=your_secret_key # e.g. secret
    TOKEN_EXPIRATION=your_token_expiration # e.g. 1d
    ```

## Start the app

1. Start the server:
    ```bash
    npm run start:dev
    ```

2. API will be available at `http://localhost:3500/api`.

## Endpoints

### User register

**URL**: `/api/user/register`

**Method**: `POST`

**Data**:
```json
{
    "name": "Juan Rodriguez",
    "email": "juan@rodriguez.org",
    "password": "@User12345",
    "phones": [
        {
            "number": "1234567",
            "citycode": "1",
            "contrycode": "57"
        }
    ]
}
```

### Get all users (this is a protected route)

**URL**: `/api/user/all`

**Method**: `GET`

**Headers** `Authorization Bearer <token>`

## Testing
1. Run command:
    ```bash
    npm test
    ```