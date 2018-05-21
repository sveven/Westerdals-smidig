"use strict";
module.exports = (sequelize, DataTypes) => {
  const ProductForUser = sequelize.define("ProductForUser", {
    productQuantity: DataTypes.FLOAT
  });

  return ProductForUser;
};
