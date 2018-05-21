const models = require("../models");

<<<<<<< HEAD
module.exports = {
=======
module.exports = function createProductQuery(kolonialId) {
  models.Product.create({ kolonialId: kolonialId });
}
>>>>>>> 15f9942e4cf3ba77392971a6ea7454597e6fd1f6

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


