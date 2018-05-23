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
      through: { model: models.ProductInMeal },
      foreignKey: models.Product.kolonialId
    });
    models.Product.belongsToMany(models.Day, {
      through: { model: models.ProductInDay },
      foreignKey: models.Product.kolonialId
    });
    Product.belongsToMany(models.User, {
      through: { model: models.ProductForUser },
      foreignKey: models.Product.kolonialId    
    });
  };

  return Product;
};
