var express = require('express');
var bcrypt = require("bcryptjs");
const { connectDb, closeConnection } = require('../../config');
var router = express.Router();
const mongodb = require('mongodb');
const dotenv = require('dotenv').config();
let url = process.env.DB;
var mongoclient =new mongodb.MongoClient(url);


/* GET home page. */
// router.post('/createuser',async function(req, res, next) {
//   try {
//     const connection =await mongoclient.connect();
//     const db  = connection.db("itemcatalog");
//     let salt =await bcrypt.genSalt(10);
//     console.log(salt);
//     let hash = await bcrypt.hash(req.body.password,salt);
//     console.log(hash);
//     req.body.password = hash;
//   const sneaker = await db.collection('adminlogin').insertOne(req.body);
//   await connection.close();
//   res.json({message : "product created"})  
//   } catch (error) {
//     console.log("error")
//   }
  
// });

router.post('/login',async function(req, res, next) {
  try {
    const connection =await mongoclient.connect();
    const db  = connection.db("itemcatalog");
    const user = await db.collection("adminlogin").findOne({email:req.body.email});
    if(user){
      const compare =await bcrypt.compare(req.body.password,user.password);
      console.log(compare);
      if(compare){
        res.json({message:"success"});
      }
      else{
        res.status(404).json({message : "Incorrect email/password"})
      }
    }else{
      res.status(404).json({message : "Incorrect email/password"})
    }
  
  } catch (error) {
    console.log("error");
  }
});

router.post('/addproduct',async function(req, res, next) {
  try {
    const connection =await mongoclient.connect();
    const db  = connection.db("itemcatalog");
    const product = await db.collection("shoes").insertOne(req.body);
    await connection.close();
  res.json('product added');
  } catch (error) {
    res.status(500).json("Something Went Wrong")
  }
});


router.get('/products',async function(req, res, next) {
  try {
    const connection =await mongoclient.connect();
    const db  = connection.db("itemcatalog");
    const products = await db.collection("shoes").find().toArray();
    await connection.close();
  res.json(products);
  } catch (error) {
    res.status(500).json("Something Went Wrong")
  }
});


router.get('/findproduct/:id',async function(req, res, next) {
  try {
    const connection =await mongoclient.connect();
    const db  = connection.db("itemcatalog");
    const products = await db.collection("shoes").findOne({_id:mongodb.ObjectId(req.params.id)});
    await connection.close();
  res.json(products);
  } catch (error) {
    res.status(500).json("Something Went Wrong")
  }
});


router.post('/editproduct/:id',async function(req, res, next) {
  try {
    const connection =await mongoclient.connect();
    const db  = connection.db("itemcatalog");
    delete req.body._id;
    const product = await db.collection("shoes").updateOne({_id:mongodb.ObjectId(req.params.id)},{$set:req.body});
    await connection.close();
  res.json('product Edited');
  } catch (error) {
    res.status(500).json("Something Went Wrong")
  }
});

router.post('/deleteproduct/:id',async function(req, res, next) {
  try {
    const connection =await mongoclient.connect();
    const db  = connection.db("itemcatalog");
    const product = await db.collection("shoes").deleteOne({_id : mongodb.ObjectId(req.params.id)});
    await connection.close();
  res.json('product deleted');
  } catch (error) {
    res.status(500).json("Something Went Wrong")
  }
});

router.post('/products/filter/brand',async function(req, res, next) {
  console.log(req.body);
  try {
    const connection =await mongoclient.connect();
    const db  = connection.db("itemcatalog");
    const products = await db.collection("shoes").find({brand:`${req.body.brand}` }).toArray();
    await connection.close();
  res.json(products);
  } catch (error) {
    res.status(500).json("Something Went Wrong")
  }
});

router.post('/products/filter/gender',async function(req, res, next) {
  console.log(req.body);
  try {
    const connection =await mongoclient.connect();
    const db  = connection.db("itemcatalog");
    const products = await db.collection("shoes").find({gender:`${req.body.gender}` }).toArray();
    await connection.close();
  res.json(products);
  } catch (error) {
    res.status(500).json("Something Went Wrong")
  }
});

router.post('/products/filter/model',async function(req, res, next) {
  console.log(req.body);
  try {
    const connection =await mongoclient.connect();
    const db  = connection.db("itemcatalog");
    const products = await db.collection("shoes").find({category:`${req.body.Model}` }).toArray();
    await connection.close();
  res.json(products);
  } catch (error) {
    res.status(500).json("Something Went Wrong")
  }
});


module.exports = router;
