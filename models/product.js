"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    kolonialId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  });
  Product.associate = models => {
    // Product.belongsToMany(models.Meal, {
    //   through: { model: models.ProductInMeal }
    // });
    // Product.belongsToMany(models.Meal, {
    //   through: { model: models.ProductInDay }
    // });
    // Product.belongsToMany(models.Meal, {
    //   through: { model: models.ProductForUser }
    // });
  };

  return Product;
};
