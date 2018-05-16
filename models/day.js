
export default function (sequelize, DataTypes) {
    const Day = sequelize.define("day", {
        dayID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        weekId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Week,
                key: "weekId"
            }
        },
        breakfastId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: meal,
                key: "mealId"
            }
        },
        lunchId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: meal,
                key: "mealId"
            }
        },
        dinnerId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: meal,
                key: "mealId"
            }
        }
    });

    Day.belongsToMany(Product, {through: ProductInDay})
    Day.h
    return day;
}
