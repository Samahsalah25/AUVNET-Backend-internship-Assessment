const { findById } = require("../models/Product");
const Wishlist=require("../models/Wish_list");
const Product=require("../models/Product");
const Wish_list = require("../models/Wish_list");
const addToWishlist = async (req, res) => {
  try {
    const { product } = req.body;
    const userId = req.user._id;

    // Check if product exists
    const existingProduct = await Product.findById(product);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if already in wishlist
    const alreadyInWishlist = await Wishlist.findOne({ user: userId, product });
    if (alreadyInWishlist) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    const newWishlistItem = new Wishlist({ user: userId, product });
    await newWishlistItem.save();

    res.status(201).json({ message: "Added to wishlist", data: newWishlistItem });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};


const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    const wishlist = await Wishlist.find({ user: userId }).populate("product");

    res.status(200).json({ data: wishlist });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};





const removeFromWishlist = async (req, res) => {
  try {
    const wishlistItemId = req.params.id;

    const item = await Wishlist.findById(wishlistItemId);

    if (!item) {
      return res.status(404).json({ message: "Wishlist item not found" });
    }

    // optional: check ownership
    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this item" });
    }

    await Wishlist.findByIdAndDelete(wishlistItemId);

    res.status(200).json({ message: "Removed from wishlist" });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};