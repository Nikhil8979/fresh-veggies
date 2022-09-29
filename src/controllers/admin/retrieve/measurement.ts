import {retrieveRouter} from "../../../routes/retrieveRouter";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {Measurement} from "../../../models/measurement";
import {pagination} from "../../../helpers";

const handler: RequestHandler = async (req, res) => {
    const {limit, page} = req.query;
    const measurements = await Measurement.findAll();
    return res.json(success("", {
        measurements: pagination({
            data: measurements,
            limit: Number(limit),
            page: Number(page)
        }),
        total: measurements.length
    }));
};

retrieveRouter.get("/web/measurements", authMiddleware(), wrapRequestHandler(handler));
