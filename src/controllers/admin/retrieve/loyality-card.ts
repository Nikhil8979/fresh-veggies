import {retrieveRouter} from "../../../routes/retrieveRouter";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {LoyalityCard} from "../../../models/loyalitycard";
import {Op} from "sequelize";
import {pagination} from "../../../helpers";

export interface Filters {
    name: any
}

const handler: RequestHandler = async (req, res) => {
    const {limit, page, search} = req.query;
    const where = {} as Filters;

    if (search) {
        where.name = {[Op.like]: "%" + search + "%"};
    }

    // @ts-ignore
    const loyality_cards = await LoyalityCard.findAll({where});
    return res.json(success("", {
        loyality_cards: pagination({
            data: loyality_cards,
            limit: Number(limit),
            page: Number(page)
        }),
        total: loyality_cards.length
    }));
};

retrieveRouter.get("/web/loyality-cards", authMiddleware(), wrapRequestHandler(handler));
