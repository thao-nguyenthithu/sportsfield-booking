import React, { useEffect, useState } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Giả lập fetch dữ liệu
    setUsers([
      { id: 1, email: "admin@example.com", role: "Admin" },
      { id: 2, email: "manager@example.com", role: "Manager" },
      { id: 3, email: "user@example.com", role: "User" },
    ]);
  }, []);

  const handleSave = (user) => {
    if (user.id) {
      // Cập nhật
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      // Thêm mới
      setUsers([...users, { ...user, id: users.length + 1 }]);
    }
    setShowForm(false);
    setSelectedUser(null);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="p-6 bg-[#F9FAFB]">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold text-[#4CAF50]">Quản lý người dùng</h2>
        <button
          className="bg-[#FF6A00] hover:bg-[#FF8C00] text-white py-2 px-4 rounded-lg"
          onClick={() => setShowForm(true)}
        >
          Thêm người dùng
        </button>
      </div>
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
            onClick={() => handleSave(selectedUser || {})}
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
            <th className="py-2 text-gray-600 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="py-2 text-gray-800 text-center">{user.id}</td>
              <td className="py-2 text-gray-800 text-center">{user.email}</td>
              <td className="py-2 text-gray-800 text-center">{user.role}</td>
              <td className="py-2 space-x-2 text-center">
                <button
                  className="bg-[#4CAF50] hover:bg-[#388E3C] text-white py-1 px-2 rounded-lg text-sm"
                  onClick={() => {
                    setShowForm(true);
                    setSelectedUser(user);
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
