import {Model, DataTypes} from "sequelize";
// @ts-ignore
import {sequelize} from "../models";

export interface BrandType {
    id?: number;
    name: string;
}

interface BrandInstance
    extends Model<BrandType>,
        BrandType {
    createdAt?: Date;
    updatedAt?: Date;
}

export const Brand = sequelize.define<BrandInstance>("Brand", {name: DataTypes.STRING});
