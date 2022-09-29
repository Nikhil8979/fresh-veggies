import {createRouter} from "../../../routes/createRouter";
import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {UnitType, Unit} from "../../../models/unit";
import {validate} from "../../../helpers";
import {body} from "express-validator";

const handler:RequestHandler = async (req, res) => {
    const {name, measurementId} = req.body;

    await Unit.create(<Partial<UnitType>>{
        name,
        measurementId
    });

    return res.json(success("Unit created successfully"));
};

createRouter.post("/web/unit", authMiddleware(), validate([
    body("name").notEmpty().withMessage("Name is Required")
        .bail().isString().isLength({max: 50})
        .withMessage("Name must be upto 50 characters long.")
        .custom(async (name) => {
            if (name){
                const unitExist = await Unit.findOne({where: {name}});

                if (unitExist){
                    throw new Error("Unit Name already exists");
                }
            }

            return true;
        }),
]), wrapRequestHandler(handler));
