import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {Banner} from "../../../models/banners";
import {uploadImage, validate} from "../../../helpers";
import {body} from "express-validator";
import {updateRouter} from "../../../routes/updateRouter";

const handler: RequestHandler = async (req, res) => {
    const {id, image, index} = req.body;
    let photo;

    if (image) {
        photo = await uploadImage({
            image,
            directoryPath: "/uploads/banners",
            req
        });
    }

    const banner = await Banner.findByPk(id);
    banner.image = image ? photo : banner.image;
    banner.index = index ? index : banner.index;
    await banner.save();

    return res.json(success("Banner Updated successfully"));
};

updateRouter.post("/web/banner", authMiddleware(), validate([
    body("id").notEmpty().withMessage("Id is required"),
]), wrapRequestHandler(handler));
