"use strict";
module.exports = (sequelize, DataTypes) => {
  const ProductInDay = sequelize.define("ProductInDay");

  return ProductInDay;
};
