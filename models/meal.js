"use strict";
module.exports = (sequelize, DataTypes) => {
  var Meal = sequelize.define("Meal", {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    day: {
      type: DataTypes.ENUM,
      values: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ]
    },
    type: {
      type: DataTypes.ENUM,
      values: ["Breakfast", "Lunch", "Dinner"]
    },
    portions: DataTypes.FLOAT
  });
  Meal.associate = models => {
    Meal.belongsToMany(models.Product, {
      through: { model: models.ProductInMeal },
      foreignKey: models.Meal.Id
    });
    //TODO: add FK, constraints etc
    Meal.belongsTo(models.Day);
  };
  return Meal;
};
