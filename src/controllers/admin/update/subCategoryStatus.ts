import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {SubCategory} from "../../../models/SubCategory";
import {validate} from "../../../helpers";
import {body} from "express-validator";
import {updateRouter} from "../../../routes/updateRouter";

const handler:RequestHandler = async (req, res) => {
    const {id} = req.body;
    const subCategory = await SubCategory.findOne({where: {id}});
    let msg;

    if (subCategory.status){
        subCategory.status = false;
        msg = "SubCategory Deactivated Successfully";
    }else {
        subCategory.status = true;
        msg = "SubCategory Activated Successfully";
    }

    await subCategory.save();
    return res.json(success(msg));
};

updateRouter.post("/web/sub-category-status", authMiddleware(), validate([
    body("id").notEmpty().withMessage("Id is required")
]), wrapRequestHandler(handler));
