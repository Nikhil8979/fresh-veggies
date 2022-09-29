import {createRouter} from "../../../routes/createRouter";
import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {SubCategory, subCategoryType} from "../../../models/SubCategory";
import {validate} from "../../../helpers";
import {body} from "express-validator";
import {uploadImage} from "../../../helpers";

const handler:RequestHandler = async (req, res) => {
    const {name, image, categoryId} = req.body;

    const subCategoryImage = await uploadImage({
        image,
        directoryPath: "assets/uploads/sub-categories/",
        req
    });

    await SubCategory.create(<Partial<subCategoryType>>{
        name,
        image: subCategoryImage,
        categoryId,
        status: true
    });

    return res.json(success("SubCategory created successfully"));
};

createRouter.post("/web/sub-category", authMiddleware(), validate([
    body("name").notEmpty().withMessage("Name is Required")
        .bail().isString().isLength({max: 50})
        .withMessage("Name must be upto 50 characters long.")
        .custom(async (name) => {
            if (name){
                const subCategoryExist = await SubCategory.findOne({where: {name}});

                if (subCategoryExist){
                    throw new Error("Sub Category Name already exists");
                }
            }

            return true;
        }),
    body("image").notEmpty().withMessage("Image is Required"),
    body("categoryId").notEmpty().withMessage("CategoryID is Required")
]), wrapRequestHandler(handler));
