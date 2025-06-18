const express=require("express");
const connectDB=require("./config/db");
const cors=require("cors");
const cookieParser = require("cookie-parser");
const authRoutes=require("./routes/authRoutes");
const productRoutes=require("./routes/productRoutes")
const wishlist=require("./routes/wishlistRoutes")
const categoryRoutes = require("./routes/catogreyRoutes");
const userRoutes=require("./routes/userRoutes");
require("dotenv").config;

const app=express();

// MiddelWare here

app.use(express.json());
app.use(cookieParser())
app.use(cors({
     origin: true,           // يسمح لأي Origin مع credentials
  credentials: true, 
}));

app.use("/api/auth",authRoutes); 
app.use("/api/product",productRoutes); 
app.use("/api/categories", categoryRoutes);
app.use("/api/wishlist", wishlist);
app.use("/api/user", userRoutes);

// ConnectedDB
connectDB()
const PORT=process.env.PORT||5000;
app.listen(PORT ,()=>{
    console.log(`Server running now on  http://localhost:${PORT}`);
    
})