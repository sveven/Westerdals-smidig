"use strict";

module.exports = (sequelize, DataTypes) => {
  const Day = sequelize.define("Day", {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });

  return Day;
};
