export default function(sequelize, DataTypes) {
  const Product = sequelize.define("product", {
    kolonialId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  });
  Product.associate = models => {
    Product.belongsToMany(models.Meal, { through: models.ProductInMeal });
    Product.belongsToMany(models.Day, { through: models.ProductInDay });
    Product.belongsToMany(models.User, { through: models.ProductForUser });
  };

  return Product;
}
