const query = require("../queries/plannerCreateQueries");

module.exports = function(req, res, next) {
  
  if (!req.cookies.planleggerId || req.cookies.planleggerId === "undefined") {
    query
      .createUserQuery()
      .then(result => {
        let planleggerId = result.Id

        res.cookie("planleggerId", planleggerId);

        //req.cookies.data.planleggerId = JSON.parse(JSON.stringify(response)).id;

        return planleggerId;
      })
      .then(planleggerId => {
        if (!req.cookies.ukeId || req.cookies.ukeId === "undefined") {
          
          query.createWeekQuery(planleggerId).then(result => {
            res.cookie("ukeId", JSON.parse(JSON.stringify(result)).id);
            next();
          });
        }
      });
  } else {
    next();
  }
};
