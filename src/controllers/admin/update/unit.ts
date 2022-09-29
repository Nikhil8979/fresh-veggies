import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {Unit} from "../../../models/unit";
import {validate} from "../../../helpers";
import {body} from "express-validator";
import {updateRouter} from "../../../routes/updateRouter";
import {Op} from "sequelize";

const handler: RequestHandler = async (req, res) => {
    const {id, name} = req.body;
    const unit = await Unit.findOne({where: {id}});
    unit.name = name;
    await unit.save();

    return res.json(success("Unit Updated successfully"));
};

updateRouter.post("/web/unit", authMiddleware(), validate([
    body("id").notEmpty().withMessage("Id is required"),
    body("name").notEmpty().withMessage("Name is Required")
        .bail().isString().isLength({max: 50})
        .withMessage("Name must be upto 50 characters long.")
        .custom(async (name, {req}) => {
            const {id} = req.body;

            if (name){
                const unitExist = await Unit.findOne({
                    where: {
                        [Op.and]: [
                            {name},
                            {id: {[Op.ne]: id}}
                        ]
                    }
                });

                if (unitExist){
                    throw new Error("Unit Name already exists");
                }
            }

            return true;
        }),
]), wrapRequestHandler(handler));
