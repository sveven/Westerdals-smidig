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
   * Gets all
   * @param {*} dayId
   */
  fetchProductsOnDay(dayId) {
    return models.Product.findAll({});
  },

  /**
   * Creates a user in the database.
   */
  createUserQuery() {
    return models.User.create({ Id: null, kolonialUserId: null });
  },

  /**
   * Might be omitted
   */
  createUserQuery(kolonialUserId) {
    return models.User.findOrCreate({
      where: { kolonialUserId: kolonialUserId }
    });
  },
  /**
   * Creates a week connected to a user.
   * @param {*} userId
   */
  createWeekQuery(userId) {
    return models.Week.create({ weekId: null, UserId: userId });
  },

  /**
   * Creates a meal with given parameters
   * @param {*} recipeId
   * @param {*} type
   * @param {*} portions
   * @param {*} dayId
   */
  createMealQuery(recipeId, type, portions, dayId) {
    return models.Meal.create({
      Id: null,
      recipeId: recipeId,
      type: type,
      portions: portions,
      dayId: dayId
    });
  },
  /**
   * Creates a day in a given week
   * @param {*} weekId
   */
  createDayQuery(weekId, day) {
    return models.Day.create({ id: null, day: day, WeekId: weekId });
  },

  addMealToDayQuery(recipeId, type, portions, dayId) {
    return this.createMealQuery(recipeId, type, portions, dayId).then(meal => {
      //Round up on portionquantity of recipe
      let mealId = meal.dataValues.Id;
      // addMealToDayDependingOnType(mealId, type, dayId);
      addAllProductsBasedOnRecipe(mealId, recipeId);
    });
  },

  /**
   * Creates a product for a user, and adds to the join table
   * TODO: add product quantity
   * @param {*} kolonialId
   * @param {*} userId
   */
  createProductForUser(kolonialId, userId) {
    return models.Product.findOrCreate({
      where: { kolonialId: kolonialId }
    }).then(product => {
      findSpecificUserQuery(userId).then(user => {
        return product[0].addUsers(user).then(res => {
          console.log("Added users"+res);
        });
      });
    });
  },

  /**
   * TODO: Needs to be reworked
   * @param {*} productId
   * @param {*} quantity
   * @param {*} userId
   */
  // createProductForUser(productId, quantity, userId) {
  // return this.create({
  //   ProductKolonialId: productId,
  //   productQuantity: quantity,
  //   UserId: userId
  // });
  // },

  /**
   * TODO: Needs to be reworked
   */
  createProductInDay(productId, quantity, dayId) {
    // return this.create({
    //   ProductKolonialId: productId,
    //   productQuantity: quantity,
    //   DayId: dayId
    // });
  }
};

/* function addMealToDayDependingOnType(mealId, type, dayId) {
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
} */

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

function findSpecificUserQuery(userId) {
  return models.User.findOne({ where: (Id = userId) });
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
