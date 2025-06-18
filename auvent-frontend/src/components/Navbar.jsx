import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-teal-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold tracking-wide"> AUVNET ELECTRIC  ⚡</h1>

      <div className="flex gap-4 items-center">
        <Link to="/products" className="hover:text-teal-200 transition">Products</Link>

{user?.type === "admin" && (
  <Link to="/admins">Admins</Link>
)}

        {user && (
          <>
           {user?.type !== "admin" && (
  <Link to="/wishlist">Wishlist</Link>
)}

{user?.type === "admin" && (
  <Link to="/users">Users</Link>
)}
{user?.type === "admin" && (
  <Link to="/categories">Categories</Link>
)}
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 bg-slate-700 text-white rounded-md hover:bg-slate-800 transition"
            >
              Logout
            </button>
          </>
        )}

        {!user && (
          <Link
            to="/login"
            className="bg-white text-teal-600 px-3 py-1.5 rounded-md hover:bg-gray-100 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
