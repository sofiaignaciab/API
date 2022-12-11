const express = require("express");
const userSchema = require("../models/user");
const SeatSchema = require("../models/movieseats");

const router = express.Router();

//create user
router.post('/users', (req,res) => {
    const user = userSchema(req.body);
    user.save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});

//get all users
router.get('/users', (req,res) => {
    userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});

//get a user
router.get('/users/:id', (req,res) => {
    const {id} = req.params;
    userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});

router.get('/users/login/:email&:password', (req, res) => {
    const {email, password} = req.params;
    userSchema.find({email: email, password: password})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

//update a user
router.put('/users/:id', (req,res) => {
    const {id} = req.params;
    const {nombre, usuario, email} = req.body;
    userSchema
    .updateOne({_id : id}, {$set: {nombre, usuario, email}})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});

//delete a user
router.delete('/users/:id', (req,res) => {
    const {id} = req.params;
    userSchema
    .remove({_id : id})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});

router.get('/events', (req, res) => {
    SeatSchema.find()
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message:error}));
})

router.post('/events/add', (req, res) => {
    const event = SeatSchema(req.body);
    console.log(event);
    event.save()
        .then((data)=>res.json(data))
        .catch(error =>res.json({message: error}));
})

router.put('/events/update', (req, res) => {
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

router.get('/events/:title', (req, res) => {
    const {Title} = req.params;
    SeatSchema.find({title: Title})
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message:error}));
})


module.exports = router