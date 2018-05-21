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
      foreignKey: models.Product
    });
    models.Product.belongsToMany(models.Meal, {
      through: { model: models.ProductInDay },
      foreignKey: models.Product      
    });
    models.Product.belongsToMany(models.Meal, {
      through: { model: models.ProductForUser },
      foreignKey: models.Product      
    });
  };

  return Product;
};
