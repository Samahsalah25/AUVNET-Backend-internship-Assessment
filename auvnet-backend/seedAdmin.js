const mongoose = require("mongoose");
const User = require("./models/User"); // عدلي المسار حسب مكان الملف

const connectDB = async () => {
  try {
    await mongoose.connect("your_mongo_uri_here");

    console.log("✅ MongoDB Connected");

    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists");
      process.exit();
    }

    const admin = new User({
      name: "admin",
      email: "admin@example.com",
      password: "admin", // سيتم عمل hashing تلقائي
      type: "admin",
    });

    await admin.save();
    console.log("✅ Admin user created successfully");

    process.exit();
  } catch (err) {
    console.error("❌ Error seeding admin:", err.message);
    process.exit(1);
  }
};

connectDB();
