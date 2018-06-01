"use strict";

module.exports = (sequelize, DataTypes) => {
  const Day = sequelize.define("Day", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    day: {
      type: DataTypes.ENUM,
      values: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ]
    },
    type: {
      type: DataTypes.ENUM,
      values: ["Breakfast", "Lunch", "Dinner"]
    }
  });

  Day.associate = models => {
    Day.hasMany(models.Meal, {
      onDelete: "CASCADE"
    });
    Day.belongsToMany(models.Product, {
      through: { model: models.ProductInDay }
    });
  };

  return Day;
};
