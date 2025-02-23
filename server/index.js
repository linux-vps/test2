// ./index.js

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import './services/cronJob.js';
import apiRoutes from './routes/index.js';
import { PORT } from './config/config.js';
import {errorHandler}  from './middlewares/errorHandler.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// log requests ra
app.use(morgan('dev'));


app.use('/api', apiRoutes);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Port: ${PORT}`);
});
