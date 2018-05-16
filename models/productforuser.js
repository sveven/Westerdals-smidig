'use strict';
module.exports = (sequelize, DataTypes) => {
  var ProductForUser = sequelize.define('ProductForUser', {
    dayId: DataTypes.INTEGER
  }, {});
  ProductForUser.associate = function(models) {
    // associations can be defined here
  };
  return ProductForUser;
};