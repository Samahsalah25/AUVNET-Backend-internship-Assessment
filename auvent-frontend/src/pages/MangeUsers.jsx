// UsersTable.jsx
import { useEffect, useState } from "react";
import axios from "../services/api";
import { Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/user/users");
        const normalUsers = res.data.filter(u => u.type === "user");
        setUsers(normalUsers);
      } catch (err) {
        toast.error("Failed to load users");
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/user/${id}`);
      setUsers(users.filter((u) => u._id !== id));
      toast.success("User deleted");
    } catch {
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">👥 Users</h2>
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
          {users.map((u) => (
            <tr key={u._id} className="border-b hover:bg-gray-50">
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
               <td className="p-3">{u.userName}</td>
              <td className="p-3">
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

export default Users;
