const models = require("../models");
const helper = require("./queries-helper-methods");

module.exports = {
  createProductQuery(productId) {
    return models.Product.findOrCreate({
      where: { kolonialId: productId }
    });
  },

  /**
   * Fetches all products
   */
  fetchAllProductsQuery() {
    return models.Product.findAll({});
  },

  /**
   * Fetches all days in a week
   * @param {*} weekId
   */
  fetchDaysInWeek(weekId) {
    return models.Week.findAll({
      where: {
        id: weekId
      },
      include: models.Day
    });
  },

  /**
   * Fetches all meals from a given week
   * @param {*} weekId
   */
  fetchMealsFromWeek(weekId) {
    return models.Week.findOne({
      where: { id: weekId },
      include: [{ model: models.Day, include: [{ model: models.Meal }] }]
    });
  },

  /**
   * Gets all produts on a day
   * @param {*} dayId
   */
  fetchProductsOnDay(dayId) {
    return models.Day.findOne({
      where: {
        id: dayId
      },
      include: [
        {
          model: models.Product
        }
      ]
    });
  },

  /**
   * Gets a user with all their extra products
   * @param {*} userId 
   */
  fetchProductsForUser(userId) {
    return models.User.findOne({
      where: {
        id: userId
      },
      include: [{ model: models.Product }]
    });
  },

  /**
   * Creates a user in the database.
   */
  createUserQuery() {
    return models.User.create({ Id: null, kolonialUserId: null });
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
  createDayQuery(weekId, day) {
    return models.Day.create({ id: null, day: day, WeekId: weekId });
  },

  addMealToDayQuery(recipeId, type, portions, dayId) {
    return createMealQuery(recipeId, type, portions, dayId).then(meal => {
      //Round up on portionquantity of recipe
      let mealId = meal.dataValues.Id;
      // addMealToDayDependingOnType(mealId, type, dayId);
      addAllProductsBasedOnRecipe(mealId, recipeId);
    });
  },

  /**
   * Creates a product for a user, and adds to the join table
   * @param {*} productId
   * @param {*} userId
   * @param {*} quantity
   */
  createProductForUser(productId, userId, quantity) {
    return models.Product.findOrCreate({
      where: { kolonialId: productId }
    }).then(product => {
      fetchUserQuery(userId).then(user => {
        return product[0].addUsers(user, {
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
 * @param {*} type
 * @param {*} portions
 * @param {*} dayId
 */
function createMealQuery(recipeId, type, portions, dayId) {
  return models.Meal.create({
    Id: null,
    recipeId: recipeId,
    type: type,
    portions: portions,
    dayId: dayId
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

/**
 * Adds all products in a recipe based on prod
 * @param {*} mealId
 * @param {*} recipeId
 * @param {*} productsArr
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
