import express from 'express'
import mongooseConnection from './config/mongooseConnection.js'
import dotenv from 'dotenv';
import userRouter from './routes/userRouter.js'
import cookieParser from 'cookie-parser';
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
dotenv.config();

app.use('/api/user',userRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});