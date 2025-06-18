const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null, // null معناها دي فئة رئيسية
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
