const query = require("../queries/plannerCreateQueries");

module.exports = function(req, res, next) {


  if(!req.cookies.planleggerId || req.cookies.planleggerId === 'undefined'){


    query.createUserQuery().then(result => {
      let planleggerId = JSON.parse(JSON.stringify(result)).Id;

      res.cookie("planleggerId", planleggerId);

      //req.cookies.data.planleggerId = JSON.parse(JSON.stringify(response)).id;
      console.log("CREATE USER QUERY: " + JSON.stringify(req.cookies));

      return planleggerId;

    }).then( planleggerId => {

      if (!req.cookies.ukeId || req.cookies.ukeId === 'undefined'){

        query.createWeekQuery(req.cookies.planleggerId).then(result => { 
          res.cookie("ukeId", JSON.parse(JSON.stringify(result)).id);
          //console.log("RES: " + JSON.stringify(req.cookies));
          next();
        });
    
      } 
    });

  } else {
    next();
  }

}

