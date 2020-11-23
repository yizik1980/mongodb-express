var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var url = 'mongodb://localhost:27017/sample'
/* GET home page. */
router.get('/', function(req, res, next) {
    var mongoClient = mongodb.MongoClient;
    mongoClient.connect(url, function(err,client) {
      if(err){
        console.log(err);
      }
      let allCollections = [];
      //create client by providing database name
      const db = client.db("local");
      db.collection("student").find({}).toArray(function(er, result){
        console.log(result);
        res.send("חיבור התבצע");
      })
      client.close();
    })
    
});
router.post('/saveUser',function(req, res){
      var mongoClient = mongodb.MongoClient;
  mongoClient.connect(url, function(err,client) {
      if(err){
        console.log(err);
      }
      //create client by providing database name
        var myobj = { name: "kobi", last: "doby", age:Math.floor(Math.random()*100),gender:"female",phone:"0534344399" };
      const db = client.db("local");
      db.collection("student").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted",myobj);
     
      });
         client.close();
         res.send(myobj);
    });
});
module.exports = router;
