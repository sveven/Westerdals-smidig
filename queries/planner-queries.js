const models = require("../models");
const helper = require("./queries-helper-methods");

module.exports = {
  createProductQuery(kolonialId) {
    models.Product.create({ kolonialId: kolonialId });
  },

  // Fetches all database entries for now.
  fetchProductQuery(callback) {
    models.Product.findAll().then(res => {
      console.log(JSON.stringify(res));
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
  helper
    .getAllIngredientIdsFromRecipe(recipeId)
    .then(products => {
      addAllProductsInRecipeWithPortions(mealId, recipeId, products);
    })
    .catch(err => console.log(err));
}

function findOneDayQuery(dayId) {
  return models.Day.findOne({ where: (id = dayId) });
}

function addAllProductsInRecipeWithPortions(mealId, recipeId, productsArr) {
  for (let i = 0; i < productsArr.length; i++) {
    createProductQuery(productsArr[i]);
    addIngredientToMealWithPortions(mealId, recipeId, productsArr[i]);
  }
}

function addIngredientToMealWithPortions(mealId, recipeId, productId) {
  helper
    .getPortionQuantityOfIngredientInRecipe(recipeId, productId)
    .then(quantity => {
      createProductInMealQuery(mealId, productId, quantity);
    });
}

function createProductInMealQuery(mealId, productId, portionQuantity) {
  return models.ProductInMeal.create({
    MealId: mealId,
    ProductKolonialId: productId,
    portionQuantity: portionQuantity
  });
}

function createProductQuery(productId) {
  return models.Product.findOrCreate({
    where: { kolonialId: productId }
  });
}
