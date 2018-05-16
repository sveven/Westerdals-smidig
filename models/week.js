export default function(sequelize, DataTypes) {
  const Week = sequelize.define("week", {
    weekId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });

  Week.associate = models => {
    models.Week.hasOne(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: true
      }
    });

    models.Week.belongsTo(models.Day, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  //TODO: Check if this is required after setting associations
  sequelize.sync({
    force: true
  });

  return Week;
}
