export default function(sequelize, DataTypes) {
  const Meal = sequelize.define("meal", {
    mealId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: Sequelize.ENUM,
      values: ["Breakfast", "Lunch", "Dinner"]
    },
    portions: DataTypes.FLOAT
  });

  Meal.associate = (models) => {
      //TODO: Should this be hasMany?
    models.Meal.belongsToMany(models.Product, { through: ProductInMeal });
  };

  return Meal;
}
