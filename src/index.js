const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const userRoutes = require("./routes/user");
const router = express.Router();
const cors = require('cors');

dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use('/api', userRoutes);
app.use(cors());


//routes
app.get('/', (req,res) => {
    res.send('Welcome to my API');
})


//mongodb connection
mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log('connected to MONGODB atlas'))
    .catch((error)=>console.log(error));

app.listen(27017, () => console.log('server listening on port 27017'));