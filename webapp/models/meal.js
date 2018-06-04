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
    portions: DataTypes.FLOAT(15, 3)
  });

  Meal.associate = models => {
    Meal.belongsToMany(models.Product, {
      through: { model: models.ProductInMeal }
    });
  };
  return Meal;
};
