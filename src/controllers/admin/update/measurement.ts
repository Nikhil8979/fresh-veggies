import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {Measurement} from "../../../models/measurement";
import {validate} from "../../../helpers";
import {body} from "express-validator";
import {updateRouter} from "../../../routes/updateRouter";
import {Op} from "sequelize";

const handler:RequestHandler = async (req, res) => {
    const {id, name} = req.body;
    const measurement = await Measurement.findOne({where: {id}});
    measurement.name = name;
    await measurement.save();

    return res.json(success("Measurement Updated successfully"));
};

updateRouter.post("/web/measurement", authMiddleware(), validate([
    body("id").notEmpty().withMessage("Id is required"),
    body("name").notEmpty().withMessage("Name is Required")
        .bail().isString().isLength({max: 50})
        .withMessage("Name must be upto 50 characters long.")
        .custom(async (name, {req}) => {
            const {id} = req.body;

            if (name){
                const categoryExist = await Measurement.findOne({
                    where: {
                        [Op.and]: [
                            {name},
                            {id: {[Op.ne]: id}}
                        ]
                    }
                });

                if (categoryExist){
                    throw new Error("Measurement Name already exists");
                }
            }

            return true;
        }),
]), wrapRequestHandler(handler));
