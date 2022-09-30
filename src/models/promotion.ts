import {Model, DataTypes} from "sequelize";
// @ts-ignore
import {sequelize} from "../models";

export interface PromotionType {
    id?: number;
    promoType: string;
    name: string,
    description:string,
  discountType:string,
  discount:number,
  minOrderValue:number,
  noOfVouchers:number,
  redeemAllowedPerUser:number,
  validityStarts:string,
  validityEnds:string,
  categoryIds:string
}

interface PromotionInstance
    extends Model<PromotionType>,
        PromotionType {
    createdAt?: Date;
    updatedAt?: Date;
}

export const Promotion = sequelize.define<PromotionInstance>("Promotion", {
    promoType: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    discountType: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    minOrderValue: DataTypes.INTEGER,
    noOfVouchers: DataTypes.INTEGER,
    redeemAllowedPerUser: DataTypes.INTEGER,
    validityStarts: DataTypes.STRING,
    validityEnds: DataTypes.STRING,
    categoryIds: DataTypes.STRING
});

