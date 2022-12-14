const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config();


const Routes = require('./routes/user');

const app = express();
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
}));

//middleware
app.use(express.json());
app.use('/api', Routes);


//mongodb connection
mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log('connected to MONGODB atlas'))
    .catch((error)=>console.log(error));

app.listen(27017, () => console.log('listening in port 27017'));