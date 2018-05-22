"use strict";

module.exports = (sequelize, DataTypes) => {
  const Day = sequelize.define("Day", {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });
  Day.associate = models => {
    Day.belongsTo(models.Week, {
      onDelete: "CASCADE",
      foreignKey: {
        name: models.Week.weekId,
        allowNull: false
      }
    });
  };
  return Day;
};
