import {retrieveRouter} from "../../../routes/retrieveRouter";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {Product} from "../../../models/product";
import {Op} from "sequelize";
import {pagination} from "../../../helpers";

export interface Filters {
    name: any,
    categoryId: any,
    subCategoryId: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createdAt: any,
    visibility: any,
    productType: any
}

interface QueryTypes {
    limit: number,
    page: number,
    search: string,
    fromDate: string,
    toDate: string,
    visibility: string,
    productType: string,
    subCategoryId: number,
    categoryId: number
}

const handler: RequestHandler<unknown, unknown, unknown, QueryTypes> = async (req, res) => {
    const {limit, page, search, fromDate, toDate, visibility, productType, subCategoryId, categoryId} = req.query;
    const where = {} as Filters;

    if (search){
        where.name = {[Op.like]: "%" + search + "%"};
    }

    where.createdAt = {
        [Op.and]: {
            ...(fromDate ? {[Op.gt]: new Date(fromDate)} : {}),
            ...(toDate ? {[Op.lt]: new Date(toDate)} : {}),
        }
    };

    if (visibility){
        where.visibility = visibility;
    }

    if (productType){
        where.productType = productType;
    }

    if (subCategoryId){
        where.subCategoryId = subCategoryId;
    }

    if (categoryId){
        where.categoryId = categoryId;
    }

    // @ts-ignore
    const products = await Product.findAll({where});
    return res.json(success("", {
        products: pagination({
            data: products,
            limit: Number(limit),
            page: Number(page)
        }),
        total: products.length
    }));
};

retrieveRouter.get("/web/products", authMiddleware(), wrapRequestHandler(handler));
