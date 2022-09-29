import {retrieveRouter} from "../../../routes/retrieveRouter";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {Category} from "../../../models/category";
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
    const categories = await Category.findAll({where});
    return res.json(success("", {
        categories: pagination({
            data: categories,
            limit: Number(limit),
            page: Number(page)
        }),
        total: categories.length
    }));
};

retrieveRouter.get("/web/categories", authMiddleware(), wrapRequestHandler(handler));
