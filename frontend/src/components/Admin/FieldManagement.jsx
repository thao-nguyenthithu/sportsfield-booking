// import React, { useEffect, useState } from "react";

// const FieldManagement = () => {
//   const [fields, setFields] = useState([]);
//   const [selectedField, setSelectedField] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     // Giả lập fetch dữ liệu
//     setFields([
//       { id: 1, name: "Sân bóng đá A", type: "Bóng đá", status: "Trống", image: "", branch: "Chi nhánh A" },
//       { id: 2, name: "Sân tennis B", type: "Tennis", status: "Đã đặt", image: "", branch: "Chi nhánh B" },
//     ]);
//   }, []);

//   const handleSave = (field) => {
//     if (field.id) {
//       setFields(fields.map((f) => (f.id === field.id ? field : f)));
//     } else {
//       setFields([...fields, { ...field, id: fields.length + 1 }]);
//     }
//     setShowForm(false);
//     setSelectedField(null);
//   };

//   const handleDelete = (id) => {
//     setFields(fields.filter((f) => f.id !== id));
//   };

//   const handleFileChange = (e) => {
//     if (selectedField) {
//       const file = e.target.files[0];
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setSelectedField({ ...selectedField, image: reader.result });
//       };
//       if (file) {
//         reader.readAsDataURL(file);
//       }
//     }
//   };

//   return (
//     <div className="p-4">
//       <div className="flex justify-between mb-4">
//         <h2 className="text-xl font-semibold text-[#4CAF50]">Quản lý sân</h2>
//         <button
//           className="bg-[#FF6A00] hover:bg-[#FF8C00] text-white py-2 px-4 rounded-lg"
//           onClick={() => setShowForm(true)}
//         >
//           Thêm sân
//         </button>
//       </div>
//       {showForm && (
//         <div className="bg-white p-4 rounded-lg mb-4 shadow-lg">
//           <input
//             className="w-full bg-[#F3F4F6] border px-4 py-2 rounded text-black mb-2"
//             placeholder="Tên sân"
//             value={selectedField?.name || ""}
//             onChange={(e) =>
//               setSelectedField({ ...selectedField, name: e.target.value })
//             }
//           />
//           <select
//             className="w-full bg-[#F3F4F6] border px-4 py-2 rounded text-black mb-2"
//             value={selectedField?.type || "Bóng đá"}
//             onChange={(e) =>
//               setSelectedField({ ...selectedField, type: e.target.value })
//             }
//           >
//             <option value="Bóng đá">Bóng đá</option>
//             <option value="Tennis">Tennis</option>
//             <option value="Futsal">Futsal</option>
//           </select>
//           <select
//             className="w-full bg-[#F3F4F6] border px-4 py-2 rounded text-black mb-2"
//             value={selectedField?.status || "Trống"}
//             onChange={(e) =>
//               setSelectedField({ ...selectedField, status: e.target.value })
//             }
//           >
//             <option value="Trống">Trống</option>
//             <option value="Đã đặt">Đã đặt</option>
//             <option value="Bảo trì">Bảo trì</option>
//           </select>
//           {/* Chọn chi nhánh */}
//           <select
//             className="w-full bg-[#F3F4F6] border px-4 py-2 rounded text-black mb-2"
//             value={selectedField?.branch || "Chi nhánh A"}
//             onChange={(e) =>
//               setSelectedField({ ...selectedField, branch: e.target.value })
//             }
//           >
//             <option value="Chi nhánh A">Chi nhánh A</option>
//             <option value="Chi nhánh B">Chi nhánh B</option>
//           </select>
//           {/* Hình ảnh */}
//           <input
//             type="file"
//             className="w-full bg-[#F3F4F6] border px-4 py-2 rounded text-black mb-2"
//             onChange={handleFileChange}
//           />
//           {selectedField?.image && (
//             <div className="mb-2">
//               <img
//                 src={selectedField.image}
//                 alt="Field"
//                 className="max-w-full h-auto rounded"
//               />
//             </div>
//           )}
//           <button
//             className="bg-[#FF6A00] hover:bg-[#FF8C00] text-white py-2 px-4 rounded-lg"
//             onClick={() => handleSave(selectedField || {})}
//           >
//             Lưu
//           </button>
//           <button
//             className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg ml-2"
//             onClick={() => setShowForm(false)}
//           >
//             Hủy
//           </button>
//         </div>
//       )}
//     <table className="w-full bg-white rounded-lg shadow-lg border border-[#4CAF50]">
//       <thead className="bg-[#b6f1b1]">
//         <tr className="border-b border-[#4CAF50]">
//           <th className="py-2 text-gray-600 text-center">ID</th>
//           <th className="py-2 text-gray-600 text-center">Tên sân</th>
//           <th className="py-2 text-gray-600 text-center">Hình ảnh</th> {/* Thêm cột Hình ảnh */}
//           <th className="py-2 text-gray-600 text-center">Loại sân</th>
//           <th className="py-2 text-gray-600 text-center">Trạng thái</th>
//           <th className="py-2 text-gray-600 text-center">Chi nhánh</th>
//           <th className="py-2 text-gray-600 text-center">Hành động</th>
//         </tr>
//       </thead>
//       <tbody>
//         {fields.map((field) => (
//           <tr key={field.id} className="border-b">
//             <td className="py-2 text-gray-800 text-center">{field.id}</td>
//             <td className="py-2 text-gray-800 text-center">{field.name}</td>
//             <td className="py-2 text-gray-800 text-center flex justify-center items-center">
//               {field.image ? (
//                 <img src={field.image} alt="Field" className="w-16 h-16 object-cover rounded" />
//               ) : (
//                 <span>Chưa có ảnh</span>
//               )}
//             </td> {/* Thêm cột Hình ảnh */}
//             <td className="py-2 text-gray-800 text-center">{field.type}</td>
//             <td className="py-2 text-gray-800 text-center">{field.status}</td>
//             <td className="py-2 text-gray-800 text-center">{field.branch}</td>
//             <td className="py-2 space-x-2 text-center">
//               <button
//                 className="bg-[#4CAF50] hover:bg-[#388E3C] text-white py-1 px-2 rounded-lg text-sm"
//                 onClick={() => {
//                   setShowForm(true);
//                   setSelectedField(field);
//                 }}
//               >
//                 Sửa
//               </button>
//               <button
//                 className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-lg text-sm"
//                 onClick={() => handleDelete(field.id)}
//               >
//                 Xóa
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>

