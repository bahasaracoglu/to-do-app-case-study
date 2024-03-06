# ToDo App

This is a simple ToDo app with separate frontend and backend folders.

## Frontend

To run the frontend, navigate to the `frontend` folder in your terminal and follow these steps:

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Technologies Used

- React
- Material-UI (MUI)
- Firebase Storage (for file upload)

## Backend

To run the backend, navigate to the `backend` folder in your terminal and follow these steps:

1. Install dependencies:

```bash
npm install
```

2. Reset the database:

```bash
npm run resetdb
```

3. Start the server:

```bash
npm run server
```

The app will be available at [http://localhost:9000](http://localhost:9000).

### Technologies Used

- Node.js
- Express
- JWT Token (for authentication)

## Usage

You can create a new user through the signup page or use the following credentials to log in:

- Email: elonmusk@notmail.com
- Password: 1234

Feel free to explore and manage your ToDo list!

## Notes

- The frontend and backend folders should be run concurrently for the app to work seamlessly.
- Make sure to reset the database and start the server on the backend before using the app.
