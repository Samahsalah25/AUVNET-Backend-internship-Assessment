import { useEffect, useState } from "react";
import axios from "../services/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import wishlistBg from "../assets/wishlist.jpg";

const Wishlist = () => {

  const [wishlist, setWishlist] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
if (user?.type === "admin") {
  return null; // أو Navigate to /users
}
  const fetchWishlist = async () => {
    try {
      const res = await axios.get("/api/wishlist");
      setWishlist(res.data.data);
    } catch (err) {
      toast.error("❌ Failed to load wishlist");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/wishlist/${id}`);
      setWishlist((prev) => prev.filter((item) => item._id !== id));
      toast.success("🗑️ Removed from wishlist");
    } catch (err) {
      toast.error("❌ Could not delete item");
    }
  };

  const handleAddToCart = (product) => {
    // Placeholder: replace with your cart logic
    toast.success(`🛒 ${product.name} added to cart`);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
     backgroundImage: `url(${wishlistBg})`,
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-10 drop-shadow-md">
          <Heart className="inline-block w-8 h-8 text-pink-400 mr-2" />
          Your Wishlist
        </h2>

        {wishlist.length === 0 ? (
          <p className="text-white text-center text-lg">
            Your wishlist is empty.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item, index) => (
              <motion.div
                key={item._id}
                className="bg-white rounded-2xl shadow-lg p-5 flex flex-col justify-between hover:shadow-xl transition"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {item.product?.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {item.product?.description}
                  </p>
                  <p className="text-md font-medium text-teal-700">
                    ${item.product?.price}
                  </p>
                </div>

                <div className="mt-4 flex justify-between gap-2">
                  <button
                    onClick={() => handleAddToCart(item.product)}
                    className="flex items-center gap-1 bg-teal-500 hover:bg-teal-600 text-white text-sm px-3 py-1 rounded-md"
                  >
                    <ShoppingCart size={16} /> Add to Cart
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
