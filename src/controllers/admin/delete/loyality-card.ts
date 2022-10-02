import {deleteRouter} from "../../../routes/deleteRouter";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {LoyalityCard} from "../../../models/loyalitycard";
import {validate} from "../../../helpers";
import {body} from "express-validator";

const handler: RequestHandler = async (req, res) => {
    const {id} = req.body;
    await LoyalityCard.destroy({where: {id}});
    return res.json(success("Loyality Deleted Successfully"));
};

deleteRouter.post("/web/loyality-card", authMiddleware(), validate([
    body("id").notEmpty().withMessage("Id is required")
]), wrapRequestHandler(handler));
