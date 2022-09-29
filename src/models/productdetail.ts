import {Model, DataTypes} from "sequelize";
// @ts-ignore
import {sequelize} from "../models";

export interface ProductdetailType {
    id?: number,
    key: string,
    value: string,
    productId: number
}

interface ProductInstance
    extends Model<ProductdetailType>,
        ProductdetailType {
    createdAt?: Date;
    updatedAt?: Date;
}

export const ProductDetail = sequelize.define<ProductInstance>("ProductDetail", {
    key: DataTypes.TEXT,
    value: DataTypes.TEXT,
    productId: DataTypes.INTEGER
});
