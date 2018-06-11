const models = require("../models");
const helper = require("./queriesHelperMethods");

module.exports = {
  fetchUserByKolonialId(kolonialUserId) {
    return models.User.findOne({
      where: {
        kolonialUserId: kolonialUserId
      },
      include: models.Week
    });
  },

  /**
   * Fetches all days in a week
   * @param {*} weekId
   */
  fetchDaysInWeek(weekId) {
    return models.Week.findOne({
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
        },
        {
          model: models.Product
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
        id: dayId,
        type: mealType
      },
      include: [
        {
          model: models.Meal
        }
      ]
    });
  },

  /**
   * Gets all products on a day
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

  fetchAllWeeksForKolonialUser(kolonialUserId) {
    return models.User.findAll({
      where: {
        kolonialUserId: kolonialUserId
      },
      include: [
        {
          model: models.Week
        }
      ]
    });
  }
};
