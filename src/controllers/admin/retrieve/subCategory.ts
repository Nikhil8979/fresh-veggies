import {retrieveRouter} from "../../../routes/retrieveRouter";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {SubCategory} from "../../../models/SubCategory";
import {Op} from "sequelize";
import {pagination} from "../../../helpers";
export interface Filters {
    status:any,
    name:any
}

const handler:RequestHandler = async (req, res) => {
    const {limit, page, search, status} = req.query;
    const where = {} as Filters;
    where.status = status;

    if (search){
        where.name = {[Op.like]: "%" + search + "%"};
    }

    // @ts-ignore
    const sub_categories = await SubCategory.findAll({where});

    return res.json(success("", {
        sub_categories: pagination({
            data: sub_categories,
            limit: Number(limit),
            page: Number(page)
        }),
        total: sub_categories.length
    }));
};

retrieveRouter.get("/web/sub-categories", authMiddleware(), wrapRequestHandler(handler));
