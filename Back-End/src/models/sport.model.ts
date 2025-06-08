import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

class Sport extends Model {
    public id!: number;
    public name!: string;
}

Sport.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: "sport",
        timestamps: false,
    }
);

export default Sport;
