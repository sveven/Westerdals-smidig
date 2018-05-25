"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    kolonialId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  });
  Product.associate = models => {
    models.Product.belongsToMany(models.Meal, {
      through: { model: models.ProductInMeal }
    });
    
    models.Product.belongsToMany(models.Day, {
      through: { model: models.ProductInDay }
    });

    Product.belongsToMany(models.User, {
      through: { model: models.ProductForUser }
    });
  };

  return Product;
};
