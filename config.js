// var mongodb  = require('mongodb');
// const dotenv = require('dotenv').config();
// let url = process.env.DB;
// var mongoclient =new mongodb.MongoClient();

// let connection ;
// let db;


// async function connectDb(){
//     connection = await mongoclient.connect(url);
//     db = connection.db("itemcatalog");
//     return db ;  
// }

// async function closeConnection(){
//     if(connection){
//         await connection.close();
//     }
//     else{
//         console.log('No Connection')
//     }

// }

// module.exports = {connectDb,db,connection,closeConnection};