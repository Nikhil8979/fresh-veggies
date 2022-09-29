import {Model, DataTypes} from "sequelize";
// @ts-ignore
import {sequelize} from "../models";
export interface CategoryType {
    id?: number,
    name: string,
    image:string,
    status:boolean
}

interface CategoryInstance
    extends Model<CategoryType>,
        CategoryType {
    createdAt?: Date;
    updatedAt?: Date;
}

export const Category = sequelize.define<CategoryInstance>("Category", {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    status: DataTypes.BOOLEAN
});
