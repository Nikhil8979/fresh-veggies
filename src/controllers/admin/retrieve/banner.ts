import {retrieveRouter} from "../../../routes/retrieveRouter";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {Banner} from "../../../models/banners";
import {pagination} from "../../../helpers";

const handler: RequestHandler = async (req, res) => {
    const {limit, page} = req.query;
    const banners = await Banner.findAll();
    return res.json(success("", {
        banners: pagination({
            data: banners,
            limit: Number(limit),
            page: Number(page)
        }),
        total: banners.length
    }));
};

retrieveRouter.get("/web/banner", authMiddleware(), wrapRequestHandler(handler));
