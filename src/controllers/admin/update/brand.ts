import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {Brand} from "../../../models/brand";
import {validate} from "../../../helpers";
import {body} from "express-validator";
import {updateRouter} from "../../../routes/updateRouter";
import {Op} from "sequelize";

const handler: RequestHandler = async (req, res) => {
    const {id, name} = req.body;
    const brand = await Brand.findOne({where: {id}});
    brand.name = name;
    await brand.save();

    return res.json(success("Brand Updated successfully"));
};

updateRouter.post("/web/brand", authMiddleware(), validate([
    body("id").notEmpty().withMessage("Id is required"),
    body("name").notEmpty().withMessage("Name is Required")
        .bail().isString().isLength({max: 50})
        .withMessage("Name must be upto 50 characters long.")
        .custom(async (name, {req}) => {
            const {id} = req.body;

            if (name){
                const brandExist = await Brand.findOne({
                    where: {
                        [Op.and]: [
                            {name},
                            {id: {[Op.ne]: id}}
                        ]
                    }
                });

                if (brandExist){
                    throw new Error("Brand Name already exists");
                }
            }

            return true;
        }),
]), wrapRequestHandler(handler));
