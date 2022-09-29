import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {Product} from "../../../models/product";
import {validate} from "../../../helpers";
import {body} from "express-validator";
import {updateRouter} from "../../../routes/updateRouter";
import {VISIBILITY_VISIBLE, VISIBILITY_HIDDEN} from "../../../constant";

const handler: RequestHandler = async (req, res) => {
    const {id} = req.body;
    const product = await Product.findOne({where: {id}});
    let msg;

    if (product.visibility === VISIBILITY_VISIBLE){
        product.visibility = VISIBILITY_HIDDEN;
        msg = "Product hide Successfully";
    } else if(product.visibility === VISIBILITY_HIDDEN){
        product.visibility = VISIBILITY_VISIBLE;
        msg = "Product Visibled Successfully";
    }

    await product.save();
    return res.json(success(msg));
};

updateRouter.post("/web/product-status", authMiddleware(), validate([
    body("id").notEmpty().withMessage("Id is required")
]), wrapRequestHandler(handler));
