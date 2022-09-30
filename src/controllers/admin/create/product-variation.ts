import {createRouter} from "../../../routes/createRouter";
import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {validate} from "../../../helpers";
import {body} from "express-validator";
import {uploadImage} from "../../../helpers";
import {ProductVariation, ProductVariationType} from "../../../models/productvariation";

const handler: RequestHandler = async (req, res) => {
    const {image, name, unit, marketPrice, sellingPrice, discountType, discount, qty, productId} = req.body;

    const photo = await uploadImage({
        image,
        directoryPath: "/uploads/product-variations",
        req
    });

    const productVariation = await ProductVariation.create(<Partial<ProductVariationType>>{
        name,
        image: photo,
        unit,
        marketPrice,
        sellingPrice,
        discountType,
        discount,
        qty,
        productId,
        status: true
    });

    return res.json(success("Product Variation created successfully", {productVariation}));
};

createRouter.post("/web/product-variation", authMiddleware(), validate([
    body("name").notEmpty().withMessage("Name is Required"),
    body("image").notEmpty().withMessage("Image is Required"),
    body("unit").notEmpty().withMessage("Unit is Required"),
    body("marketPrice").notEmpty().withMessage("Market Price is Required"),
    body("sellingPrice").notEmpty().withMessage("Selling Price is Required"),
    body("discountType").notEmpty().withMessage("Discount Type is Required"),
    body("discount").notEmpty().withMessage("Discount is Required"),
    body("qty").notEmpty().withMessage("Qty is Required"),
    body("productId").notEmpty().withMessage("ProductId is Required"),
]), wrapRequestHandler(handler));
