export default function(sequelize, DataTypes) {
  const User = sequelize.define("user", {
    userId: {
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
    models.User.hasMany(models.Week, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: true
      }
    });

    models.User.belongsToMany(models.Day, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return User;
}
