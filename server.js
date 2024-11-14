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

console.log('credentials -> ', credentials);

const connection = await mysql.createConnection(credentials);

const PORT = process.env.PORT || 3306;


app.get('/users', async (req, res) => {

  try {
    const [results] = await connection.query('SELECT * FROM users');
    console.log('results', results);
    res.json(results)
  } catch (err) {
    console.error('Error fetching users from the database: ' + err.stack);
    return res.status(500).json({ error: 'Failed to fetch users' });
  }

});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})
