const models = require("../models");
const helper = require("./queriesHelperMethods");

module.exports = {
  deleteProductInDay(dayId, productId) {
    return models.ProductInDay.findOne({
      where: {
        DayId: dayId,
        ProductKolonialId: productId
      }
    })
      .then(product => {
        return product.destroy();
      })
      .catch(err => {
        return err;
      });
  },

  deleteProductInWeek(weekId, productId) {
    return models.ProductInWeek.findOne({
      where: {
        WeekId: weekId,
        ProductKolonialId: productId
      }
    })
      .then(product => {
        return product.destroy();
      })
      .catch(err => {
        return err;
      });
  },

  deleteMeal(mealId) {
    return models.Meal.findOne({
      where: {
        id: mealId
      }
    })
      .then(meal => {
        return meal.destroy();
      })
      .catch(err => {
        return err;
      });
  },

  dropWeek(weekId) {
    return models.Week.findOne({
      where: {
        id: weekId
      }
    })
      .then(week => {
        return week.destroy();
      })
      .catch(err => {
        return err;
      });
  }
};
