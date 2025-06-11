import React, { useState } from "react";
import Sidebar from "../Admin/Sidebar";
import Dashboard from "../Admin/Dashboard";
import UserManagement from "../Admin/UserManagement";
import FieldManagement from "../Admin/FieldManagement";
import ManagerManagement from "../Admin/ManagerManagement";
import SearchBar from "../Admin/SearchBar";
import ReportSection from "../Admin/ReportSection";
import Alert from "../Admin/Alert";

const HomeAd = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);

  const renderSection = () => {
    switch (activeSection) {
      case "Dashboard":
        return <Dashboard />;
      case "Quản lý người dùng":
        return <UserManagement />;
      case "Quản lý sân":
        return <FieldManagement />;
      case "Quản lý Manager":
        return <ManagerManagement />;
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
