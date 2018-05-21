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
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: true,
        name: models.User
      }
    });

    User.belongsToMany(models.Day, {
      onDelete: "CASCADE",
      through: { model: models.Day },
      foreignKey: {
        name: models.User,
        allowNull: false
      }
    });
  };

  return User;
};
