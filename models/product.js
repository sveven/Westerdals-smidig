export default function (sequelize, DataTypes) {
    const product = sequelize.define("product", {
        kolonialId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    });
    //TODO: Add association for day, meal, and user here.
    return product;
}
