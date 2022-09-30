import {createRouter} from "../../../routes/createRouter";
import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {Promotion, PromotionType} from "../../../models/promotion";
import {validate} from "../../../helpers";
import {body} from "express-validator";

const handler: RequestHandler = async (req, res) => {
    const {promoType, name, description, discountType, discount, minOrderValue, noOfVouchers, redeemAllowedPerUser, validityStarts, validityEnds, categoryIds} = req.body;

    const promotions = await Promotion.create(<Partial<PromotionType>>{
        promoType,
        name,
        description,
        discount,
        discountType,
        minOrderValue,
        noOfVouchers,
        redeemAllowedPerUser,
        validityEnds,
        validityStarts,
        categoryIds: JSON.stringify(categoryIds)
    });

    return res.json(success("Promotion created successfully", {promotions}));
};

createRouter.post("/web/promotion", authMiddleware(), validate([
    body("promoType").notEmpty().withMessage("PromoType is Required"),
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is Required"),
    body("discount").notEmpty().withMessage("Discount is Required"),
    body("discountType").notEmpty().withMessage("Discount Type is Required"),
    body("minOrderValue").notEmpty().withMessage("Minimum Order Value is Required"),
    body("noOfVouchers").notEmpty().withMessage("No. of Vouchers is Required"),
    body("redeemAllowedPerUser").notEmpty().withMessage("No. of Redeem Allowed Per User is Required"),
    body("validityStarts").notEmpty().withMessage("Validity start date is Required"),
    body("validityEnds").notEmpty().withMessage("Validity end date is Required"),
    body("categoryIds").notEmpty().withMessage("Please Select the Categories.")
]), wrapRequestHandler(handler));
