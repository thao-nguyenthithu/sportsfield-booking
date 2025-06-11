import React from "react";

const Sidebar = ({ setActiveSection }) => {
  return (
    <div className="w-64 h-screen bg-[#1E3A8A] text-white p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-2">
        <li
          className="hover:bg-[#3B82F6] p-2 rounded cursor-pointer"
          onClick={() => setActiveSection("Dashboard")}
        >
          Dashboard
        </li>
        <li
          className="hover:bg-[#3B82F6] p-2 rounded cursor-pointer"
          onClick={() => setActiveSection("Quản lý người dùng")}
        >
          Quản lý người dùng
        </li>
        <li
          className="hover:bg-[#3B82F6] p-2 rounded cursor-pointer"
          onClick={() => setActiveSection("Quản lý sân")}
        >
          Quản lý sân
        </li>
        <li
          className="hover:bg-[#3B82F6] p-2 rounded cursor-pointer"
          onClick={() => setActiveSection("Quản lý Manager")}
        >
          Quản lý Manager
        </li>
        <li
          className="hover:bg-[#3B82F6] p-2 rounded cursor-pointer"
          onClick={() => setActiveSection("Báo cáo")}
        >
          Báo cáo
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
