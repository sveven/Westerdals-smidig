"use strict";
module.exports = (sequelize, DataTypes) => {
  const ProductInDay = sequelize.define("ProductInDay", {
    productQuantity: DataTypes.FLOAT(15, 3)
  });

  return ProductInDay;
};
