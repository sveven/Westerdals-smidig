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

  createDayQuery() {
    return models.Day.create({ Id: null });
  },

  //TODO: This has to happen after a day has been created.
  addMealToDayQuery(recipeId, type, portions, dayId) {
    this.createMealQuery(recipeId, type, portions, dayId).then(res => {
      //Round up on portionquantity of recipe
      findADayQuery(dayId);
    });
  }
};

function addMealToDayDependingOnType(mealId, type, dayId) {
  switch (
    type

    // return models.Day.update()
  ) {
  }
}

function findADayQuery(dayId) {
  return models.Day.findOne({ where: (id = dayId) }).then(res =>
    console.log(res)
  );
}