//     </div>
//   );
// };

// export default FieldManagement;


import React, { useState } from "react";

const FieldManagement = ({ branches, setBranches, fields, setFields }) => {
  const [selectedField, setSelectedField] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSaveField = (field) => {
    if (field.id) {
      setFields(fields.map((f) => (f.id === field.id ? field : f)));
    } else {
      setFields([...fields, { ...field, id: fields.length + 1 }]);
    }
    setShowForm(false);
    setSelectedField(null);
  };

  const handleDeleteField = (id) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  // Hàm xử lý khi người dùng chọn ảnh
  const handleFileChange = (e) => {
    if (selectedField) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedField({ ...selectedField, image: reader.result });
        };
        reader.readAsDataURL(file);
      }
    }
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

      {/* Form thêm sân */}
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
          <select
            className="w-full bg-[#F3F4F6] border px-4 py-2 rounded text-black mb-2"
            value={selectedField?.branch || "Chi nhánh A"}
            onChange={(e) =>
              setSelectedField({ ...selectedField, branch: e.target.value })
            }
          >
            {branches.map((branch, index) => (
              <option key={index} value={branch.name}>
                {branch.name} {/* Render tên chi nhánh */}
              </option>
            ))}
          </select>

          {/* Thêm trường ảnh */}
          <input
            type="file"
            className="w-full bg-[#F3F4F6] border px-4 py-2 rounded text-black mb-2"
            onChange={handleFileChange}
          />
          {selectedField?.image && (
            <div className="mb-2">
              <img
                src={selectedField.image}
                alt="Field"
                className="max-w-full h-auto rounded"
              />
            </div>
          )}

          <button
            className="bg-[#FF6A00] hover:bg-[#FF8C00] text-white py-2 px-4 rounded-lg"
            onClick={() => handleSaveField(selectedField || {})}
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

      {/* Bảng danh sách sân */}
      <table className="w-full bg-white rounded-lg shadow-lg border border-[#4CAF50]">
        <thead className="bg-[#b6f1b1]">
          <tr className="border-b border-[#4CAF50]">
            <th className="py-2 text-gray-600 text-center">ID</th>
            <th className="py-2 text-gray-600 text-center">Tên sân</th>
            <th className="py-2 text-gray-600 text-center">Loại sân</th>
            <th className="py-2 text-gray-600 text-center">Trạng thái</th>
            <th className="py-2 text-gray-600 text-center">Chi nhánh</th>
            <th className="py-2 text-gray-600 text-center">Hình ảnh</th>
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
              <td className="py-2 text-gray-800 text-center">
                {/* Render tên chi nhánh thay vì cả đối tượng */}
                {field.branch}
              </td>
              <td className="py-2 text-gray-800 text-center flex justify-center items-center">
                {field.image ? (
                  <img
                    src={field.image}
                    alt="Field"
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  <span>Chưa có ảnh</span>
                )}
              </td>
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
                  onClick={() => handleDeleteField(field.id)}
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
