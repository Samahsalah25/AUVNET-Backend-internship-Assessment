import { useEffect, useState } from "react";
import axios from "../services/api";

const CategorySelector = ({ onSelect }) => {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    fetchCategories(null, 0); // Fetch root categories
  }, []);

  const fetchCategories = async (parentId, level) => {
    try {
      const res = await axios.get(`/api/categories?parent=${parentId}`);
      
      const newLevel = {
        categories: res.data,
        selected: "",
      };

      setLevels((prevLevels) => {
        const updated = [...prevLevels.slice(0, level)];
        return [...updated, newLevel];
      });
    } catch (err) {
      console.error("❌ Failed to fetch categories", err);
    }
  };

  const handleChange = (e, level) => {
    const selectedId = e.target.value;

    setLevels((prevLevels) => {
      const updated = [...prevLevels.slice(0, level + 1)];
      updated[level] = {
        ...updated[level],
        selected: selectedId,
      };
      return updated;
    });

    onSelect(selectedId);

    if (selectedId) {
      fetchCategories(selectedId, level + 1);
    }
  };

  return (
    <div className="space-y-4">
      {levels.map((lvl, index) => (
        <div key={index} className="w-full">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            {index === 0 ? "Select Main Category" : `Select Subcategory Level ${index}`}
          </label>
          <select
            value={lvl.selected}
            onChange={(e) => handleChange(e, index)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Select --</option>
            {lvl.categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default CategorySelector;
