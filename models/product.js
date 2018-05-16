'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    dayId: DataTypes.INTEGER
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};