import {createRouter} from "../../../routes/createRouter";
import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {Category, CategoryType} from "../../../models/category";
import {validate} from "../../../helpers";
import {body} from "express-validator";
import {uploadImage} from "../../../helpers";

const handler:RequestHandler = async (req, res) => {
    const {name, image} = req.body;

    const categoryImage = await uploadImage({
        image,
        directoryPath: "assets/uploads/categories/",
        req
    });

    await Category.create(<Partial<CategoryType>>{
        name,
        image: categoryImage,
        status: true
    });

    return res.json(success("Category created successfully"));
};

createRouter.post("/web/category", authMiddleware(), validate([
    body("name").notEmpty().withMessage("Name is Required")
        .bail().isString().isLength({max: 50})
        .withMessage("Name must be upto 50 characters long.")
        .custom(async (name) => {
            if (name){
                const categoryExist = await Category.findOne({where: {name}});

                if (categoryExist){
                    throw new Error("Category Name already exists");
                }
            }

            return true;
        }),
    body("image").notEmpty().withMessage("Image is Required")
]), wrapRequestHandler(handler));
