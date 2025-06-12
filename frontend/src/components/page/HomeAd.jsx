import React, { useState, useEffect } from "react";
import Sidebar from "../Admin/Sidebar";
import Dashboard from "../Admin/Dashboard";
import UserManagement from "../Admin/UserManagement";
import FieldManagement from "../Admin/FieldManagement";
import ManagerManagement from "../Admin/ManagerManagement";
import SearchBar from "../Admin/SearchBar";
import ReportSection from "../Admin/ReportSection";
import Alert from "../Admin/Alert";
import BranchManagement from "../Admin/BranchManagement";

const HomeAd = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);

    // Lấy dữ liệu chi nhánh từ localStorage khi khởi tạo
  const [branches, setBranches] = useState(() => {
    const savedBranches = localStorage.getItem("branches");
    return savedBranches ? JSON.parse(savedBranches) : [];
  });

  // Lấy dữ liệu sân từ localStorage khi khởi tạo
  const [fields, setFields] = useState(() => {
    const savedFields = localStorage.getItem("fields");
    return savedFields ? JSON.parse(savedFields) : [];
  });

  const [managers, setManagers] = useState(() => {
    const savedManagers = localStorage.getItem("managers");
    return savedManagers ? JSON.parse(savedManagers) : [];
  });

  useEffect(() => {
    // Lưu lại dữ liệu chi nhánh vào localStorage khi có sự thay đổi
    localStorage.setItem("branches", JSON.stringify(branches));

    // Lưu lại dữ liệu sân vào localStorage khi có sự thay đổi
    localStorage.setItem("fields", JSON.stringify(fields));
  }, [branches, fields]);

  useEffect(() => {
    // Lưu lại dữ liệu chi nhánh và manager vào localStorage khi có sự thay đổi
    localStorage.setItem("branches", JSON.stringify(branches));
    localStorage.setItem("managers", JSON.stringify(managers));
  }, [branches, managers]);

  const renderSection = () => {
    switch (activeSection) {
      case "Dashboard":
        return <Dashboard />;
      case "Quản lý người dùng":
        return <UserManagement />;
      case "Quản lý sân":
        return <FieldManagement branches={branches} setBranches={setBranches} fields={fields} setFields={setFields}/>;
      case "Quản lý chi nhánh":
        return <BranchManagement branches={branches} setBranches={setBranches} />;
      case "Quản lý Manager":
        return <ManagerManagement branches={branches} setBranches={setBranches} managers={managers} setManagers={setManagers} />;
      case "Báo cáo":
        return <ReportSection />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F3F4F6]">
      {/* Sidebar */}
      <Sidebar setActiveSection={setActiveSection} />
      
      {/* Content */}
      <div className="flex-1 p-6 bg-white">
        <SearchBar onSearch={setSearchQuery} />
        {alertMessage && <Alert message={alertMessage} />}
        
        {/* Render Section */}
        {renderSection()}
      </div>
    </div>
  );
};

export default HomeAd;
