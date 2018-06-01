"use strict";
module.exports = (sequelize, DataTypes) => {
  const Week = sequelize.define("Week", {
    name: {
      type: DataTypes.STRING
    }
  });

  Week.associate = models => {
    Week.hasMany(models.Day, {
      onDelete: "CASCADE"
    });

    Week.belongsToMany(models.Product, {
      through: { model: models.ProductInWeek }
    });
  };
  return Week;

};
