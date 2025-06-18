// AdminsTable.jsx
import { useEffect, useState } from "react";
import axios from "../services/api";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const AdminsTable = () => {
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();

 useEffect(() => {
  const fetchAdmins = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const res = await axios.get("/api/user/admins");
      const onlyAdmins = res.data.filter(
        (u) => u.type === "admin" && u._id !== currentUser.id
      );
      setAdmins(onlyAdmins);
    } catch (err) {
      toast.error("Failed to load admins");
    }
  };
  fetchAdmins();
}, []);


  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/user/${id}`);
      setAdmins(admins.filter((u) => u._id !== id));
      toast.success("Admin deleted");
    } catch {
      toast.error("Failed to delete admin");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-admin/${id}`);
  };

  const handleAdd = () => {
    navigate("/add-admin");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">🛡️ Admins</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-1 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          <Plus size={16} /> Add Admin
        </button>
      </div>

      <table className="w-full text-left bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
              <th className="p-3">userName</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((u) => (
            <tr key={u._id} className="border-b hover:bg-gray-50">
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
                <td className="p-3">{u.userName}</td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => handleEdit(u._id)}
                  className="text-white bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(u._id)}
                  className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default AdminsTable;
