const express = require("express");
const SeatSchema = require("../models/movieseats");

const router = express.Router();

router.post('/addEvent', (req, res) => {
    const event = SeatSchema(req.body);
    console.log(event);
    event.save()
        .then((data)=>res.json(data))
        .catch(error =>res.json({message: error}));
})

router.post('/updateEvent', (req, res) => {
    const {Title} = req.params;
    const filter = {'title': Title};
    const _functions = req.body.functions;

    SeatSchema.findOneAndUpdate(filter, {functions: _functions}, function(err,doc) {
        if (err) {
            return res.status(500).json({err: err.message});
        }
        else return res.json({doc, message:'successfully updated!'})
    })
})

