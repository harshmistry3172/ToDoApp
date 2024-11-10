# ToDo App

A simple and user-friendly To-Do list application that allows users to create an account, log in, and manage their tasks efficiently. The backend is deployed on Back4App, and the front-end is hosted on Vercel.

## Deployment Links:
- **Frontend (Vercel)**: [ToDo App](https://to-do-app-dusky-psi.vercel.app/)
- **GitHub Repository**: [ToDoApp GitHub Repo](https://github.com/harshmistry3172/ToDoApp)

## Features:
- User authentication with email and password (Login/Signup).
- Create, read, and delete tasks.
- Simple and responsive UI.

## Tools & Libraries Used:
- **Frontend**:
  - **React.js**: JavaScript library for building user interfaces.
  - **React Router**: Library for navigation and routing in React apps.
  - **Axios**: For making HTTP requests to the backend API.
  
- **Backend**:
  - **Node.js**: JavaScript runtime for the backend.
  - **Express.js**: Web framework for Node.js.
  - **MongoDB (Back4App)**: Cloud-hosted MongoDB instance for data storage.
  - **JWT (JSON Web Token)**: Used for handling user authentication.
  - **bcryptjs**: Library for hashing passwords before saving them to the database.

## Setup Instructions:

### Front-End Setup:

1. Clone the repository:

   ```bash
   git clone https://github.com/harshmistry3172/ToDoApp.git
   cd ToDoApp

2. Run Back-End:

   ```bash
   cd backend
   npm run dev

3. Run Front-End
   
   ```bash
   cd frontend
   npm start

4. Add .env file in backend including MONGODB_URI, JWT_SECREAT & PORT


## Challenges Faced and Decisions Made:

### CORS Policy Issue:

While deploying the backend on Vercel, we faced CORS (Cross-Origin Resource Sharing) issues, which prevented the front-end from making requests to the backend due to domain restrictions.

#### Solution:
To resolve this, we decided to deploy the backend on Back4App, which provides cloud-hosted MongoDB services and supports handling CORS. The front-end was kept on Vercel, which works seamlessly with the deployed backend on Back4App.

