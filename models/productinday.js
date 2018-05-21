"use strict";
module.exports = (sequelize, DataTypes) => {
  var ProductInDay = sequelize.define(
    "ProductInDay",
    {
      dayId: DataTypes.INTEGER
    },
    {}
  );
 
  return ProductInDay;
};
