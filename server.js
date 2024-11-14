const express = require('express')
// import express from 'express';

const cors = require('cors')
// import cors from 'cors';

const mysql = require('mysql2')
// import mysql from 'mysql2';

// import { PORT as APP_PORT } from './src/config/config.js';

const app = express();

// Middlewares
const logRequest = (req, _, next) => {
  console.log(`Received a ${req.method} request from ${req.ip}`);
  next();
};
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logRequest);

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));



// Routes
// import authRoutes from './src/app/auth/routes/auth.route.js';
// import usersRoutes from './src/app/users/routes/users.route.js';

// app.use(
//   '/',
//   authRoutes,
//   usersRoutes
// );

// Endpoint GET
app.get('/', (_, res) => {
  res.send('Hello World!');
});

// Endpoint POST
app.post('/', (req, res) => {
  res.send(req.body);
});

const credentials = {
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE
}

console.log('credentials', credentials);

// const mysql = require('mysql2'); // or require('mysql2').createConnectionPromise
const db = mysql.createConnection(credentials).connect(err => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL');
  }
);

// Init
// const PORT = process.env.PORT || APP_PORT;
const PORT = process.env.PORT || 3306;


app.get('/db', async (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Error fetching users');
      return;
    }
    console.log("results", results);
    res.json(results);
  });  
});



app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})
