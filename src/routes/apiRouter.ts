import {Router} from "express";
import {app} from "../app";

export const apiRouter = Router();
app.use("/api", apiRouter);
