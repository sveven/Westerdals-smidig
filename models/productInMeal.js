export default function (sequelize, DataTypes) {
    const ProductInMeal = sequelize.define("productInMeal", {
        portionQuantity: DataTypes.FLOAT
    });
    return ProductInMeal;
}
