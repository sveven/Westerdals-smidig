"use strict";
module.exports = (sequelize, DataTypes) => {
  const Week = sequelize.define("Week");
  return Week;

  Week.hasMany(models.Day, {
    onDelete: "CASCADE"
  });
};
