import {Model, DataTypes} from "sequelize";
// @ts-ignore
import {sequelize} from "../models";

export interface ProductVariationType {
    id?: number,
    name: string,
    marketPrice: number,
    sellingPrice: number,
    discountType: string,
    discount: number,
    unit: string,
    qty: number,
    image: string,
    status: string
}

interface ProductVariationInstance
    extends Model<ProductVariationType>,
        ProductVariationType {
    createdAt?: Date;
    updatedAt?: Date;
}

export const ProductVariation = sequelize.define<ProductVariationInstance>("ProductVariation", {
    name: DataTypes.STRING,
    marketPrice: DataTypes.INTEGER,
    sellingPrice: DataTypes.INTEGER,
    discountType: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    unit: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    image: DataTypes.STRING,
    status: DataTypes.STRING
});
