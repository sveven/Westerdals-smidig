"use strict";
module.exports = (sequelize, DataTypes) => {
  const ProductInWeek = sequelize.define("ProductInWeek", {
    productQuantity: DataTypes.FLOAT(15, 3)
  });

  return ProductInWeek;
};
