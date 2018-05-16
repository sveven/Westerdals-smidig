module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define("product", {
    kolonial_id: DataTypes.INTEGER
  });

  //TODO: Add association for day, meal, and user here.

  return product;
};
