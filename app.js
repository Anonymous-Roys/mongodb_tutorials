const express = require('express');
const {connectToDb, getDb } = require('./db')


//init app & middleware

const app = express();

//dbb connection
let db;
connectToDb((err)=>{
    if(!err){
        app.listen(3000,() => {
            console.log("Listening on port 3000")
        })
        db = getDb()
    }
})




//Routes
app.get('/books', (req, res) =>{
    db.collection('books')
    .find()   //cursor toArray forEach
    res.json({mssg:'Welcome to the api'})
})