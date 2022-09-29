import {Model, DataTypes} from "sequelize";
// @ts-ignore
import {sequelize} from "../models";

export interface ProductImageType {
    id?: number,
    image: string,
    index: number,
    productId: number
}

interface ProductImageInstance
    extends Model<ProductImageType>,
        ProductImageType {
    createdAt?: Date;
    updatedAt?: Date;
}

export const ProductImage = sequelize.define<ProductImageInstance>("ProductImage", {
    image: DataTypes.STRING,
    index: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
});
