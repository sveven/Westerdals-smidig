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

  create.createProductInDay(req.params.productid, 1, req.params.dayid).then(result => {

    res.status(204).send();

  }).catch(err => {

    res.status(500).send({error: err});

  });

});

router.delete("/product-in-meal/:productid/:dayid", function(req, res){

  destroy.deleteProductInDay(req.params.dayid, req.params.productid).then(result => {
    
    res.status(204).send();

  }).catch(err => {

    res.status(500).send({error: err});
  })

});


// Add / remove product to week. 

router.put("/product-in-week/:productid", function(req, res) {
  
  create.createProductInWeek(req.params.productid, req.cookies.weekId).then(result => {

    res.status(204).send();

  }).catch(err => {

    res.status(500).send({error: err});

  });


});

router.delete("/product-in-week/:productid", function(req, res){

  destroy.deleteProductInWeek(req.cookies.weekId, req.params.productid).then(result => {

    res.status(204).send();

  }).catch(err => {

    res.status(500).send({error: err});

  });



});



router.put("/recipe-in-meal/:recipeid/:dayid", function(req, res){

  create.addMealToDayQuery(req.params.recipeid).then(result => {

    res.status(204).send();

  }).catch(err => {

    res.status(500).send({error: err});

  });

});

router.delete("/recipe-in-meal/:recipeid/:dayid", function(req, res){

  destroy.deleteMeal(req.params.recipeid).then(result => {

    res.status(204).send();

  }).catch(err => {

    res.status(500).send({error: err});

  });

});


router.get("/week", function(req, res){

  fetch.fetchDaysInWeek(req.cookies.weekId).then(result => {

    res.send(result);

  }).catch(err => {

    res.status(500).send({error: err});

  });

});


//Hent ut all informasjon til handlekurven

router.get("/all", function(req,res){

  fetch.fetchAllProductsQuery(req.cookies.weekid).then(result => {

    res.send(result);

  }).catch(err => {

    res.status(500).send({error: err});

  });
})


module.exports = router;