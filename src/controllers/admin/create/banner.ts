import {createRouter} from "../../../routes/createRouter";
import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {BannerType, Banner} from "../../../models/banner";
import {uploadImage, validate} from "../../../helpers";
import {body} from "express-validator";

const handler: RequestHandler = async (req, res) => {
    const {image, index} = req.body;

    const photo = await uploadImage({
        image,
        directoryPath: "/uploads/banners",
        req
    });

    await Banner.create(<Partial<BannerType>>{
        image: photo,
        index
    });

    return res.json(success("Banner created successfully"));
};

createRouter.post("/web/banner", authMiddleware(), validate([
    body("image").notEmpty().withMessage("Image is Required"),
]), wrapRequestHandler(handler));
