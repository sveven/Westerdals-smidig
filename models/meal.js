"use strict";
module.exports = (sequelize, DataTypes) => {
  var Meal = sequelize.define("Meal", {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.ENUM,
      values: ["Breakfast", "Lunch", "Dinner"]
    },
    portions: DataTypes.FLOAT
  });
  Meal.associate = function(models) {
    // Meal.belongsToMany(models.Product, {
    //   through: { model: models.ProductInMeal }
    // });
    //TODO: add FK, constraints etc
    Meal.belongsTo(models.Day);
  };
  return Meal;
};
