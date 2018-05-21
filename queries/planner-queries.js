const models = require("../models");

module.exports = {
  createProductQuery(kolonialId) {
    models.Product.create({ kolonialId: kolonialId });
  },

  createUserQuery() {
    models.User.create({ Id: null, kolonialUserId: null });
  },

  createWeekQuery() {
    models.Week.create({ weekId: null });
  },

  createMealQuery(type, portions, dayId) {
    models.Meal.create({
      Id: null,
      type: type,
      portions: portions,
      day: dayId
    });
  },

  createDayQuery() {
    models.Day.create({ Id: null });
  },

  addMealToWeekQuery(day, recipeId, type, portions, dayId, weekId) {

    //TODO: Implementations needed
    // Need to implement getting of user id from session
    //TODO: Continue here with implementation of adding an entire meal with portion quantity (if x amount of milk, get big milk?)
    models.Meal.create({
      Id: null,
      recipeId: recipeId,
      day: day,
      type: type,
      portions: portions,
      dayId: dayId
    }).then(res => {
        console.log(res); 
    });
  }
};
