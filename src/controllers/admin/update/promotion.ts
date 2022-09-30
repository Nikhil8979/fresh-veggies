import {updateRouter} from "../../../routes/updateRouter";
import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {Promotion} from "../../../models/promotion";
import {validate} from "../../../helpers";
import {body} from "express-validator";

const handler: RequestHandler = async (req, res) => {
    const {id, promoType, name, description, discountType, discount, minOrderValue, noOfVouchers, redeemAllowedPerUser, validityStarts, validityEnds, categoryIds} = req.body;
    const promotion = await Promotion.findByPk(id);
    promotion.promoType = promoType;
    promotion.name = name;
    promotion.description = description;
    promotion.discountType = discountType;
    promotion.discount = discount;
    promotion.minOrderValue = minOrderValue;
    promotion.noOfVouchers = noOfVouchers;
    promotion.redeemAllowedPerUser = redeemAllowedPerUser;
    promotion.validityStarts = validityStarts;
    promotion.validityEnds = validityEnds;
    promotion.categoryIds = JSON.stringify(categoryIds);
    await promotion.save();

    return res.json(success("Promotion updated successfully", {promotion}));
};

updateRouter.post("/web/promotion", authMiddleware(), validate([
    body("id").notEmpty().withMessage("Id is required"),
    body("promoType").notEmpty().withMessage("PromoType is Required"),
    body("name").notEmpty().withMessage("Name is Required"),
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
