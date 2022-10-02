import {updateRouter} from "../../../routes/updateRouter";
import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {LoyalityCard, LoyalityCardType} from "../../../models/loyalitycard";
import {validate} from "../../../helpers";
import {body} from "express-validator";
import {uploadImage} from "../../../helpers";
import {Op} from "sequelize";

const handler: RequestHandler = async (req, res) => {
    const {name, image, totalPoints, amountType, amount, minOrderAmount, description, categoryIds} = req.body;

    const loyalityCardImage = await uploadImage({
        image,
        directoryPath: "assets/uploads/loyality-cards/",
        req
    });

    await LoyalityCard.create(<Partial<LoyalityCardType>>{
        name,
        image: loyalityCardImage,
        totalPoints,
        amountType,
        amount,
        minOrderAmount,
        description,
        categoryIds: JSON.stringify(categoryIds),
        status: true
    });

    return res.json(success("Loyality Card created successfully"));
};

updateRouter.post("/web/loyality-card", authMiddleware(), validate([
    body("id").notEmpty().withMessage("Id is Required"),
    body("name").notEmpty().withMessage("Name is Required")
        .bail().isString().isLength({max: 50})
        .withMessage("Name must be upto 50 characters long.")
        .custom(async (name, {req}) => {
            const {id} = req;

            if (name){
                const loyalityCardExist = await LoyalityCard.findOne({
                    where: {
                        [Op.and]: [
                            {name},
                            {id: {[Op.ne]: id}}
                        ]
                    }
                });

                if (loyalityCardExist){
                    throw new Error("Loyality Card already exists");
                }
            }

            return true;
        }),
    body("image").notEmpty().withMessage("Image is Required."),
    body("totalPoints").notEmpty().withMessage("Total Points is required."),
    body("amountType").notEmpty().withMessage("Amount Type is required."),
    body("amount").notEmpty().withMessage("Amount is required."),
    body("minOrderAmount").notEmpty().withMessage("Min Order Amount is required."),
    body("description").notEmpty().withMessage("Description is required"),
    body("categoryIds").notEmpty().withMessage("Please select the category.")
]), wrapRequestHandler(handler));
