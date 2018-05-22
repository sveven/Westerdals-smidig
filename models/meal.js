"use strict";
module.exports = (sequelize, DataTypes) => {
  var Meal = sequelize.define("Meal", {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    recipeId: {
      type: DataTypes.INTEGER
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
    Meal.hasOne(models.Day, { foreignKey: "breakfastId" });
    Meal.hasOne(models.Day, { foreignKey: "lunchId" });
    Meal.hasOne(models.Day, { foreignKey: "dinnerId" });
  };
  return Meal;
};
