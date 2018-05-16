export default function(sequelize, DataTypes) {
  const Day = sequelize.define("day", {
    dayID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });

  Day.associate = models => {
    models.Day.belongsToMany(models.Product, { through: models.ProductInDay });

    models.Day.hasMany(models.Meal, {as: 'BreakfastId'})
    models.Day.hasMany(models.Meal, {as: 'LunchId'})
    models.Day.hasMany(models.Meal, {as: 'DinnerId'})
  };

  return day;
}
