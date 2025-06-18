import { useEffect, useState } from "react";
import axios from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Pencil, Trash2 } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`/api/product?page=${page}&limit=6`);
        const data = res.data;

        if (Array.isArray(data.products)) {
          setProducts(data.products);
          setTotalPages(data.totalPages);
        } else {
          toast.error("Invalid data from server");
        }
      } catch (err) {
        toast.error("Failed to load products");
      }
    };

    fetchProducts();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/product/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "You are not allowed to delete this product"
      );
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleAddToWishlist = async (product) => {
    try {
      const res = await axios.post(`/api/wishlist`, { product });
      toast.success(res.data.message || "✅ Added to wishlist!");
    } catch (err) {
      const msg = err.response?.data?.message;
      if (msg && msg.toLowerCase().includes("already")) {
        toast.info("⚠️ Product is already in wishlist");
      } else {
        toast.error("❌ Failed to add to wishlist");
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          🛍️ All Products
        </h1>

        {user?.type === "user" && (
          <div className="mb-6 text-right">
            <button
              onClick={() => navigate("/add-product")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              ➕ Add Product
            </button>
          </div>
        )}

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                className="bg-white rounded-2xl shadow-lg p-5 flex flex-col justify-between hover:shadow-xl transition"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                  <p className="text-sm text-gray-500 mb-1">
                    Category: {product.category?.name || "N/A"}
                  </p>
                  <p className="text-md font-medium text-teal-700">
                    ${product.price}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Created by: {product.createdBy?.name || "Unknown"}
                  </p>
                </div>

                <div className="mt-4 flex gap-2 flex-wrap">
                  {user?.type !== "admin" && (
                    <button
                      onClick={() => handleAddToWishlist(product._id)}
                      className="flex items-center gap-1 bg-teal-500 hover:bg-teal-600 text-white text-sm px-3 py-1 rounded-md"
                    >
                      <Heart size={16} /> Wishlist
                    </button>
                  )}

                  {user && (user.type === "admin" || user.id === product.createdBy?._id) && (
                    <>
                      <button
                        onClick={() => handleEdit(product._id)}
                        className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded-md"
                      >
                        <Pencil size={16} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">No products available.</p>
        )}

        {/* Pagination */}
        <div className="mt-10 flex justify-center items-center gap-3">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm font-medium text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Products;
