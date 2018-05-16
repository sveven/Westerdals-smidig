'use strict';
module.exports = (sequelize, DataTypes) => {
  var ProductInMeal = sequelize.define('ProductInMeal', {
    dayId: DataTypes.INTEGER
  }, {});
  ProductInMeal.associate = function(models) {
    // associations can be defined here
  };
  return ProductInMeal;
};