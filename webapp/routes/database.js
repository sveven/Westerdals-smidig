const express = require("express");
const router = express.Router();
const connection = require("../components/kolonialapi/requestHandler");
const create = require("../queries/plannerCreateQueries");
const destroy = require("../queries/plannerDeleteQueries");
const fetch = require("../queries/plannerFetchQueries");


router.get("/product-in-day/", function(req, res) {

  let dayid = req.param("dayid");
  let productid = req.param("productid");

  console.log("DAYID: " + productid);
  let dayAndTypeArr = dayAndTypeSplit(dayid);

  console.log("DAYID: " + dayid);


    create
      .createDayQuery(req.cookies.ukeId, dayAndTypeArr[1], dayAndTypeArr[0])
      .then(result => {
        
        let dayid = result[0].id;

        create
          .createProductInDay(productid, 1, dayid)
          .then(result => {
            res.status(204).send();
          })
          .catch(err => {
            res.status(500).send({ error: err });
          });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
    
});

router.delete("/product-in-day/:productid/:dayid", function(req, res) {
	destroy
		.deleteProductInDay(req.params.dayid, 1, req.params.productid)
		.then(result => {
			res.status(204).send();
		})
		.catch(err => {
			res.status(500).send({ error: err });
		});
});

router.put("/product-in-week/:productid", function(req, res) {
	create
		.createProductInWeek(req.params.productid, req.cookies.ukeId, 1)
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

router.get("/recipe-in-day/", function(req, res) {

    let dayid = req.param('dayid');
    let recipeid = req.param('recipeid');
    let dayAndTypeArr = dayAndTypeSplit(dayid);


    	create
		.createDayQuery(req.cookies.ukeId, dayAndTypeArr[1], dayAndTypeArr[0])
		.then(result => {
      
			let dayid = result[0].id;

      	create
		.addMealToDayQuery(recipeid)
		.then(result => {
        res.status(204).send();
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });

		})
		.catch(err => {
			res.status(500).send({ error: err });
		});
});

router.delete("/recipe-in-day/:recipeid/:dayid", function(req, res) {
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

router.get("/mobile/product-in-week/:productid/:weekid", function(req, res) {

  let productid = parseInt(req.params.productid);
  let weekid = parseInt(req.params.weekid);

  create.createProductInWeek(productid, weekid, 1).then( result => {
		console.log(result);
    res.status(204).send();
  }).catch(err => {
    res.status(500).send({error: err});
  })

});

router.get("/mobile/recipe-in-day/:dayid/", function(req, res) {

  let dayid = parseInt(req.params.dayid);

  create.addMealToDayQuery(recipeid, 1, dayid).then(result => {

  }).catch(err => {
    res.status(500).send({error: err});
  });

});

router.get("/mobile/:weekid/all/", function(req, res) {

  let weekid = parseInt(req.params.weekid);

	fetch
		.fetchAllProductsInWeek(weekid)
		.then(result => {
			res.send(result);
		})
		.catch(err => {
			res.status(500).send({ error: err });
		});
});

router.get("/mobile/week/", function(req, res) {

  create.createUserQuery().then( result => {
    let userid = result.Id;
		
    create.createWeekQuery(userid).then( result => {

      res.send({weekId: result.id});

    }).catch(err => {
        res.status(500).send({error: err})
    });

  }).catch(err => {
    res.status(500).send({error: err})
  });
});




function dayAndTypeSplit(dayAndType){

  switch(dayAndType){

    // Breakfast

    case "breakfast-monday":
      return ["breakfast", "monday"];
      break;
    case "breakfast-tuesday":
      return ["breakfast", "tuesday"];
      break;
    case "breakfast-wednesday":
      return ["breakfast", "wednesday"];
      break;
    case "breakfast-thursday":
      return ["breakfast", "thursday"];
      break;
    case "breakfast-friday":
      return ["breakfast", "friday"];
      break;
    case "breakfast-saturday":
      return ["breakfast", "saturday"];
      break;
    case "breakfast-sunday":
      return ["breakfast", "sunday"];
      break;

      // Lunch

    case "lunch-monday":
      return ["lunch", "monday"];
      break;
    case "lunch-tuesday":
      return ["lunch", "tuesday"];
      break;
    case "lunch-wednesday":
      return ["lunch", "wednesday"];
      break;
    case "lunch-thursday":
      return ["lunch", "thursday"];
      break;
    case "lunch-friday":
      return ["lunch", "friday"];
      break;
    case "lunch-saturday":
      return ["lunch", "saturday"];
      break;
    case "lunch-sunday":
      return ["lunch", "sunday"];
      break;
      
    // Dinner

    case "dinner-monday":
      return ["dinner", "monday"];
      break;
    case "dinner-tuesday":
      return ["dinner", "tuesday"];
      break;
    case "dinner-wednesday":
      return ["dinner", "wednesday"];
      break;
    case "dinner-thursday":
      return ["dinner", "thursday"];
      break;
    case "dinner-friday":
      return ["dinner", "friday"];
      break;
    case "dinner-saturday":
      return ["dinner", "saturday"];
      break;
    case "dinner-sunday":
      return ["dinner", "sunday"];
      break;

    default: NULL;
  }
}

module.exports = router;
