const express = require('express');
const {connectToDb, getDb } = require('./db');
const { ObjectId } = require('mongodb');


//init app & middleware

const app = express();
app.use(express.json());

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
    let books = []
    db.collection('books')
    .find()   //cursor toArray forEach
    .sort({author:1})
    .forEach(book => books.push(book))
    .then(() =>{
        res.status(200).json(books)
    })
    .catch(()=>{
        res.status(500).json({error: 'Could not fetch the documents'})
    })
    
})

app.get('/books/:id', (req,res) =>{
    if(ObjectId.isValid(req.params.id)){
        db.collection('books')
        .findOne({_id: new ObjectId(req.params.id)})
    .then(doc =>{
        res.status(200).json(doc)

    }).catch(err =>{
        res.status(500).json({error:'Could not find request'})
    })
    // req.params.id
    }else{
        res.status(500).json({error:'Not valid doc id'})
    }

    
})

//setting up post request handler
app.post('/books', (req, res) => {
    const book = req.body

    db.collection('books')
    .insertOne(book)
    .then(result =>{
        res.status(201).json(result)    
    })
    .catch(err =>{
        res.status(500).json({err: 'Could not create the document'})
    })
})