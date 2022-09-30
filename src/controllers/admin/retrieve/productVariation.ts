import {retrieveRouter} from "../../../routes/retrieveRouter";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {Op} from "sequelize";
import {pagination} from "../../../helpers";
import {ProductVariation} from "../../../models/productvariation";

export interface Filters {
    name: any,
    status:any
}

interface QueryTypes {
    limit: number,
    page: number,
    search: string,
    status:string
}

const handler: RequestHandler<unknown, unknown, unknown, QueryTypes> = async (req, res) => {
    const {limit, page, search, status} = req.query;
    const where = {} as Filters;

    if (search){
        where.name = {[Op.like]: "%" + search + "%"};
    }

    if (status){
        where.status = status;
    }

    // @ts-ignore
    const product_variations = await ProductVariation.findAll({where});
    return res.json(success("", {
        product_variations: pagination({
            data: product_variations,
            limit: Number(limit),
            page: Number(page)
        }),
        total: product_variations.length
    }));
};

retrieveRouter.get("/web/products-variation", authMiddleware(), wrapRequestHandler(handler));
