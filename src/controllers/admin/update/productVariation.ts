import {updateRouter} from "../../../routes/updateRouter";
import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {validate} from "../../../helpers";
import {body} from "express-validator";
import {uploadImage} from "../../../helpers";
import {ProductVariation} from "../../../models/productvariation";

const handler: RequestHandler = async (req, res) => {
    const {id, image, name, unit, marketPrice, sellingPrice, discountType, discount, qty, productId} = req.body;
    let photo;

    if (image){
        photo = await uploadImage({
            image,
            directoryPath: "/uploads/product-variations",
            req
        });
    }

    const productVariation = await ProductVariation.findByPk(id);
    productVariation.name = name;
    productVariation.image = photo ? photo : productVariation.image;
    productVariation.unit = unit;
    productVariation.marketPrice = marketPrice;
    productVariation.sellingPrice = sellingPrice;
    productVariation.discountType = discountType;
    productVariation.discount = discount;
    productVariation.qty = qty;
    productVariation.productId = productId;
    await productVariation.save();
    return res.json(success("Product Variation updated successfully", {productVariation}));
};

updateRouter.post("/web/product-variation", authMiddleware(), validate([
    body("id").notEmpty().withMessage("Id is Required"),
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
