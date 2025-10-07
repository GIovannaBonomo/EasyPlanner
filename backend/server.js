import 'dotenv/config'; 
import cors from 'cors'; 
import express, { Router } from 'express';
import userRouter from './routes/user.js';
import { connect } from 'mongoose';
import { connectDB } from './db.js';
import clientRouter from './routes/client.js';
import serviceRouter from './routes/service.js';
import appointmentRouter from './routes/appointment.js';


const port = process.env.PORT || 5000;
const server = express();

server.use(cors()); 
server.use(express.json()); 

server.use('/user', userRouter);
server.use('/client', clientRouter)
server.use('/service', serviceRouter)
server.use("/appointment", appointmentRouter)

connectDB();

server.listen(port, () => console.log(`Server avviato sulla porta ${port}`));
