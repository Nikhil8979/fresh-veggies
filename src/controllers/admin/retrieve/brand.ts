import {retrieveRouter} from "../../../routes/retrieveRouter";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {Brand} from "../../../models/brand";
import {pagination} from "../../../helpers";

const handler: RequestHandler = async (req, res) => {
    const {limit, page} = req.query;
    const brands = await Brand.findAll();
    return res.json(success("", {
        brands: pagination({
            data: brands,
            limit: Number(limit),
            page: Number(page)
        }),
        total: brands.length
    }));
};

retrieveRouter.get("/web/brands", authMiddleware(), wrapRequestHandler(handler));
