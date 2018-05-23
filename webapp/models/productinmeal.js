"use strict";
module.exports = (sequelize, DataTypes) => {
  const ProductInMeal = sequelize.define("ProductInMeal", {
    portionQuantity: DataTypes.FLOAT(15, 3)
  });

  return ProductInMeal;
};
