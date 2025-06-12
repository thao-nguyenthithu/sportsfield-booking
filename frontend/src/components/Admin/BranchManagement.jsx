import React, { useState } from "react";

const BranchManagement = ({ branches, setBranches }) => {
  const [newBranch, setNewBranch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showForm, setShowForm] = useState(false); // Quản lý việc hiển thị form
  const [editingBranch, setEditingBranch] = useState(null); // Quản lý chi nhánh đang sửa

  const handleAddBranch = () => {
    if (!newBranch.trim()) {
      setErrorMessage("Tên chi nhánh không thể trống!");
      return;
    }

    // Kiểm tra xem chi nhánh đã tồn tại chưa
    if (branches.some((branch) => branch.name === newBranch)) {
      setErrorMessage("Chi nhánh này đã tồn tại!");
      return;
    }

    const newBranchObj = {
      name: newBranch,
      id: branches.length + 1,
    };

    setBranches([...branches, newBranchObj]);
    setNewBranch("");
    setErrorMessage("");
    setShowForm(false); // Ẩn form sau khi thêm chi nhánh
  };

  const handleDeleteBranch = (branchToDelete) => {
    setBranches(branches.filter((branch) => branch.id !== branchToDelete.id));
  };

  const handleEditBranch = (branchToEdit) => {
    setNewBranch(branchToEdit.name);
    setEditingBranch(branchToEdit);
    setShowForm(true); // Hiển thị form khi chỉnh sửa
  };

  const handleUpdateBranch = () => {
    if (!newBranch.trim()) {
      setErrorMessage("Tên chi nhánh không thể trống!");
      return;
    }

    // Kiểm tra xem tên chi nhánh đã tồn tại chưa trong quá trình chỉnh sửa
    if (branches.some((branch) => branch.name === newBranch && branch.id !== editingBranch.id)) {
      setErrorMessage("Chi nhánh này đã tồn tại!");
      return;
    }

    const updatedBranches = branches.map((branch) =>
      branch.id === editingBranch.id
        ? { ...branch, name: newBranch }
        : branch
    );

    setBranches(updatedBranches);
    setNewBranch("");
    setErrorMessage("");
    setShowForm(false);
    setEditingBranch(null); // Reset khi chỉnh sửa xong
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold text-[#4CAF50]">Quản lý Chi nhánh</h2>
        <button
          className="bg-[#FF6A00] hover:bg-[#FF8C00] text-white py-2 px-4 rounded-lg"
          onClick={() => setShowForm(true)} // Hiển thị form khi nhấn nút
        >
          Thêm chi nhánh
        </button>
      </div>

      {/* Hiển thị form khi showForm = true */}
      {showForm && (
        <div className="bg-white p-4 rounded-lg mb-4 shadow-lg">
          <input
            type="text"
            className="w-full bg-[#F3F4F6] border px-4 py-2 rounded text-black mb-2"
            placeholder="Tên chi nhánh mới"
            value={newBranch}
            onChange={(e) => setNewBranch(e.target.value)}
          />
          {editingBranch ? (
            <button
              className="bg-[#FF6A00] hover:bg-[#FF8C00] text-white py-2 px-4 rounded-lg"
              onClick={handleUpdateBranch}
            >
              Cập nhật
            </button>
          ) : (
            <button
              className="bg-[#FF6A00] hover:bg-[#FF8C00] text-white py-2 px-4 rounded-lg"
              onClick={handleAddBranch}
            >
              Lưu
            </button>
          )}
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg ml-2"
            onClick={() => setShowForm(false)} // Ẩn form khi bấm hủy
          >
            Hủy
          </button>
        </div>
      )}

      {/* Hiển thị lỗi nếu có */}
      {errorMessage && (
        <div className="bg-red-500 text-white p-2 rounded mb-4">{errorMessage}</div>
      )}

      {/* Bảng danh sách chi nhánh */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold">Danh sách chi nhánh:</h3>
        <table className="min-w-full table- ">
          <thead className="bg-[#b6f1b1]">
            <tr className="border-b border-[#4CAF50]">
              <th className="py-2 px-4 text-left">Tên chi nhánh</th>
              <th className="py-2 px-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch) => (
              <tr key={branch.id} className="border-b">
                <td className="py-2 px-4">{branch.name}</td>
                <td className="py-2 space-x-2 text-center">
                  <button
                    className="bg-[#4CAF50] hover:bg-[#388E3C] text-white py-1 px-2 rounded-lg text-sm"
                    onClick={() => handleEditBranch(branch)} // Chỉnh sửa chi nhánh
                  >
                    Sửa
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-lg text-sm"
                    onClick={() => handleDeleteBranch(branch)} // Xóa chi nhánh
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BranchManagement;
