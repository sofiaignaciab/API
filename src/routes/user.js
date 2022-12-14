const express = require("express");
const userSchema = require("../models/user");
const SeatSchema = require("../models/movieseats");
const jwt = require('jsonwebtoken')
const jwt_decode = require("jwt-decode");
require('dotenv').config();

const router = express.Router();

const loginByToken = (token) => {
    const verification = jwt.verify(token, process.env.TOKEN_SECRET)
    if (verification) return jwt_decode(token);
    else return null;
}

router.post('/', (req,res)=> {
    if (req.cookies.token !== undefined) {
        const id = loginByToken(req.cookies.token).aux.ID
        if (id === null) res.status(401).json({ message: 'Token invalid' });
        else {
            userSchema
                .findById(id)
                .then((data) => res.json(data))
                .catch((error) => res.json({message: error}))
        }
    }
    else res.status(404).json({ message: 'Token not found' });
});

//create user
router.post('/users/register', (req,res) => {
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

router.post('/users/login', (req, res) => {
    const {email, password} = req.body;

    userSchema.find({email: email, password: password})
        .then((data) => {
            const aux = {ID: data[0]._id}
            const token = jwt.sign({aux}, process.env.TOKEN_SECRET);
            res.send({token: token, data: data})
        })
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

router.put('/users/update/:id', (req, res) => {
    const {id} = req.params;
    console.log(id)
    const filter = {'_id': id};
    const _reserved_seats = req.body.reserved_seats;
    console.log(_reserved_seats)

    userSchema.findOneAndUpdate(filter, {reserved_seats: _reserved_seats}, function(err,doc) {
        if (err) {
            return res.status(500).json({err: err.message});
        }
        else return res.json({doc, message:'successfully updated!'})
    })
})

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

router.put('/events/update/:Title', (req, res) => {
    const {Title} = req.params;
    console.log(Title)
    const filter = {'title': Title};
    const _fxseats = req.body.fxseats;
    console.log(_fxseats)

    SeatSchema.findOneAndUpdate(filter, {fxseats: _fxseats}, function(err,doc) {
        if (err) {
            return res.status(500).json({err: err.message});
        }
        else return res.json({doc, message:'successfully updated!'})
    })
})

router.get('/events/:Title', (req, res) => {
    const {Title} = req.params;
    console.log(Title)
    SeatSchema.find({title: Title})
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message:error}));
})


module.exports = router