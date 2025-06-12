// import React, { useEffect, useState } from "react";

// const ManagerManagement = () => {
//   const [managers, setManagers] = useState([]);
//   const [selectedManager, setSelectedManager] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     // Giả lập fetch dữ liệu
//     setManagers([
//       { id: 1, email: "manager1@example.com", branch: "Chi nhánh A" },
//     ]);
//   }, []);

//   const handleSave = (manager) => {
//     if (manager.id) {
//       setManagers(managers.map((m) => (m.id === manager.id ? manager : m)));
//     } else {
//       setManagers([...managers, { ...manager, id: managers.length + 1 }]);
//     }
//     setShowForm(false);
//     setSelectedManager(null);
//   };

//   const handleDelete = (id) => {
//     setManagers(managers.filter((m) => m.id !== id));
//   };

//   return (
//     <div className="p-4">
//       <div className="flex justify-between mb-4">
//         <h2 className="text-xl font-semibold text-[#4CAF50]">Quản lý Manager</h2>
//         <button
//           className="bg-[#FF6A00] hover:bg-[#FF8C00] text-white py-2 px-4 rounded-lg"
//           onClick={() => setShowForm(true)}
//         >
//           Thêm Manager
//         </button>
//       </div>
//       {showForm && (
//         <div className="bg-white p-4 rounded-lg mb-4 shadow-lg">
//           <input
//             className="w-full bg-[#F3F4F6] border px-4 py-2 rounded text-black mb-2"
//             placeholder="Email"
//             value={selectedManager?.email || ""}
//             onChange={(e) =>
//               setSelectedManager({ ...selectedManager, email: e.target.value })
//             }
//           />
//           <input
//             className="w-full bg-[#F3F4F6] border px-4 py-2 rounded text-black mb-2"
//             placeholder="Chi nhánh"
//             value={selectedManager?.branch || ""}
//             onChange={(e) =>
//               setSelectedManager({ ...selectedManager, branch: e.target.value })
//             }
//           />
//           <button
//             className="bg-[#FF6A00] hover:bg-[#FF8C00] text-white py-2 px-4 rounded-lg"
//             onClick={() => handleSave(selectedManager || {})}
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
//       <table className="w-full bg-white rounded-lg shadow-lg border border-[#4CAF50]">
//         <thead className="bg-[#b6f1b1]"> 
//           <tr className="border-b border-[#4CAF50]">
//             <th className="py-2 text-gray-600 text-center">ID</th>
//             <th className="py-2 text-gray-600 text-center">Email</th>
//             <th className="py-2 text-gray-600 text-center">Chi nhánh</th>
//             <th className="py-2 text-gray-600 text-center">Hành động</th>
//           </tr>
//         </thead>
//         <tbody>
//           {managers.map((manager) => (
//             <tr key={manager.id} className="border-b">
//               <td className="py-2 text-gray-800 text-center">{manager.id}</td>
//               <td className="py-2 text-gray-800 text-center">{manager.email}</td>
//               <td className="py-2 text-gray-800 text-center">{manager.branch}</td>
//               <td className="py-2 space-x-2 text-center">
//                 <button
//                   className="bg-[#4CAF50] hover:bg-[#388E3C] text-white py-1 px-2 rounded-lg text-sm"
//                   onClick={() => {
//                     setShowForm(true);
//                     setSelectedManager(manager);
//                   }}
//                 >
//                   Sửa
//                 </button>
//                 <button
//                   className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-lg text-sm"
//                   onClick={() => handleDelete(manager.id)}
//                 >
//                   Xóa
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ManagerManagement;
import React, { useEffect, useState } from "react";
import axios from "axios"; // Giả sử bạn sử dụng axios để fetch API

const ManagerManagement = () => {
  const [managers, setManagers] = useState([]);
  const [branches, setBranches] = useState([]); // Dữ liệu chi nhánh thực tế
  const [selectedManager, setSelectedManager] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Giả lập API fetch danh sách Manager
    setManagers([
      { id: 1, email: "manager1@example.com", branchId: 1 },
      { id: 2, email: "manager2@example.com", branchId: 2 },
    ]);

    // Fetch dữ liệu chi nhánh từ API (hoặc từ state quản lý chi nhánh)
    axios
      .get("/api/branches")  // Đường dẫn API để lấy chi nhánh
      .then((response) => {
        setBranches(response.data); // Dữ liệu chi nhánh trả về từ API
      })
      .catch((error) => {
        console.error("Error fetching branches", error);
      });
  }, []);

  const handleSave = (manager) => {
    if (manager.id) {
      setManagers(
        managers.map((m) =>
          m.id === manager.id ? { ...manager, branchId: manager.branchId } : m
        )
      );
    } else {
      setManagers([
        ...managers,
        { ...manager, id: managers.length + 1, branchId: manager.branchId },
      ]);
    }
    setShowForm(false);
    setSelectedManager(null);
  };

  const handleDelete = (id) => {
    setManagers(managers.filter((m) => m.id !== id));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold text-[#4CAF50]">Quản lý Manager</h2>
        <button
          className="bg-[#FF6A00] hover:bg-[#FF8C00] text-white py-2 px-4 rounded-lg"
          onClick={() => setShowForm(true)}
        >
          Thêm Manager
        </button>
      </div>

      {/* Form thêm Manager */}
      {showForm && (
        <div className="bg-white p-4 rounded-lg mb-4 shadow-lg">
          <input
            className="w-full bg-[#F3F4F6] border px-4 py-2 rounded text-black mb-2"
            placeholder="Email"
            value={selectedManager?.email || ""}
            onChange={(e) =>
              setSelectedManager({ ...selectedManager, email: e.target.value })
            }
          />
          <select
            className="w-full bg-[#F3F4F6] border px-4 py-2 rounded text-black mb-2"
            value={selectedManager?.branchId || ""}
            onChange={(e) =>
              setSelectedManager({ ...selectedManager, branchId: e.target.value })
            }
          >
            <option value="" disabled>
              Chọn chi nhánh
            </option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
          <button
            className="bg-[#FF6A00] hover:bg-[#FF8C00] text-white py-2 px-4 rounded-lg"
            onClick={() => handleSave(selectedManager || {})}
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

      {/* Bảng danh sách Manager */}
      <table className="w-full bg-white rounded-lg shadow-lg border border-[#4CAF50]">
        <thead className="bg-[#b6f1b1]">
          <tr className="border-b border-[#4CAF50]">
            <th className="py-2 text-gray-600 text-center">ID</th>
            <th className="py-2 text-gray-600 text-center">Email</th>
            <th className="py-2 text-gray-600 text-center">Chi nhánh</th>
            <th className="py-2 text-gray-600 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {managers.map((manager) => (
            <tr key={manager.id} className="border-b">
              <td className="py-2 text-gray-800 text-center">{manager.id}</td>
              <td className="py-2 text-gray-800 text-center">{manager.email}</td>
              <td className="py-2 text-gray-800 text-center">
                {/* Hiển thị tên chi nhánh từ branchId */}
                {branches.find((branch) => branch.id === manager.branchId)?.name ||
                  "Chưa có chi nhánh"}
              </td>
              <td className="py-2 space-x-2 text-center">
                <button
                  className="bg-[#4CAF50] hover:bg-[#388E3C] text-white py-1 px-2 rounded-lg text-sm"
                  onClick={() => {
                    setShowForm(true);
                    setSelectedManager(manager);
                  }}
                >
                  Sửa
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-lg text-sm"
                  onClick={() => handleDelete(manager.id)}
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

export default ManagerManagement;
