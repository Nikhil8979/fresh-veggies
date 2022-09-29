import {Model, DataTypes} from "sequelize";
// @ts-ignore
import {sequelize} from "../models";

export interface ProductType {
    id?: number,
    name: string,
    categoryId: number,
    subCategoryId: number,
    marketPrice: number,
    sellingPrice: number,
    discountType: string,
    discount: number,
    unit: string,
    qty:number,
    stock: number,
    brandId: number,
    visibility: string,
    productType: string
}

interface ProductInstance
    extends Model<ProductType>,
        ProductType {
    createdAt?: Date;
    updatedAt?: Date;
}

export const Product = sequelize.define<ProductInstance>("Product", {
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    subCategoryId: DataTypes.INTEGER,
    marketPrice: DataTypes.INTEGER,
    sellingPrice: DataTypes.INTEGER,
    discountType: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    unit: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER,
    visibility: DataTypes.STRING,
    productType: DataTypes.STRING
});
