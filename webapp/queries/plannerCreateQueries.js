const models = require("../models");
const helper = require("./queriesHelperMethods");

module.exports = {
  createProductQuery(productId) {
    return models.Product.findOrCreate({
      where: { kolonialId: productId }
    });
  },

  /**
   * Creates a user in the database.
   */
  createUserQuery() {
    return models.User.create({ Id: null, kolonialUserId: null });
  },

  createUserWithKolonialIdQuery(kolonialUserId) {
    return models.User.create({Id: null, kolonialUserId: kolonialUserId});
  },
  /**
   * Creates a week connected to a user.
   * @param {*} userId
   */
  createWeekQuery(userId) {
    return models.Week.create({ weekId: null, UserId: userId, name: null });
  },

  /**
   * Creates a day in a given week
   * @param {*} weekId
   */
  createDayQuery(weekId, day, type) {
    return models.Day.findOrCreate({
      where: {
        day: day,
        type: type,
        WeekId: weekId
      }
    });
  },

  /**
   * Creates and adds a meal
   * @param {*} recipeId
   * @param {*} portions
   * @param {*} dayId
   */
  addMealToDayQuery(recipeId, portions, dayId) {
    return createMealQuery(recipeId, portions, dayId).then(meal => {
      let mealId = meal.dataValues.Id;
      addAllProductsBasedOnRecipe(mealId, recipeId);
      return meal;
    });
  },

  /**
   * Creates a product for a user, and adds to the join table
   * @param {*} productId
   * @param {*} weekId
   * @param {*} quantity
   */
  createProductInWeek(productId, weekId, quantity) {
    return models.Product.findOrCreate({
      where: { kolonialId: productId }
    }).then(product => {
      //TODO: Implement updating of quantity if item already exists.
      fetchWeekQuery(weekId).then(week => {
        return product[0].addWeeks(week, {
          through: { productQuantity: quantity }
        });
      });
    });
  },

  /**
   * @param {*} productId
   * @param {*} quantity
   * @param {*} userId
   */
  createProductInDay(productId, quantity, dayId) {
    return models.Product.findOrCreate({
      where: { kolonialId: productId }
    }).then(product => {
      fetchDayQuery(dayId).then(day => {
        return product[0].addDays(day, {
          through: { productQuantity: quantity }
        });
      });
    });
  }
};

/**
 * Creates a meal with given parameters
 * @param {*} recipeId
 * @param {*} portions
 * @param {*} dayId
 */
function createMealQuery(recipeId, portions, dayId) {
  return models.Meal.create({
    Id: null,
    recipeId: recipeId,
    portions: portions,
    DayId: dayId
  });
}

/**
 * Adds all products for a recipe.
 * @param {*} mealId
 * @param {*} recipeId
 */
function addAllProductsBasedOnRecipe(mealId, recipeId) {
  helper
    .getAllIngredientsFromRecipe(recipeId)
    .then(products => {
      addAllProductsInRecipeWithPortions(mealId, recipeId, products);
    })
    .catch(err => console.log(err));
}

/**
 * Returns a day based on a day ID
 * @param {*} dayId
 */
function fetchDayQuery(dayId) {
  return models.Day.findOne({ where: (id = dayId) });
}

/**
 * Finds a user based on a user id.
 * @param {*} userId
 */
function fetchUserQuery(userId) {
  return models.User.findOne({ where: (Id = userId) });
}

function fetchWeekQuery(weekId) {
  return models.Week.findOne({ where: (id = weekId) });
}

/**
 * Adds all products in a recipe based on prod
 * @param {*} mealId
 * @param {*} recipeId
 * @param {*} productsArr
 */
function addAllProductsInRecipeWithPortions(mealId, recipeId, productsArr) {
  for (let i = 0; i < productsArr.length; i++) {
    if (!productsArr[i].is_basic) {
      createProductQuery(productsArr[i].product.id);

      addIngredientToMealWithPortions(
        mealId,
        recipeId,
        productsArr[i].product.id
      );
    }
  }
}

/**
 * Adds an ingredient to a meal with portion based on recipe
 * @param {*} mealId
 * @param {*} recipeId
 * @param {*} productId
 */
function addIngredientToMealWithPortions(mealId, recipeId, productId) {
  helper
    .getPortionQuantityOfIngredientInRecipe(recipeId, productId)
    .then(quantity => {
      createProductInMealQuery(mealId, productId, quantity);
    });
}

/**
 * Creates a product in meal
 * @param {*} mealId
 * @param {*} productId
 * @param {*} portionQuantity
 */
function createProductInMealQuery(mealId, productId, portionQuantity) {
  return models.ProductInMeal.create({
    MealId: mealId,
    ProductKolonialId: productId,
    portionQuantity: portionQuantity
  });
}

/**
 * Creates a product. Helpermethod.
 * @param {*} productId
 */
function createProductQuery(productId) {
  return models.Product.findOrCreate({
    where: { kolonialId: productId }
  });
}
