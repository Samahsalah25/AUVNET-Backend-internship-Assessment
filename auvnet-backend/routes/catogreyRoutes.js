const express = require("express");
const { createCategory, getCategories  ,getAllCategories ,updateCategory ,deleteCategory} = require("../controllers/catogryController");
const {protect}= require("../middlewares/protectMiddleware");
const {role}=require("../middlewares/roleMiddleware")

const router = express.Router();

router.post("/",protect ,role("admin"), createCategory) ; // Admin only
router.get("/", protect,getCategories); // Public
router.get("/all", protect,role("admin"),getAllCategories); 
router.patch("/:id"  ,protect,role("admin") ,updateCategory)
router.delete("/:id" ,protect,role("admin") ,deleteCategory)

module.exports = router;
