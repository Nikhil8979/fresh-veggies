import {Model, DataTypes} from "sequelize";
// @ts-ignore
import {sequelize} from "../models";

export interface BannerType {
    id?: number;
    image: string;
    index: number
}

interface BannerInstance
    extends Model<BannerType>,
        BannerType {
    createdAt?: Date;
    updatedAt?: Date;
}

export const Banner = sequelize.define<BannerInstance>("Banners", {
    image: DataTypes.STRING,
    index: DataTypes.INTEGER
});
