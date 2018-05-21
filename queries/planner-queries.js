const models = require("../models");

module.exports = {

  createProductQuery(kolonialId){
    models.Product.create({ kolonialId: kolonialId });
  },
  
  createUserQuery() {
    models.User.create({ Id: null, kolonialUserId: null });
  },
  
  createWeekQuery() {
    models.Week.create({ weekId: null });
  },
  
  createMealQuery(type, portions, dayId) {
    models.Meal.create({ Id: null, type: type, portions: portions, day: dayId });
  },
  
  createDayQuery() {
    models.Day.create({ Id: null });
  }

}


