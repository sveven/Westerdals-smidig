"use strict";
module.exports = (sequelize, DataTypes) => {
  const ProductInDay = sequelize.define("ProductInDay", {
    productQuantity: DataTypes.FLOAT
  });

  return ProductInDay;
};
