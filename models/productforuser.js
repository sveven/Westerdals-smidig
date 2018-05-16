"use strict";
module.exports = (sequelize, DataTypes) => {
  const ProductForUser = sequelize.define("ProductForUser", {
    productQuantity: DataTypes.FLOAT
  });
  ProductForUser.associate = function(models) {
    // associations can be defined here
  };
  return ProductForUser;
};
