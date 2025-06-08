import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

class SportLocation extends Model {
    public id!: number;
    public name!: string;
    public location!: string;
}

SportLocation.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            // Povolit aktualizaci:
            // defaultValue: null, // pokud potřebujete výchozí hodnotu
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "sport_location",
        timestamps: false,
    }
);

export default SportLocation;
