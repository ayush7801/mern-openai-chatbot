import express from 'express';
import {config} from 'dotenv';
import morgan from 'morgan';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Load environment variables
config();

const app = express();

// Define your list of allowed origins
const allowedOrigins = ['https://mern-openai-chatbot.onrender.com', 'https://dinogpt.site', 'https://www.dinogpt.site', 'http://localhost:3000' ];

// Middlewares
app.use(cors({origin: function(origin, callback){
    // Allow requests with no origin (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }, credentials: true}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan('dev'));

app.use('/api/v1', appRouter);

export default app;