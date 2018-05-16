'use strict';
module.exports = (sequelize, DataTypes) => {
  var Week = sequelize.define('Week', {
    dayId: DataTypes.INTEGER
  }, {});
  Week.associate = function(models) {
    // associations can be defined here
  };
  return Week;
};