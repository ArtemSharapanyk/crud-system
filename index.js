const mainRouter = require('./routes/baseRouter');

const cors = require('cors');
const express   = require('express');
const {connect} = require('mongoose');
const config = require('config');const baseRouter = require('./routes/baseRouter');

const PORT = config.get('port') || 3000;
const URL_DATABASE = config.get('mongoUrl');

const app = express();

app.use(cors());

app.use('/',baseRouter)

const startServer = async () => {
    try{
        await connect(URL_DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        app.listen(PORT, () => {
            console.log('server has started')
        })
    }catch(e){
        console.log(e);
        process.exitCode(1);
    }
};

startServer();