import {Model, DataTypes} from "sequelize";
// @ts-ignore
import {sequelize} from "../models";
export interface UserType {
    id?: number,
    name: string,
    email: string,
    mobile: string,
    password: string,
    status: boolean
}

interface AuthorInstance
    extends Model<UserType>,
        UserType {
    createdAt?: Date;
    updatedAt?: Date;
}

export const User = sequelize.define<AuthorInstance>(
    "User",
    {
        name: {type: DataTypes.STRING},
        email: {type: DataTypes.STRING},
        mobile: {type: DataTypes.STRING},
        password: {type: DataTypes.STRING},
        status: {type: DataTypes.BOOLEAN}
    }
);

