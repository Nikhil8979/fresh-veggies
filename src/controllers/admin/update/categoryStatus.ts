import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {Category} from "../../../models/category";
import {validate} from "../../../helpers";
import {body} from "express-validator";
import {updateRouter} from "../../../routes/updateRouter";

const handler: RequestHandler = async (req, res) => {
    const {id} = req.body;
    const category = await Category.findOne({where: {id}});
    let msg;

    if (category.status){
        category.status = false;
        msg = "Category Deactivated Successfully";
    } else {
        category.status = true;
        msg = "Category Activated Successfully";
    }

    await category.save();
    return res.json(success(msg));
};

updateRouter.post("/web/category-status", authMiddleware(), validate([
    body("id").notEmpty().withMessage("Id is required")
]), wrapRequestHandler(handler));
