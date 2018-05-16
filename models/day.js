'use strict';
module.exports = (sequelize, DataTypes) => {
  var Day = sequelize.define('Day', {
    dayId: DataTypes.INTEGER
  }, {});
  Day.associate = function(models) {
    // associations can be defined here
  };
  return Day;
};