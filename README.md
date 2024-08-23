# Bill Splitting App

A backend application for splitting bills among users. The application allows users to manage their accounts, create and manage groups, create and manage bills, and handle payments. It provides RESTful APIs for interacting with these features.


## Setup and Running

1. Clone the repository.
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory of your project and configure the following environment variables:
PORT=3000
DB_CONNECTION= "database url"
JWT_SECRET=your_secret_key
JWT_REFRESH_EXPIRY_TIME=1d
4. Run the application: `npm start`


## Features

- User Registration and Login
- Group Management
- Bill Creation and Management
- Payment Handling
- Rate Limiting
- Error Handling

## API Endpoints

### User Routes

- **Register User**
  - `POST /api/v1/user/register`
  - Request Body: `{ "name": "string", "email": "string", "password": "string" }`
  - Description: Registers a new user.

- **Login User**
  - `POST /api/v1/user/login`
  - Request Body: `{ "email": "string", "password": "string" }`
  - Description: Authenticates a user and returns a JWT.
- **Get User**
  - `GET /api/v1/user/login`
  - Description: Get All Users.
- **Get User By Id**
  - `GET /api/v1/user/:id`
  - Description: Get User Details.
- **Update User**
  - `PUT /api/v1/user/update`
  -  Request Body: `{ "email": "string", "password": "string" }`
  - Description: Allows an authenticated user to update their profile         information. The user must provide valid credentials (JWT) to access this endpoint..
### Group Routes

- **Create Group**
  - `POST /api/v1/group/create`
  - Request Body: `{ "name": "string", "description": "string" }`
  - Description: Creates a new group.

- **Add Members to Group**
  - `PUT /api/v1/group/:groupId/addMember`
  - Request Body: `{ "userIds": ["userObjectId1", "userObjectId2"] }`
  - Description: Adds users to a specified group.

- **Remove Members from Group**
  - `DELETE /api/v1/group/:groupId/removeMember`
  - Request Body: `{ "userIds": ["userObjectId1", "userObjectId2"] }`
  - Description: Removes users from a specified group.
- **Get Group by ID**
  - `GET /api/v1/group/:id`
  - Description:Retrieve a specific group's details by its ID.
- **Get Group by Logged userID**
  - `GET /api/v1/group/`
  - description: Fetch all groups created by the authenticated user
- **Delete Group By GroupId**
  - `DELETE /api/v1/group/:groupId`
  - description: Delete a group by its ID
### Bill Routes

- **Create Bill**
  - `POST /api/v1/bill/create`
  - Request Body: `{ "groupId": "ObjectId","createdBy:userId", "items": [...], "totalAmount": "number", "splitType": "equal | custom | percentage", "splitDetails": [...] }`
  - example Request: {
  "groupId": "60d21b4667d0d8992e610c85",
  "createdBy": "60d21b4667d0d8992e610c84",
  "items": [
    {
      "name": "Party",
      "quantity": 10,
      "price": 120
    }
  ],
  "totalAmount": 1200,
  "splitType": "percentage",
  "splitDetails": [
    {
      "userId": "60d21b4667d0d8992e610c86",
      "percentage": 50
    },
    {
      "userId": "60d21b4667d0d8992e610c87",
      "percentage": 30
    },
    {
      "userId": "60d21b4667d0d8992e610c88",
      "percentage": 20
    }
  ]
}

  - Description: Creates a new bill.

- **Update Bill**
  - `PUT /api/v1/bill/:billId`
  - Request Body: `{ "items": [...], "totalAmount": "number", "splitType": "equal | custom | percentage", "splitDetails": [...] }`
  - example Request : look Like bill create request body.
  - Description: Updates an existing bill.
- **get Bill by BillId**
  - `GET /api/v1/bill/:id`
  - Description : Gets a bill details.
### Payment Routes

- **Create Payment**
  - `POST /api/v1/payment/pay`
  - Request Body: `{ "billId": "ObjectId", "userId": "ObjectId", "amount":    "number", "method": "CASH | BANK_TRANSFER | UPI" }`
  - Description: Records a payment for a bill.

- **Get Payment History**
  - `GET /api/v1/payment/history`
  - Query Parameters: `{ "billId": "ObjectId" or "userId": "ObjectId"  or"groupId": "ObjectId }`
  - Description: Retrieves the payment history.

## Error Handling

The API returns standard HTTP status codes and error messages. Ensure to handle errors properly in your client application.

## Rate Limiting

The application uses rate limiting to protect against abuse. The default rate limit is 100 requests per 10 minutes per IP address.


