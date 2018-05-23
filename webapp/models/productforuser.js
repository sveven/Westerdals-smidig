"use strict";
module.exports = (sequelize, DataTypes) => {
  const ProductForUser = sequelize.define("ProductForUser", {
    productQuantity: DataTypes.FLOAT(15, 3)
  });

  return ProductForUser;
};
