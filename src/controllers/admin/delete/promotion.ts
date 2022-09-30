import {deleteRouter} from "../../../routes/deleteRouter";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {Promotion} from "../../../models/promotion";
import {validate} from "../../../helpers";
import {body} from "express-validator";

const handler: RequestHandler = async (req, res) => {
    const {id} = req.body;
    await Promotion.destroy({where: {id}});
    return res.json(success("Promotion Deleted Successfully"));
};

deleteRouter.post("/web/promotion", authMiddleware(), validate([
    body("id").notEmpty().withMessage("Id is required")
]), wrapRequestHandler(handler));
