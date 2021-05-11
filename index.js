import authRouter from './routes/auth/auth.js';
import express from 'express';
import config from 'config';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/User/UserRouter.js';
import dashboardRouter from './routes/Dashboard/DashboardRouter.js';


const PORT = config.get('port') || 3000;
const URL_DATABASE = config.get('mongoUrl');

const app = express();

app.use(cors());

app.use(express.json({ extended: true }));

app.use('/auth',authRouter);
app.use('/user', userRouter);
app.use('/dashboard', dashboardRouter);

const startServer = async () => {
    try{
        mongoose.connect(URL_DATABASE, {
            useUnifiedTopology: true, 
            useNewUrlParser: true,
            useCreateIndex: true
        })

        app.listen(PORT, () => {
            console.log('server has started')
        })
    }catch(e){
        console.log(e);
        process.exitCode(1);
    }
};

startServer();
