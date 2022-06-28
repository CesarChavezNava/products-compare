import { Router } from "express";
import { productController } from "../controllers/product.controllers";

const router = Router();

router.get("/stores/:storeName/products", productController.get);
module.exports = router;
