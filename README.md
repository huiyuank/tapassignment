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
$ cd client
$ npm install
```

## Run application

### Database (Mongo/Mongoose)

Replica sets or sharded clusters are necessary for [transactions](https://docs.mongodb.com/manual/core/transactions/) in MongoDB 4.0 and Mongoose 5.2.0.

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

### Frontend (React)

In the client folder,

```
$ npm start
```

The frontend server is listening on port 3000 by default on create-react-app.

## Application architecture and assumptions

### Upload employee data (User Story 1)

#### Upload interface

![uploadpage](https://user-images.githubusercontent.com/71057935/133646010-f502fd8e-815e-4b78-a4ff-b77b910cf121.jpg)

#### Assumptions about data

Rows starting with '#' are ignored refer to records with 'id' field starting with '#'.

### Employee dashboard feature (User Story 2)

#### Dashboard interface

![userspage](https://user-images.githubusercontent.com/71057935/133647530-89ef36d5-939e-4fb7-9e0d-5f2b36565293.jpg)

On rendering the dashboard, API to the backend server is called (GET /api/users) to initialize the state. The backend handles the query to limit the query number, filter the salary and sort the results according to the parameters stored as state, which is manipulated by the functions of the components on the frontend interface.

### Better UX when uploading large files (User Story 4)

![uploadingspinner](https://user-images.githubusercontent.com/71057935/133646777-8b73f113-23c5-434c-b797-37fcf52ae280.gif)

To improve user experience on the frontend, on submit action, the file input and submit button will be disabled and rendered with spinners until the entire upload into the database is completed, either accepted or rejected.

![uploadsuccess](https://user-images.githubusercontent.com/71057935/133646858-45a62520-1dd7-4825-9ecf-e817ba009409.jpg)
![uploadfail](https://user-images.githubusercontent.com/71057935/133646874-69ae910a-5a19-49ff-b543-0ed2bf38872f.jpg)

On a successful upload, a green alert will show up, and on a failed transaction, the red alert shows up. Even if the user is on a different sub-page, a badge notification in green or red color to signify the status will appear next to the upload tab on the menu.
