export default function (sequelize, DataTypes) {
    const Product = sequelize.define("product", {
        kolonialId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    });
    
    Product.belongsToMany(Meal, {through: ProductInMeal});
    Product.belongsToMany(Day, {through: ProductInDay});
    Product.belongsToMany(User, {through: ProductForUser});

    return Product;
}
