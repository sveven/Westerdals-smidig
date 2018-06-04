"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    kolonialId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  });
  Product.associate = models => {
    Product.belongsToMany(models.Meal, {
      through: { model: models.ProductInMeal }
    });

    Product.belongsToMany(models.Day, {
      through: { model: models.ProductInDay }
    });

    Product.belongsToMany(models.Week, {
      through: { model: models.ProductInWeek }
    });
  };

  return Product;
};
