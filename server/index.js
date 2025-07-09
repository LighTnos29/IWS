import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongooseConnection from './config/mongooseConnection.js'
import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRouter.js'
import cookieParser from 'cookie-parser';
import passport from 'passport';
import './config/passport.js';

const app = express();

app.use(passport.initialize());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
