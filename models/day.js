"use strict";

module.exports = (sequelize, DataTypes) => {
  const Day = sequelize.define("Day", {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });

  Day.associate = function(models) {
    // associations can be defined here
    // models.Day.belongsToMany(models.Product, {
    //   through: { model: models.ProductInDay },
    //   foreignKey: models.Day
    // });
  };
  return Day;
};
