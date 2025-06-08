import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import { Client } from "../types";

class ClientModel extends Model<Client> implements Client {
    public id!: number;
    public name!: string;
    public email!: string;
    public phone?: string;
    public address?: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ClientModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 100],
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: /^\+?[\d\s-]{8,}$/,
            },
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [0, 200],
            },
        },
    },
    {
        sequelize,
        modelName: "client",
        timestamps: true,
    }
);

export default ClientModel;
