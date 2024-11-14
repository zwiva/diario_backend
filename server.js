import express from 'express';

import mysql from 'mysql2/promise';

import cors from 'cors';



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
// const db = mysql.createConnection(credentials).connect(err => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }
//   console.log('Connected to MySQL xxxxx');
// }
// );


const connection = await mysql.createConnection(credentials);




// Init
// const PORT = process.env.PORT || APP_PORT;
const PORT = process.env.PORT || 3306;

// console.log('db', db);

// app.get('/db', async (req, res) => {

//   db.query('SELECT * FROM users', (err, results) => {
//     if (err) {
//       console.error('Error executing query: ' + err.stack);
//       res.status(500).send('Error fetching users');
//       return;
//     }
//     console.log("results", results);
//     res.json(results);
//   });  
// });



app.get('/db', async (req, res) => {

  // // Fetch users from the database
  // db.query('SELECT * FROM users', (error, results) => {
  //   if (error) {
  //     console.error('Error fetching users from the database: ' + error.stack);
  //     return res.status(500).json({ error: 'Failed to fetch users' });
  //   }
  //   console.log("results >>>>> ", results);
  //   res.json(results);

  // });



  try {
    const [results, fields] = await connection.query(
      'SELECT * FROM users'
    );
  
    console.log('results', results); // results contains rows returned by server
    console.log('fields', fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
  }


});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})








// Get the client

// Create the connection to database


// A simple SELECT query

