export default function (sequelize, DataTypes) {
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
    return Meal;
}
