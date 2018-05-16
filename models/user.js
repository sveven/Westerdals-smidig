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
  return User;
}
