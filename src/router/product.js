const express = require("express");
const router = express.Router();

const productController = require("../app/controller/product.controller");

router.post("/addProduct", productController.createNewProduct);
router.put("/update/:id", productController.updateOneProductById);
router.delete("/delete/:id", productController.deleteOneProductById);
router.post("/:id", productController.productByUser);
router.get("/", productController.productAll);

module.exports = router;
