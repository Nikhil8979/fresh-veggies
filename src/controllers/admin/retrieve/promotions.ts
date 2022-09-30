import {retrieveRouter} from "../../../routes/retrieveRouter";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {Op} from "sequelize";
import {pagination} from "../../../helpers";
import {Promotion} from "../../../models/promotion";

export interface Filters {
    name: any,
    status: any,
    createdAt: any
}

interface QueryTypes {
    limit: number,
    page: number,
    search: string,
    status: string,
    fromDate: string,
    toDate: string
}

const handler: RequestHandler<unknown, unknown, unknown, QueryTypes> = async (req, res) => {
    const {limit, page, search, status, fromDate, toDate} = req.query;
    const where = {} as Filters;

    if (search){
        where.name = {[Op.like]: "%" + search + "%"};
    }

    if (status){
        where.status = status;
    }

    where.createdAt = {
        ...(fromDate ? {[Op.gte]: fromDate} : {}),
        ...(toDate ? {[Op.lt]: toDate} : {})
    };

    // @ts-ignore
    const promotions = await Promotion.findAll({where});
    return res.json(success("", {
        promotions: pagination({
            data: promotions,
            limit: Number(limit),
            page: Number(page)
        }),
        total: promotions.length
    }));
};

retrieveRouter.get("/web/promotions", authMiddleware(), wrapRequestHandler(handler));
