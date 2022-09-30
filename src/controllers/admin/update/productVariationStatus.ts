import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {ProductVariation} from "../../../models/productvariation";
import {validate} from "../../../helpers";
import {body} from "express-validator";
import {updateRouter} from "../../../routes/updateRouter";

const handler: RequestHandler = async (req, res) => {
    const {id} = req.body;
    const productVariation = await ProductVariation.findOne({where: {id}});
    let msg;

    if (productVariation.status){
        productVariation.status = false;
        msg = "Product Variation DeActivated Successfully";
    } else{
        productVariation.status = true;
        msg = "Product Variation Activated Successfully";
    }

    await productVariation.save();
    return res.json(success(msg));
};

updateRouter.post("/web/product-variation-status", authMiddleware(), validate([
    body("id").notEmpty().withMessage("Id is required")
]), wrapRequestHandler(handler));
