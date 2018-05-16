'use strict';
module.exports = (sequelize, DataTypes) => {
  var Meal = sequelize.define('Meal', {
    dayId: DataTypes.INTEGER
  }, {});
  Meal.associate = function(models) {
    // associations can be defined here
  };
  return Meal;
};