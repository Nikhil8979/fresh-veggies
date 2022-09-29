import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {SubCategory} from "../../../models/SubCategory";
import {validate} from "../../../helpers";
import {body} from "express-validator";
import {uploadImage} from "../../../helpers";
import {updateRouter} from "../../../routes/updateRouter";
import {Op} from "sequelize";

const handler:RequestHandler = async (req, res) => {
    const {id, name, image, categoryId} = req.body;
    const subCategory = await SubCategory.findOne({where: {id}});
    let subCategoryImage;

    if (image){
        subCategoryImage = await uploadImage({
            image,
            directoryPath: "assets/uploads/sub-categories/",
            req
        });
    }

    subCategory.name = name;
    subCategory.image = subCategoryImage;
    subCategory.categoryId = categoryId;
    await subCategory.save();

    return res.json(success("SubCategory Updated successfully"));
};

updateRouter.post("/web/sub-category", authMiddleware(), validate([
    body("id").notEmpty().withMessage("Id is required"),
    body("name").notEmpty().withMessage("Name is Required")
        .bail().isString().isLength({max: 50})
        .withMessage("Name must be upto 50 characters long.")
        .custom(async (name, {req}) => {
            const {id} = req.body;

            if (name){
                const categoryExist = await SubCategory.findOne({
                    where: {
                        [Op.and]: [
                            {name},
                            {id: {[Op.ne]: id}}
                        ]
                    }
                });

                if (categoryExist){
                    throw new Error("SubCategory Name already exists");
                }
            }

            return true;
        }),
]), wrapRequestHandler(handler));
