import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import Sport from "./sport.model";
import SportLocation from "./sportLocation.model";

class Reservation extends Model {
    public id!: number;
    public firstname!: string;
    public lastname!: string;
    public date!: string;
    public time_slot!: string;
    public sportId!: number;
    public sportLocationId!: number;
}

Reservation.init(
    {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        time_slot: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "reservation",
        timestamps: false,
    }
);

// Asociace
SportLocation.hasMany(Reservation, { foreignKey: "sportLocationId" });
Reservation.belongsTo(SportLocation, { foreignKey: "sportLocationId" });

Sport.hasMany(Reservation, { foreignKey: "sportId" });
Reservation.belongsTo(Sport, { foreignKey: "sportId" });

export default Reservation;
