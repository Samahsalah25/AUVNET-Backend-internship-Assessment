// controllers/categoryController.js
const Category = require("../models/Category");
const {categorySchema}= require("../validations/categoryValidator")
// 1. Create Category
exports.createCategory = async (req, res) => {
    console.log("hht");
    try {
      const { error } = categorySchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
  
      const { name, parent } = req.body;

  
      const newCategory = new Category({
        name,
        parent: parent || null,
      });
  
      await newCategory.save();
      res.status(201).json(newCategory);
    } catch (err) {
      res.status(500).json({ message: "Failed to create category", error: err.message });
    }
  };


// 2. Get Categories by parent (or root)
exports.getCategories = async (req, res) => {
  try {
   const parent = req.query.parent === "null" ? null : req.query.parent;

    const categories = await Category.find({ parent });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to get categories", error: err.message });
  }
};

// getall for admin// /api/category/all
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("parent", "name");
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch categories", error: err.message });
  }
};




// Update
exports.updateCategory = async (req, res) => {
    try {
      const updated = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json({ message: "Update failed", error: err.message });
    }
  };
  
  // Delete
  exports.deleteCategory = async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Category deleted" });
    } catch (err) {
      res.status(500).json({ message: "Delete failed", error: err.message });
    }
  };
  
