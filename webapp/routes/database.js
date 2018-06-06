const express = require("express");
const router = express.Router();
const connection = require("../components/kolonialapi/requestHandler");
const create = require("../queries/plannerCreateQueries");
const destroy = require("../queries/plannerDeleteQueries");
const fetch = require("../queries/plannerFetchQueries");

router.put("/product-in-day/:productid/:dayid", function(req, res) {
  
  
  create
    .createDayQuery(req.cookies.ukeId, "monday", "breakfast")
    .then(result => {  
      let dayid =  JSON.parse(JSON.stringify(result)).dayId;
      
            create
        .createProductInDay(req.params.productid, 1, dayid)
        .then(result => {
          res.status(204).send();
        })
        .catch(err => {
          res.status(500).send({ error: err });
        });
          
      
    }).catch(err => {
      res.status(500).send({error: err})
    });
  

});

router.delete("/product-in-day/:productid/:dayid", function(req, res) {
  destroy
    .deleteProductInDay(req.params.dayid, req.params.productid)
    .then(result => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).send({ error: err });
    });
});

router.put("/product-in-week/:productid", function(req, res) {
  create
    .createProductInWeek(req.params.productid, req.cookies.ukeId)
    .then(result => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).send({ error: err });
    });
});

router.delete("/product-in-week/:productid", function(req, res) {
  destroy
    .deleteProductInWeek(req.cookies.ukeId, req.params.productid)
    .then(result => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).send({ error: err });
    });
});

router.put("/recipe-in-meal/:recipeid/:dayid", function(req, res) {
  create
    .addMealToDayQuery(req.params.recipeid)
    .then(result => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).send({ error: err });
    });
});


router.delete("/recipe-in-meal/:recipeid/:dayid", function(req, res) {
  destroy
    .deleteMeal(req.params.recipeid)
    .then(result => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).send({ error: err });
    });
});



router.get("/week", function(req, res) {
  fetch
    .fetchDaysInWeek(req.cookies.ukeId)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(500).send({ error: err });
    });
});

router.get("/week/all", function(req, res) {
  fetch
    .fetchAllProductsInWeek(req.cookies.ukeId)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(500).send({ error: err });
    });
});

router.get("/all", function(req, res) {
  fetch
    .fetchProductsInWeek(req.cookies.ukeId)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(500).send({ error: err });
    });
});

router.get("/meals/:day", function(req, res) {
  fetch
    .fetchAllMealsFromADay(req.params.day)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(500).send({ error: err });
    });
});

router.get("/meals/:day/:type", function(req, res) {
  fetch
    .fetchMealFromDayOfType(req.params.day, req.params.type)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(500).send({ error: err });
    });
});


router.get("/products/:day/", function(req, res) {
  fetch
    .fetchProductsOnDay(req.params.day)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(500).send({ error: err });
    });
});


module.exports = router;
