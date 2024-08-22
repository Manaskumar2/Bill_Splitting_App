# Bill Splitting App

A backend application for splitting bills among users. The application allows users to manage their accounts, create and manage groups, create and update bills, and handle payments. It provides RESTful APIs for interacting with these features.

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

### Group Routes

- **Create Group**
  - `POST /api/v1/group/create`
  - Request Body: `{ "name": "string", "description": "string" }`
  - Description: Creates a new group.

- **Add Members to Group**
  - `POST /api/v1/group/:groupId/addMembers`
  - Request Body: `{ "userIds": ["userId1", "userId2"] }`
  - Description: Adds users to a specified group.

- **Remove Members from Group**
  - `DELETE /api/v1/group/:groupId/removeMembers`
  - Request Body: `{ "userIds": ["userId1", "userId2"] }`
  - Description: Removes users from a specified group.

### Bill Routes

- **Create Bill**
  - `POST /api/v1/bill`
  - Request Body: `{ "groupId": "ObjectId", "items": [...], "totalAmount": "number", "splitType": "equal | custom | percentage", "splitDetails": [...] }`
  - Description: Creates a new bill.

- **Update Bill**
  - `PUT /api/v1/bill/:billId`
  - Request Body: `{ "items": [...], "totalAmount": "number", "splitType": "equal | custom | percentage", "splitDetails": [...] }`
  - Description: Updates an existing bill.

### Payment Routes

- **Create Payment**
  - `POST /api/v1/payment`
  - Request Body: `{ "billId": "ObjectId", "userId": "ObjectId", "amount": "number", "method": "CASH | BANK_TRANSFER | UPI" }`
  - Description: Records a payment for a bill.

- **Get Payment History**
  - `GET /api/v1/payment/history`
  - Query Parameters: `{ "billId": "ObjectId" }`
  - Description: Retrieves the payment history for a specified bill.

## Error Handling

The API returns standard HTTP status codes and error messages. Ensure to handle errors properly in your client application.

## Rate Limiting

The application uses rate limiting to protect against abuse. The default rate limit is 100 requests per 15 minutes per IP address.

## Setup and Running

1. Clone the repository.
2. Install dependencies: `npm install`
3. Configure your environment variables.
4. Run the application: `npm start`

