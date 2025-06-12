import React, { useEffect, useState } from "react";
import bcrypt from "bcryptjs";

const generateRandomPassword = () => {
  const length = 8;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

const isValidEmail = (email) => {
  // Regex kiểm tra định dạng email cơ bản
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({ email: "", role: "User" });
  const [showForm, setShowForm] = useState(false);
  const [newPasswordInfo, setNewPasswordInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setUsers([
      { id: 1, email: "admin@example.com", role: "Admin", password: "abc12345" },
      { id: 2, email: "manager@example.com", role: "Manager", password: "xyz12345" },
      { id: 3, email: "user@example.com", role: "User", password: "qwe78901" },
    ]);
  }, []);

  const handleSave = async (user) => {
    if (!isValidEmail(user.email)) {
      setErrorMessage("Email không đúng định dạng.");
      return;
    }

    setErrorMessage("");

    if (user.id) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      const rawPassword = generateRandomPassword();
      const hashedPassword = await bcrypt.hash(rawPassword, 10);

      const newUser = {
        ...user,
        id: users.length + 1,
        password: rawPassword, // Dùng password gốc để hiển thị
      };

      setUsers([...users, newUser]);
      setNewPasswordInfo({ email: user.email, password: rawPassword });
    }

    setShowForm(false);
    setSelectedUser({ email: "", role: "User" });
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Đã sao chép mật khẩu vào clipboard!");
  };

  return (
    <div className="p-6 bg-[#F9FAFB]">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold text-[#4CAF50]">Quản lý người dùng</h2>
        <button
          className="bg-[#FF6A00] hover:bg-[#FF8C00] text-white py-2 px-4 rounded-lg"
          onClick={() => {
            setSelectedUser({ email: "", role: "User" });
            setShowForm(true);
            setNewPasswordInfo(null);
            setErrorMessage("");
          }}
        >
          Thêm người dùng
        </button>
      </div>

      {errorMessage && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-800 rounded">
          {errorMessage}
        </div>
      )}

      {newPasswordInfo && (
        <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded">
          <p><strong>Người dùng mới:</strong> {newPasswordInfo.email}</p>
          <p><strong>Mật khẩu:</strong> {newPasswordInfo.password}</p>
          <button
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
            onClick={() => copyToClipboard(newPasswordInfo.password)}
          >
            Sao chép mật khẩu
          </button>
        </div>
      )}

      {showForm && (
        <div className="bg-white p-4 rounded-lg mb-4 shadow-lg">
          <input
            className="w-full bg-[#F3F4F6] border px-4 py-2 rounded text-black mb-2"
            placeholder="Email"
            value={selectedUser?.email || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, email: e.target.value })
            }
          />
          <select
            className="w-full bg-[#F3F4F6] border px-4 py-2 rounded text-black mb-2"
            value={selectedUser?.role || "User"}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, role: e.target.value })
            }
          >
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="User">User</option>
          </select>
          <button
            className="bg-[#FF6A00] hover:bg-[#FF8C00] text-white py-2 px-4 rounded-lg"
            onClick={() => handleSave(selectedUser)}
          >
            Lưu
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg ml-2"
            onClick={() => setShowForm(false)}
          >
            Hủy
          </button>
        </div>
      )}

      <table className="w-full bg-white rounded-lg shadow-lg border border-[#4CAF50]">
        <thead className="bg-[#b6f1b1]">
          <tr className="border-b border-[#4CAF50]">
            <th className="py-2 text-gray-600 text-center">ID</th>
            <th className="py-2 text-gray-600 text-center">Email</th>
            <th className="py-2 text-gray-600 text-center">Quyền</th>
            <th className="py-2 text-gray-600 text-center">Mật khẩu</th>
            <th className="py-2 text-gray-600 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="py-2 text-gray-800 text-center">{user.id}</td>
              <td className="py-2 text-gray-800 text-center">{user.email}</td>
              <td className="py-2 text-gray-800 text-center">{user.role}</td>
              <td className="py-2 text-gray-800 text-center">{user.password}</td>
              <td className="py-2 space-x-2 text-center">
                <button
                  className="bg-[#4CAF50] hover:bg-[#388E3C] text-white py-1 px-2 rounded-lg text-sm"
                  onClick={() => {
                    setSelectedUser(user);
                    setShowForm(true);
                    setNewPasswordInfo(null);
                    setErrorMessage("");
                  }}
                >
                  Sửa
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-lg text-sm"
                  onClick={() => handleDelete(user.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
