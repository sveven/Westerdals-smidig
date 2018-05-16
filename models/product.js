module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define("product", {
    kolonial_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  });

  //TODO: Add association for day, meal, and user here.

  return product;
};
