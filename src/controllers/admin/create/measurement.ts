import {createRouter} from "../../../routes/createRouter";
import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {Measurement, MeasurementType} from "../../../models/measurement";
import {validate} from "../../../helpers";
import {body} from "express-validator";

const handler:RequestHandler = async (req, res) => {
    const {name} = req.body;
    await Measurement.create(<Partial<MeasurementType>>{name});
    return res.json(success("Measurement created successfully"));
};

createRouter.post("/web/measurement", authMiddleware(), validate([
    body("name").notEmpty().withMessage("Name is Required")
        .bail().isString().isLength({max: 50})
        .withMessage("Name must be upto 50 characters long.")
        .custom(async (name) => {
            if (name){
                const measurementExist = await Measurement.findOne({where: {name}});

                if (measurementExist){
                    throw new Error("Measurement Name already exists");
                }
            }

            return true;
        }),
]), wrapRequestHandler(handler));
