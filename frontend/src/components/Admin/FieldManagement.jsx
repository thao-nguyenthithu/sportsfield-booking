import React, { useEffect, useState } from "react";

const FieldManagement = () => {
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Giả lập fetch dữ liệu
    setFields([
      { id: 1, name: "Sân bóng đá A", type: "Bóng đá", status: "Trống" },
      { id: 2, name: "Sân tennis B", type: "Tennis", status: "Đã đặt" },
    ]);
  }, []);

  const handleSave = (field) => {
    if (field.id) {
      setFields(fields.map((f) => (f.id === field.id ? field : f)));
    } else {
      setFields([...fields, { ...field, id: fields.length + 1 }]);
    }
    setShowForm(false);
    setSelectedField(null);
  };

  const handleDelete = (id) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold text-[#4CAF50]">Quản lý sân</h2>
        <button
          className="bg-[#FF6A00] hover:bg-[#FF8C00] text-white py-2 px-4 rounded-lg"
          onClick={() => setShowForm(true)}
        >
          Thêm sân
        </button>
      </div>
      {showForm && (
        <div className="bg-white p-4 rounded-lg mb-4 shadow-lg">
          <input
            className="w-full bg-[#F3F4F6] border px-4 py-2 rounded text-black mb-2"
            placeholder="Tên sân"
            value={selectedField?.name || ""}
            onChange={(e) =>
              setSelectedField({ ...selectedField, name: e.target.value })
            }
          />
          <select
            className="w-full bg-[#F3F4F6] border px-4 py-2 rounded text-black mb-2"
            value={selectedField?.type || "Bóng đá"}
            onChange={(e) =>
              setSelectedField({ ...selectedField, type: e.target.value })
            }
          >
            <option value="Bóng đá">Bóng đá</option>
            <option value="Tennis">Tennis</option>
            <option value="Futsal">Futsal</option>
          </select>
          <select
            className="w-full bg-[#F3F4F6] border px-4 py-2 rounded text-black mb-2"
            value={selectedField?.status || "Trống"}
            onChange={(e) =>
              setSelectedField({ ...selectedField, status: e.target.value })
            }
          >
            <option value="Trống">Trống</option>
            <option value="Đã đặt">Đã đặt</option>
            <option value="Bảo trì">Bảo trì</option>
          </select>
          <button
            className="bg-[#FF6A00] hover:bg-[#FF8C00] text-white py-2 px-4 rounded-lg"
            onClick={() => handleSave(selectedField || {})}
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
            <th className="py-2 text-gray-600 text-center">Tên sân</th>
            <th className="py-2 text-gray-600 text-center">Loại sân</th>
            <th className="py-2 text-gray-600 text-center">Trạng thái</th>
            <th className="py-2 text-gray-600 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => (
            <tr key={field.id} className="border-b">
              <td className="py-2 text-gray-800 text-center">{field.id}</td>
              <td className="py-2 text-gray-800 text-center">{field.name}</td>
              <td className="py-2 text-gray-800 text-center">{field.type}</td>
              <td className="py-2 text-gray-800 text-center">{field.status}</td>
              <td className="py-2 space-x-2 text-center">
                <button
                  className="bg-[#4CAF50] hover:bg-[#388E3C] text-white py-1 px-2 rounded-lg text-sm"
                  onClick={() => {
                    setShowForm(true);
                    setSelectedField(field);
                  }}
                >
                  Sửa
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-lg text-sm"
                  onClick={() => handleDelete(field.id)}
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

export default FieldManagement;
