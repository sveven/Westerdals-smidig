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

    /**
     * TODO: Might not be needed, as we are not saving products on a user anymore. 
     */
    // Product.belongsToMany(models.User, {
    //   through: { model: models.ProductForUser }
    // });
  };

  return Product;
};
