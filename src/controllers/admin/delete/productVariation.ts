import {deleteRouter} from "../../../routes/deleteRouter";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {ProductVariation} from "../../../models/productvariation";
import {validate} from "../../../helpers";
import {body} from "express-validator";

const handler: RequestHandler = async (req, res) => {
    const {id} = req.body;
    await ProductVariation.destroy({where: {id}});
    return res.json(success("Product Variation Deleted Successfully"));
};

deleteRouter.post("/web/product-variation", authMiddleware(), validate([
    body("id").notEmpty().withMessage("Id is required")
]), wrapRequestHandler(handler));
