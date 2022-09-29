import {createRouter} from "../../../routes/createRouter";
import {success, wrapRequestHandler} from "../../../helpers/response";
import {RequestHandler} from "express";
import {authMiddleware} from "../../../middlewares/authMiddleware";
import {Product, ProductType} from "../../../models/product";
import {validate} from "../../../helpers";
import {body} from "express-validator";
import {uploadImage} from "../../../helpers";
import {ProductDetail, ProductdetailType} from "../../../models/productdetail";
import {ProductImage, ProductImageType} from "../../../models/productimage";

const handler: RequestHandler = async (req, res) => {
    const {
        name, categoryId, subCategoryId, marketPrice, sellingPrice,
        discountType, discount, unit, qty, stock, brandId, visibility, productType, images, productDetails
    } = req.body;

    const product = await Product.create(<Partial<ProductType>>{
        name,
        categoryId,
        subCategoryId,
        marketPrice,
        sellingPrice,
        discountType,
        discount,
        unit,
        stock,
        brandId,
        visibility,
        productType,
        qty
    });

    if (productDetails.length){
        await Promise.all(productDetails.map(async productDetail => {
            await ProductDetail.create(<Partial<ProductdetailType>>{
                key: productDetail.key,
                value: productDetail.value,
                productId: product.id
            });
        }));
    }

    if (images.length){
        await Promise.all(images.map(async image => {
            const photo = await uploadImage({
                image: image,
                directoryPath: "assets/uploads/products/",
                req
            });

            await ProductImage.create(<Partial<ProductImageType>>{
                image: photo,
                productId: product.id,
                index: image.index
            });
        }));
    }

    return res.json(success("Product created successfully", {product}));
};

createRouter.post("/web/product", authMiddleware(), validate([
    body("name").notEmpty().withMessage("Name is Required"),
    body("categoryId").notEmpty().withMessage("Please select category")
        .bail().isInt().withMessage("Category should be integer"),
    body("qty").notEmpty().withMessage("Please enter quantity")
        .bail().isInt().withMessage("Quantity should be number"),
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
]), wrapRequestHandler(handler));
