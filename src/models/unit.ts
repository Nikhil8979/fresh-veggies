import {Model, DataTypes} from "sequelize";
// @ts-ignore
import {sequelize} from "../models";

export interface UnitType {
    id?: number,
    name: string,
    measurementId: number
}

interface MeasurementInstance
    extends Model<UnitType>,
        UnitType {
    createdAt?: Date;
    updatedAt?: Date;
}

export const Unit = sequelize.define<MeasurementInstance>("Unit", {
    name: DataTypes.STRING,
    measurementId: DataTypes.INTEGER
});
