export default function (sequelize, DataTypes) {
    const ProductForUser = sequelize.define("ProductForUser", {
        productQuantity: DataTypes.FLOAT
    });
    return ProductForUser;
}
