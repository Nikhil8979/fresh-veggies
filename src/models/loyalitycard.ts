import {Model, DataTypes} from "sequelize";
// @ts-ignore
import {sequelize} from "../models";

export interface LoyalityCardType {
    id?: number,
    name: string,
    totalPoints: number,
    discountType: string,
    amount: number,
    minOrderAmount: number,
    description: string,
    image: string,
    categoryIds: string,
    status: boolean
}

interface LoyalityCardInstance
    extends Model<LoyalityCardType>,
        LoyalityCardType {
    createdAt?: Date;
    updatedAt?: Date;
}

export const LoyalityCard = sequelize.define<LoyalityCardInstance>("LoyalityCard", {
    name: DataTypes.STRING,
    totalPoints: DataTypes.INTEGER,
    discountType: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    minOrderAmount: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    categoryIds: DataTypes.STRING,
    status: DataTypes.BOOLEAN
});

