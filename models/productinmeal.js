"use strict";
module.exports = (sequelize, DataTypes) => {
  const ProductInMeal = sequelize.define("ProductInMeal", {
    portionQuantity: DataTypes.FLOAT
  });

  return ProductInMeal;
};
