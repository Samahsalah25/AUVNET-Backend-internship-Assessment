const express=require("express");
const router=express.Router();
const {protect} =require("../middlewares/protectMiddleware");
const {  addToWishlist, getWishlist,removeFromWishlist}= require("../controllers/wishlistController");
const {role}=require("../middlewares/roleMiddleware")

router.post("/" ,protect ,role("user"), addToWishlist)
router.get("/" ,protect, role("user"),getWishlist);
router.delete("/:id" ,protect ,role("user") ,removeFromWishlist)
module.exports=router;