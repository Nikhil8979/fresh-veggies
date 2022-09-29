import {Model, DataTypes} from "sequelize";
// @ts-ignore
import {sequelize} from "../models";
export interface MeasurementType {
    id?: number;
    name: string;
}

interface MeasurementInstance
    extends Model<MeasurementType>,
        MeasurementType {
    createdAt?: Date;
    updatedAt?: Date;
}

export const Measurement = sequelize.define<MeasurementInstance>("Measurement", {name: DataTypes.STRING});
