const express=require("express");
const router=express.Router();
const {protect} =require("../middlewares/protectMiddleware");
const {  createProduct ,getAllProducts, getProductById ,updateProduct ,deleteProduct}= require("../controllers/productController");
const { route } = require("./catogreyRoutes");

router.post("/" ,protect ,createProduct,)
router.get("/",protect ,getAllProducts)
router.get("/:id" ,protect ,getProductById);
router.patch("/:id" ,protect ,updateProduct);
router.delete("/:id" ,protect ,deleteProduct)
module.exports=router;