export default function (sequelize, DataTypes) {
    const Week = sequelize.define("week", {
        weekId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: "userId"
            }
        }
    });
    return Week;
}
