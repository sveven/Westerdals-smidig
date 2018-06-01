"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    kolonialUserId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

  User.associate = models => {
    User.hasMany(models.Week, {
      onDelete: "CASCADE"
    });
    /**
     * TODO: Might not be needed, as we are not connecting a user directly with products.
     */
    // User.belongsToMany(models.Product, {
    //   through: { model: models.ProductForUser }
    // });
  };
  return User;
};
