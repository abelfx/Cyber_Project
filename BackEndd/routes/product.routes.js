const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

// Product routes without authentication
router.post("/addProduct", productController.addProduct);
router.get("/getProducts", productController.getProducts);
router.get("/getProduct/:id", productController.getProduct);
router.put("/updateProduct/:id", productController.updateProduct);
router.delete("/deleteProduct/:id", productController.deleteProduct);
router.get("/deleteProduct/:id", productController.deleteProductforget);
router.get("/filter", productController.filterProducts);

module.exports = router;
