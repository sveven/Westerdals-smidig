'use strict';
module.exports = (sequelize, DataTypes) => {
  var ProductInday = sequelize.define('ProductInday', {
    dayId: DataTypes.INTEGER
  }, {});
  ProductInday.associate = function(models) {
    // associations can be defined here
  };
  return ProductInday;
};