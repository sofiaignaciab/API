const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({path: '../.env'});

const Routes = require('./routes/user');

const app = express();
app.use(cors());

//middleware
app.use(express.json());
app.use('/api', Routes);

app.get('/', (req,res)=>{
    res.send('hello!');
});

//mongodb connection
mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log('connected to MONGODB atlas'))
    .catch((error)=>console.log(error));

app.listen(27017, () => console.log('listening in port 27017'));