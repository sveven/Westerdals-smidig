const models = require("../models");
const helper = require("./queries-helper-methods");

module.exports = {
  createProductQuery(kolonialId) {
    models.Product.create({ kolonialId: kolonialId });
  },

  // Fetches all database entries for now. 
  fetchProductQuery(callback){
    models.Product.findAll().then(res => {
      callback(res);
    });
  },

  createUserQuery() {
    return models.User.create({ Id: null, kolonialUserId: null });
  },

  createWeekQuery() {
    return models.Week.create({ weekId: null });
  },

  createMealQuery(recipeId, type, portions, dayId) {
    return models.Meal.create({
      Id: null,
      recipeId: recipeId,
      type: type,
      portions: portions,
      dayId: dayId
    });
  },

  createDayQuery(weekId) {
    return models.Day.create({ Id: null, weekId: weekId });
  },

  //TODO: This has to happen after a day has been created.
  addMealToDayQuery(recipeId, type, portions, dayId) {
    return this.createMealQuery(recipeId, type, portions, dayId).then(meal => {
      //Round up on portionquantity of recipe
      let mealId = meal.dataValues.Id;
      addMealToDayDependingOnType(mealId, type, dayId);
      //TODO: Add all products to this meal
      addAllProductsBasedOnRecipe(mealId, recipeId);
    });
  }
};

function addMealToDayDependingOnType(mealId, type, dayId) {
  switch (type) {
    case "Breakfast":
      return findOneDayQuery().then(day => {
        day.update({
          breakfastId: mealId
        });
      });
      break;
    case "Lunch":
      return findOneDayQuery().then(day => {
        day.update({
          lunchId: mealId
        });
      });
      break;
    case "Dinner":
      return findOneDayQuery().then(day => {
        day.update({
          dinnerId: mealId
        });
      });
      break;
  }
}

function addAllProductsBasedOnRecipe(mealId, recipeId) {
  helper.getAllIngredientIdsFromRecipe(recipeId).then(res => {
    console.log(res);
    
  });
}

function findOneDayQuery(dayId) {
  return models.Day.findOne({ where: (id = dayId) });
}

function createProductQuery(kolonialId) {
  console.log("########################");
  console.log("Id: " + kolonialId);
  console.log("########################");

  return models.Product.create({ kolonialId: kolonialId });
}
