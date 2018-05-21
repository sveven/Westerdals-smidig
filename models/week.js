"use strict";
module.exports = (sequelize, DataTypes) => {
  const Week = sequelize.define("Week", {
    weekId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });

  return Week;
};
