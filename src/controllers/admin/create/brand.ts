import {createRouter} from "../../../routes/createRouter";
import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {BrandType, Brand} from "../../../models/brand";
import {validate} from "../../../helpers";
import {body} from "express-validator";

const handler: RequestHandler = async (req, res) => {
    const {name} = req.body;
    await Brand.create(<Partial<BrandType>>{name});
    return res.json(success("Brand created successfully"));
};

createRouter.post("/web/brand", authMiddleware(), validate([
    body("name").notEmpty().withMessage("Name is Required")
        .bail().isString().isLength({max: 50})
        .withMessage("Name must be upto 50 characters long.")
        .custom(async (name) => {
            if (name) {
                const brandExist = await Brand.findOne({where: {name}});

                if (brandExist) {
                    throw new Error("Brand Name already exists");
                }
            }

            return true;
        }),
]), wrapRequestHandler(handler));
