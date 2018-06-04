//Legge til vare til dag
//Fjerne vare knyttet til 

const express = require("express");
const router = express.Router();
const connection = require("../components/kolonialapi/requestHandler");
const create = require("../queries/plannerCreateQueries");
const destroy = require("../queries/plannerDeleteQueries");
const fetch = require("../queries/plannerFetchQueries");


// Add / remove product to day.

router.put("/product-in-meal/:productid/:dayid", function(req, res) {

  let result = create.createProductInDay(req.params.productid, 1, req.params.dayid);


    // TODO: check result properly, right now it just checks wether result exists or not. 

  if(result){
  
    res.status(204).send();

  } else {
    
    res.status(500).send({error: "Could not insert product."});
  
  }


});

router.delete("/product-in-meal/:productid/:dayid", function(req, res){

  let result = destroy.deleteProductInDay(req.params.dayid, req.params.productid);

  if(result){
  
    res.status(204).send();

  } else {
    
    res.status(500).send({error: "Could not delete product."});
  
  }

});


// Add / remove product to week. 

router.put("/product-in-week/:productid", function(req, res) {

  req.params.productid;
  
  let result = create.createProductInWeek(req.params.productid, req.cookies.weekId);

  if(result){
  
    res.status(204).send();

  } else {
    
    res.status(500).send({error: "Could not insert product."});
  
  }

});

router.delete("/product-in-week/:productid", function(req, res){

  let result = destroy.deleteProductInWeek(req.cookies.weekId, req.params.productid);

  if(result){
  
    res.status(204).send();

  } else {
    
    res.status(500).send({error: "Could not delete product."});
  
  }

});



router.put("/recipe-in-meal/:recipeid/:dayid", function(req, res){

  let result = create.addMealToDayQuery(req.params.recipeid);

  if(result){
    res.status(204).send();
  } else {
    res.status(500).send({error: "Could not add recipe."});
  }
  

});

router.delete("/recipe-in-meal/:recipeid/:dayid", function(req, res){

  let result = destroy.deleteMeal(req.params.recipeid);

  if(result){
    res.status(204).send();
  } else {
    res.status(500).send({error: "Could not delete recie."})
  }

});


router.get("/week", function(req, res){

  let result = fetch.fetchDaysInWeek(req.cookies.weekId);

  if(result){
    res.send(result);
  } else {
    res.status(500).send({error: "Could not fetch week."});
  }

});


//Hent ut all informasjon til handlekurven

rotuer.get("/all", function(req,res){

  let result = fetch.fetchAllProductsQuery(req.cookies.weekid);

  if(result){
    res.send(result);
  } else {
    res.status(500).send({error: "Could not get all products."}) 
  }
})


module.exports = router;