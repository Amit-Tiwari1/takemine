// index.js
import express from 'express';
import { connectToDatabase } from './src/db/dbConnection.js';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRouter from "./src/routes/userRoute.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Mount the userRouter at the /api path
app.use('/api', userRouter);

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(process.env.PORT || 8000, () => {
      console.log(`App is listening at ${process.env.PORT || 8000}`);
    });
  } catch (error) {
    console.log('Error from app listening:', error);
  }
};

startServer();
