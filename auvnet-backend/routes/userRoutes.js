const express=require("express");
const router=express.Router();
const {protect} =require("../middlewares/protectMiddleware");
const { createAdmin  ,getallAdmin,getUserById,getallUsers ,deleteUser ,updateAdmin }= require("../controllers/userController");
const {role}=require("../middlewares/roleMiddleware");


router.post("/" ,protect ,role("admin"), createAdmin),
router.get("/admins" ,protect,role("admin") ,getallAdmin);
router.get("/users" ,protect,role("admin") ,getallUsers);
router.get("/:id" ,protect,role("admin") ,getUserById);
router.delete("/:id" ,protect,role("admin"),deleteUser);
router.patch("/:id" ,protect,role("admin") ,updateAdmin)

module.exports=router;