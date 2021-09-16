# TAP 2021 Assignment

## Description

A MVP employee salary management web application built using MERN stack and other third party libraries and APIs. The application mainly supports two user stories:

1. Admin uploads employees' data with csv files
2. Admin views employees' information on dashboard with filter and sort features

Tech Stack

- Node provides the backend environment for the application
- Express exposes middleware to handle requests, routes and responses
- Mongoose schemas to model the app data
- React for rendering and displaying UI components

## Install

## Set up

```
$ git clone https://github.com/huiyuank/tapassignment/.git
$ npm install
```

## Run application

### Database

Replica sets or sharded clusters are necessary for (transactions)[https://docs.mongodb.com/manual/core/transactions/#general-information] in MongoDB 4.0 and Mongoose 5.2.0.

```
mongod --replSet rs0
```

### Backend (Express, Node)

In the salarymgtapp folder,

```
node server.js
```

If successful, the following messages will be logged onto console:

```
Server listening on port 8080!
Connection to MongoDB successful!
```

### Frontend

In the client folder,

```
$ npm start
```

## Application architecture and assumptions

### Upload employee data (User Story 1)

Rows starting with '#' are ignored refer to records with 'id' field starting with '#'.
