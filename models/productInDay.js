module.exports = (sequelize, DataTypes) => {
  const ProductInDay = sequelize.define("productInDay", {
    productQuantity: DataTypes.FLOAT
  });

  return ProductInDay;
};
