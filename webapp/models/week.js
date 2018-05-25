"use strict";
module.exports = (sequelize, DataTypes) => {
  const Week = sequelize.define("Week");

  Week.associate = models => {
    Week.hasMany(models.Day, {
      onDelete: "CASCADE"
    });
  };
  return Week;

};
