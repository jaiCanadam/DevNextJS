const express = require("express");
const router = express.Router();
const {
  create,
  list,
  listAllProductsCategoryTags,
  read,
  remove,
  update,
  listBySellArrival,
  listRelated,
  listSearch,
  photo,
  listCategories,
  listBySearch,
} = require("../controllers/product");

const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post("/create-product", requireSignin, adminMiddleware, create);
router.get("/products", list);
router.post("/products-category-tags", listAllProductsCategoryTags);
router.get("/product/:slug", read);
router.delete("/product/:slug", requireSignin, adminMiddleware, remove);
router.put("/product/:slug", requireSignin, adminMiddleware, update);
router.get("/products/categories", listCategories);

// list products by sold number or created on
router.get("/productsbycheck", listBySellArrival);
//list related products
router.post("/products/related/:slug", listRelated);
//list products by search for Shop page - showing category and price page
router.post("/products/search", listSearch);
//when user enters in search bar
router.get("/prod/search", listBySearch);

//list photo
router.get("/product/photo/:slug", photo);

module.exports = router;
