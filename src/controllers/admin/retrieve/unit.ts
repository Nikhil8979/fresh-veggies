import {retrieveRouter} from "../../../routes/retrieveRouter";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {Unit} from "../../../models/unit";
import {pagination} from "../../../helpers";

const handler: RequestHandler = async (req, res) => {
    const {limit, page, measurementId} = req.query;
    // @ts-ignore
    const units = await Unit.findAll({where: {measurementId}});

    return res.json(success("", {
        units: pagination({
            data: units,
            limit: Number(limit),
            page: Number(page)
        }),
        total: units.length
    }));
};

retrieveRouter.get("/web/units", authMiddleware(), wrapRequestHandler(handler));
