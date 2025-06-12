import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    fields: 0,
    revenue: 0,
  });

  useEffect(() => {
    // Giả lập fetch dữ liệu
    setStats({ users: 50, fields: 30, revenue: 5000000 });
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="bg-white p-4 rounded-lg shadow-lg border border-[#4CAF50]">
        <h3 className="text-sm text-[#4CAF50] font-bold">Số người dùng</h3>
        <p className="text-2xl font-bold text-[#FF6A00]">{stats.users}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-lg border border-[#4CAF50]">
        <h3 className="text-sm text-[#4CAF50] font-bold">Số sân</h3>
        <p className="text-2xl font-bold text-[#FF6A00]">{stats.fields}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-lg border border-[#4CAF50]">
        <h3 className="text-sm text-[#4CAF50] font-bold">Doanh thu</h3>
        <p className="text-2xl font-bold text-[#FF6A00]">{stats.revenue} VNĐ</p>
      </div>
    </div>
  );
};

export default Dashboard;
