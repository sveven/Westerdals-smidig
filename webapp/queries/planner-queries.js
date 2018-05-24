const models = require("../models");
const helper = require("./queries-helper-methods");

module.exports = {
  createProductQuery(productId) {
    return models.Product.findOrCreate({
      where: { kolonialId: productId }
    });
  },

  // Fetches all database entries for now.
  fetchProductQuery(callback) {
    models.Product.findAll({}).then(res => {
      callback(JSON.stringify(res));
    });
  },

  createUserQuery(kolonialUserId) {
    return models.User.findOrCreate({
      where: { kolonialUserId: kolonialUserId }
    });
  },

  createWeekQuery(userId) {
    return models.Week.create({ weekId: null, UserId: userId });
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
      console.log("################MEALTODAY");

      //Round up on portionquantity of recipe
      let mealId = meal.dataValues.Id;
      addMealToDayDependingOnType(mealId, type, dayId);
      addAllProductsBasedOnRecipe(mealId, recipeId);
    });
  },

  createProductForUser(productId, quantity, userId) {
    return this.create({
      ProductKolonialId: productId,
      productQuantity: quantity,
      UserId: userId
    });
  },

  createProductInDay(productId, quantity, dayId) {
    return this.create({
      ProductKolonialId: productId,
      productQuantity: quantity,
      DayId: dayId
    });
  }
};

function addMealToDayDependingOnType(mealId, type, dayId) {
  switch (type) {
    case "Breakfast":
      return findSpecificDayQuery().then(day => {
        day.update({
          breakfastId: mealId
        });
      });
      break;
    case "Lunch":
      return findSpecificDayQuery().then(day => {
        day.update({
          lunchId: mealId
        });
      });
      break;
    case "Dinner":
      return findSpecificDayQuery().then(day => {
        day.update({
          dinnerId: mealId
        });
      });
      break;
  }
}

function addAllProductsBasedOnRecipe(mealId, recipeId) {
  helper
    .getAllIngredientsFromRecipe(recipeId)
    .then(products => {
      addAllProductsInRecipeWithPortions(mealId, recipeId, products);
    })
    .catch(err => console.log(err));
}

function findSpecificDayQuery(dayId) {
  return models.Day.findOne({ where: (id = dayId) });
}

/**
 * TODO: Will be used when clicking "Add to planner"
 * Issue is that the user can add and remove items, and currently just puts items from the recipe in
 * Might need check if the user has removed or added items.
 * What if a user has removed everything except one?4
 * Maybe use the function differently, rather give all products that will be purchased in the array
 * and remove the if-check?
 */
function addAllProductsInRecipeWithPortions(mealId, recipeId, productsArr) {
  for (let i = 0; i < productsArr.length; i++) {
    console.log("Is Basic: " + productsArr[i].is_basic);
    if (!productsArr[i].is_basic) {
      createProductQuery(productsArr[i].id);
      addIngredientToMealWithPortions(mealId, recipeId, productsArr[i].id);
    }
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
