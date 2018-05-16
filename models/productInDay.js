export default function (sequelize, DataTypes) {
    const ProductInDay = sequelize.define("productInDay", {
        productQuantity: DataTypes.FLOAT
    });
    return ProductInDay;
}
