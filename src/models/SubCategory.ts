import {Model, DataTypes} from "sequelize";
// @ts-ignore
import {sequelize} from "../models";
export interface subCategoryType {
    id?: number,
    name: string,
    image:string,
    categoryId?:number,
    status:boolean
}

interface SubCategoryInstance
    extends Model<subCategoryType>,
        subCategoryType {
    createdAt?: Date;
    updatedAt?: Date;
}

export const SubCategory = sequelize.define<SubCategoryInstance>("SubCategory", {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
});
