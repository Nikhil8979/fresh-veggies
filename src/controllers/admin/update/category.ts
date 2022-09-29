import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {Category} from "../../../models/category";
import {validate} from "../../../helpers";
import {body} from "express-validator";
import {uploadImage} from "../../../helpers";
import {updateRouter} from "../../../routes/updateRouter";
import {Op} from "sequelize";

const handler:RequestHandler = async (req, res) => {
    const {id, name, image} = req.body;
    const category = await Category.findOne({where: {id}});
    let categoryImage;

    if (image){
        categoryImage = await uploadImage({
            image,
            directoryPath: "assets/uploads/categories/",
            req
        });
    }

    category.name = name;
    category.image = categoryImage;
    await category.save();

    return res.json(success("Category Updated successfully"));
};

updateRouter.post("/web/category", authMiddleware(), validate([
    body("id").notEmpty().withMessage("Id is required"),
    body("name").notEmpty().withMessage("Name is Required")
        .bail().isString().isLength({max: 50})
        .withMessage("Name must be upto 50 characters long.")
        .custom(async (name, {req}) => {
            const {id} = req.body;

            if (name){
                const categoryExist = await Category.findOne({
                    where: {
                        [Op.and]: [
                            {name},
                            {id: {[Op.ne]: id}}
                        ]
                    }
                });

                if (categoryExist){
                    throw new Error("Category Name already exists");
                }
            }

            return true;
        }),
]), wrapRequestHandler(handler));
