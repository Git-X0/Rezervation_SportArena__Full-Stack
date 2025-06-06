import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import Client from "./client";

class Reservation extends Model {
    public id!: number;
    public ClientId!: number;
    public startDate!: Date;
    public startTime!: string;
    public endDate!: Date;
    public endTime!: string;
}

Reservation.init(
    {
        startDate: { type: DataTypes.DATEONLY, allowNull: false },
        startTime: { type: DataTypes.TIME, allowNull: false },
        endDate: { type: DataTypes.DATEONLY, allowNull: false },
        endTime: { type: DataTypes.TIME, allowNull: false },
    },
    { sequelize, modelName: "reservation" }
);

// Asociace
Client.hasMany(Reservation);
Reservation.belongsTo(Client);

export default Reservation;
