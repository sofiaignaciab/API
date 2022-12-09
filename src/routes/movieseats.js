const express = require("express");
const SeatSchema = require("../models/movieseats");

const router = express.Router();

//seleccionar asiento
router.post('/seat', (req,res)=>{
    const seat = SeatSchema(req.body);
})

