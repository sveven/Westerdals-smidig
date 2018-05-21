"use strict";
module.exports = (sequelize, DataTypes) => {
  const Week = sequelize.define("Week", {
    weekId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });

  Week.associate = models => {
    Week.belongsTo(models.Day, {
      onDelete: "CASCADE",
      foreignKey: {
        name: models.Day.Id,
        allowNull: false
      }
    });
  };

  return Week;
};
