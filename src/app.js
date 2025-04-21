import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import {AuthRouter} from './users/route.js';

const app = express();

// Middleware
app.use(express.json());

// for cookies
app.use(cookieParser());

// log requests
app.use(morgan("dev"));

// Routes
app.get('/', (req, res) => {
  res.send('Hello from music app server!');
});

app.use('/api/v1/auth', AuthRouter);

export { app };