const express = require("express");
const ProductController = require("../../app/controllers/productController/productController");

const router = express.Router();
const productController = ProductController(); // ✅ Call the function to get the controller object

router.get("/", productController.getAllProductDetails);
router.post("/create", productController.createProduct);
router.delete("/delete/:name", productController.deleteProductByProductName);
router.put("/update/:name", productController.updateProductByProductName);
router.put("/:name", productController.getByProductName);

module.exports = router;
