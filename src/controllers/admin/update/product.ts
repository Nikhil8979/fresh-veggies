import {updateRouter} from "../../../routes/updateRouter";
import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {Product} from "../../../models/product";
import {validate} from "../../../helpers";
import {body} from "express-validator";
import {uploadImage} from "../../../helpers";
import {ProductDetail} from "../../../models/productdetail";
import {ProductImage} from "../../../models/productimage";

const handler: RequestHandler = async (req, res) => {
    const {
        id,
        name, categoryId, subCategoryId, marketPrice, sellingPrice,
        discountType, discount, unit, qty, stock, brandId, visibility, productType, images, productDetail
    } = req.body;

    const product = await Product.findByPk(id);
    product.name = name;
    product.categoryId = categoryId;
    product.subCategoryId = subCategoryId;
    product.marketPrice = marketPrice;
    product.sellingPrice = sellingPrice;
    product.discountType = discountType;
    product.discount = discount;
    product.unit = unit;
    product.stock = stock;
    product.brandId = brandId;
    product.visibility = visibility;
    product.productType = productType;
    product.qty = qty;
    await product.save();

    if (productDetail) {
        const product_detail = await ProductDetail.findByPk(productDetail.id);
        product_detail.key = productDetail.key;
        product_detail.value = productDetail.value;
        await product_detail.save();
    }

    if (images) {
        const photo = await uploadImage({
            image: images.image,
            directoryPath: "assets/uploads/products/",
            req
        });

        const product_image = await ProductImage.findByPk(images.id);
        product_image.image = photo;
        product_image.index = images.index;
        await product_image.save();
    }

    return res.json(success("Product created successfully", {product}));
};

updateRouter.post("/web/product", authMiddleware(), validate([
    body("id").notEmpty().withMessage("Id is Required"),
    body("name").notEmpty().withMessage("Name is Required"),
    body("categoryId").notEmpty().withMessage("Please select category")
        .bail().isInt().withMessage("Category should be integer"),
    body("subCategoryId").notEmpty().withMessage("Please select subcategory")
        .bail().isInt().withMessage("SubCategory should be integer"),
    body("marketPrice").notEmpty().withMessage("Please enter market price")
        .bail().isInt().withMessage("Market Price Should be Number"),
    body("sellingPrice").notEmpty().withMessage("Please enter selling price")
        .bail().isInt().withMessage("Selling Price Should be Number"),
    body("discountType").notEmpty().withMessage("Please select discount type")
        .bail().isString().withMessage("Discount should be string"),
    body("discount").notEmpty().withMessage("Please enter discount")
        .bail().isInt().withMessage("Discount should be number"),
    body("unit").notEmpty().withMessage("Please enter a unit")
        .bail().isString().withMessage("Unit should be string"),
    body("stock").notEmpty().withMessage("Please enter a stock")
        .bail().isInt().withMessage("Stock should be number"),
    body("brandId").notEmpty().withMessage("Please select a brand")
        .bail().isInt().withMessage("Brand should be number"),
    body("visibility").notEmpty().withMessage("Please choose visibility")
        .bail().isString().withMessage("Visibility should be string"),
    body("productType").notEmpty().withMessage("Please choose productType")
        .bail().isString().withMessage("Product Type should be string"),
    body("qty").notEmpty().withMessage("Please enter quantity")
        .bail().isInt().withMessage("Quantity should be number"),
]), wrapRequestHandler(handler));
