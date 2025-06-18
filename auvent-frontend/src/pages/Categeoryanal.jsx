import { useEffect, useState } from "react";
import axios from "../services/api";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

const AdminiCategories = () => {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", parent: null, id: null });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/categories/all");
      setCategories(res.data);
    } catch {
      toast.error("Failed to load categories");
    }
  };

  const getSubCategories = (parentId) =>
    categories.filter((cat) => cat.parent?._id === parentId);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/categories/${id}`);
      toast.success("Category deleted");
      fetchCategories();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleOpenAddSub = (parentId) => {
    setForm({ name: "", parent: parentId, id: null });
    setEditMode(false);
    setModalOpen(true);
  };

  const handleOpenEdit = (category) => {
    setForm({
      name: category.name,
      parent: category.parent?._id || null,
      id: category._id,
    });
    setEditMode(true);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.patch(`/api/categories/${form.id}`, {
          name: form.name,
          parent: form.parent,
        });
        toast.success("Category updated");
      } else {
        await axios.post("/api/categories", {
          name: form.name,
          parent: form.parent,
        });
        toast.success("Category added");
      }
      setModalOpen(false);
      fetchCategories();
    } catch {
      toast.error("Operation failed");
    }
  };

  const renderCategory = (category, level = 0) => {
    const subCats = getSubCategories(category._id);
    const isMain = level === 0;

    return (
      <div
        key={category._id}
        className="mt-3"
        style={{
          marginLeft: `${level * 20}px`,
          backgroundColor: isMain ? "#f0fdfa" : "#f9fafb",
          border: `1px solid ${isMain ? "#14b8a6" : "#d1d5db"}`,
          borderRadius: "8px",
          padding: "12px 16px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <div className="flex justify-between items-center">
          <span
            className={`font-semibold ${
              isMain ? "text-teal-700" : "text-gray-700"
            }`}
          >
            {category.name}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleOpenAddSub(category._id)}
              className="bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 text-sm"
              title="Add Subcategory"
            >
              <Plus size={14} />
            </button>
            <button
              onClick={() => handleOpenEdit(category)}
              className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded hover:bg-yellow-200 text-sm"
              title="Edit"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => handleDelete(category._id)}
              className="bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 text-sm"
              title="Delete"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
        <div className="mt-2">
          {subCats.map((sub) => renderCategory(sub, level + 1))}
        </div>
      </div>
    );
  };

  const mainCategories = categories.filter((cat) => !cat.parent);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">📂 Categories</h2>
        <button
          onClick={() => {
            setForm({ name: "", parent: null, id: null });
            setEditMode(false);
            setModalOpen(true);
          }}
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          <Plus size={16} className="inline-block mr-1" />
          Add Main Category
        </button>
      </div>

      <div>{mainCategories.map((main) => renderCategory(main))}</div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              {editMode ? "✏️ Edit Category" : "➕ Add Category"}
            </h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Category name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring focus:border-teal-500"
                required
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                >
                  {editMode ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default AdminiCategories;
