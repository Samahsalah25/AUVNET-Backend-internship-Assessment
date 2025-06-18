const Product=require("../models/Product");

const { createProductSchema ,updateProductSchema} = require("../validations/productValidation");

const createProduct = async (req, res) => {
  try {
    const { error } = createProductSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, description, price, image, category } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      image,
      category,
      createdBy: req.user._id,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// GET /api/product?page=1&limit=10
const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments();
    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .populate("category", "name")
      .populate("createdBy", "name userName _id");

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      products,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
};



// get single product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category", "name" );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log(product);
    
    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};


//   هنا هيعدل لو هو صاحب المنتج او ادمن 

const updateProduct = async (req, res) => {
  try {
    const { error } = updateProductSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Validation failed", details: error.details[0].message });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Check permission
    if (
      product.createdBy.toString() !== req.user._id.toString() &&
      req.user.type !== "admin"
    ) {
      return res.status(403).json({ message: "You are not allowed to update this product" });
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({ message: "Product updated", product: updated });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

//  هيمسح لو هو صاحب المنتج او الادمن 

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (
      product.createdBy.toString() !== req.user._id.toString() &&
      req.user.type !== "admin"
    ) {
      return res.status(403).json({ message: "You are not allowed to delete this product" });
    }

  await product.deleteOne();
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};


module.exports={createProduct ,getAllProducts  ,getProductById ,updateProduct ,deleteProduct}