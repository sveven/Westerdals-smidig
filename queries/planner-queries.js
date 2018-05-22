const models = require("../models");

module.exports = {
  createProductQuery(kolonialId) {
    return models.Product.create({ kolonialId: kolonialId });
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
    this.createMealQuery(recipeId, type, portions, dayId).then(meal => {
      //Round up on portionquantity of recipe
      addMealToDayDependingOnType(meal.dataValues.Id, type, dayId);
    });
  }
};

function addMealToDayDependingOnType(mealId, type, dayId) {
  console.log("Type: " + type);
  switch (type) {
    case "Breakfast":
      findADayQuery().then(day => {
        day
          .update(
            {
              breakfastId: mealId
            },
            { fields: ["breakfastId"] }
          )
          .then(() => {});
      });
      break;
    case "Lunch":
      findADayQuery().then(day => {
        day
          .update({
            lunchId: mealId
          })
          .then(() => {});
      });
      break;
    case "Dinner":
      findADayQuery().then(day => {
        day
          .update(
            {
              dinnerId: mealId
            },
            { fields: ["dinnerId"] }
          )
          .then(() => {});
      });
      break;
  }

  // return models.Day.update()
}

function findADayQuery(dayId) {
  return models.Day.findOne({ where: (id = dayId) });
}
