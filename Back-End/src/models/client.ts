import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

class Client extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
}

Client.init(
    {
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    { sequelize, modelName: "client" }
);

export default Client;
