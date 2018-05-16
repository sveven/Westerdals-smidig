"use strict";
module.exports = (sequelize, DataTypes) => {
  var ProductInDays = sequelize.define(
    "ProductInDays",
    {
      dayId: DataTypes.INTEGER
    },
    {}
  );
  ProductInDays.associate = function(models) {
    // associations can be defined here
  };
  return ProductInDays;
};
