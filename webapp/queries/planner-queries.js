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
   * Gets a week with all connections, so that we can see all products
   * @param {*} weekId
   */
  fetchAllProductsInWeek(weekId) {
    return models.Week.findOne({
      where: { id: weekId },
      include: [
        {
          model: models.Day,
          include: [
            { model: models.Meal, include: [{ model: models.Product }] },
            { model: models.Product }
          ]
        }
      ]
    });
  },

  fetchAllMealsFromADay(dayId) {
    return models.Day.findOne({
      where: {
        id: dayId
      },
      include: [{ model: models.Meal }]
    });
  },

  fetchMealFromDayOfType(dayId, mealType) {
    return models.Day.findOne({
      where: {
        id: dayId
      },
      include: [
        {
          model: models.Meal,
          where: {
            type: mealType
          }
        }
      ]
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
   * Gets a week with extra products
   * @param {*} userId
   */
  fetchProductsInWeek(weekId) {
    return models.Week.findOne({
      where: {
        id: weekId
      },
      include: [{ model: models.Product }]
    });
  },

  /**
   * Returns in a way where you have to check the portions
   * @param {*} mealId
   */
  fetchAllProductsInMealWithQuantity(mealId) {
    return models.Meal.findOne({
      where: {
        id: mealId
      },
      include: [
        {
          model: models.Product
        }
      ]
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
      let mealId = meal.dataValues.Id;
      addAllProductsBasedOnRecipe(mealId, recipeId);
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
