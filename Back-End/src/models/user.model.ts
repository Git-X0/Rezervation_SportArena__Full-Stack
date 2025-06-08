import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import bcrypt from "bcryptjs";

class User extends Model {
    public id!: number;
    public email!: string;
    public password!: string;
    public role!: "user" | "admin";
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public async comparePassword(candidatePassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, this.password);
    }
}

User.init(
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("user", "admin"),
            defaultValue: "user",
        },
    },
    {
        sequelize,
        modelName: "user",
        hooks: {
            beforeCreate: async (user: User) => {
                if (user.password) {
                    user.password = await bcrypt.hash(user.password, 10);
                }
            },
            beforeUpdate: async (user: User) => {
                if (user.changed("password")) {
                    user.password = await bcrypt.hash(user.password, 10);
                }
            },
        },
    }
);

export default User;
