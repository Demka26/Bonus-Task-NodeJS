// This file will contain all the routes for students

const express = require('express');
const Shoe = require('../model/Shoes');

const router = express.Router();

// Get all the shoes
router.get('/',(req,res)=>{
    // find() - is a mongoDB command to get all objects
    // exec() - will run the command in the db.
    Shoe.find({}).exec((err,shoes)=>{
        if(err) console.log(err.message);
        else res.json(shoes);
    })
})
// GET - get specific shoe:
router.get('/:id',(req,res)=>{
    Shoe.findOne({id: req.params.id}).exec((err,shoe)=>{
        if(err || shoe===null) {
            res.status(404);
            res.send("Error.. shoe was not found!!");

        }
        else {
            res.status(200);
            res.json(shoe);
        }
    })
})

// POST - Add a new shoe(object) to the collection
router.post('/add', (req,res)=>{
    // Create new shoe and get the data from the request body
    let newShoe = new Shoe();
    newShoe.id = req.body.id;
    newShoe.brand = req.body.brand;
    newShoe.model = req.body.model;
    newShoe.year = req.body.year;
    newShoe.size = req.body.size;
    newShoe.amount = req.body.amount;

    newShoe.save((err, shoe)=>{
        if(err){
            res.status(404);
            res.send("Failed saving...");
        }
        else{
            res.status(201);
            res.send('New shoe was added successfully');
        }
    })
})

// PUT - update the shoe's amount:
router.put('/update/:brand',(req,res)=>{

    // const newAmount = req.body.newAmount;

// findOneAndUpdate ({what to update},{new data},(err,success))
    Shoe.findOneAndUpdate(
        { brand: req.params.brand}, { $set: {amount: req.body.newAmount }},
        (err, updatedShoe) =>{
            if(err){
                res.status(404);
                res.send(`Failed updating shoe's amount...`);
            }
            else{
                res.status(200);
                res.send(`shoe's amount was updated successfully`);
            }
        }
    )
})
// DELETE- delete student using it's name in params
router.delete('/delete/:model',(req,res)=>{
    Shoe.deleteOne({model: req.params.model}).exec((err,shoe)=>{
        if(err) {
            res.status(404);
            res.send("Failed deleteing a shoe....");

        }
        else {
            res.status(200);
            res.json(`Shoe was deleted successfully`);
        }
    })
})

module.exports = router;