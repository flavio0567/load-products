const express = require("express");
const router = express.Router();
const ProductsController = require("../controllers/ProductController");

router.get("/products", (req, res) => {
  ProductsController.index;
  console.log(res);
});

router.post("/products", ProductsController.create);

module.exports = router;
