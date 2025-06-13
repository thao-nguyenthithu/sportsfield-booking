import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    staff: 0,
    fields: 0,
    revenue: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [filter, setFilter] = useState({
    day: "",
    month: "",
    year: new Date().getFullYear(),
  });
  const [activeDetail, setActiveDetail] = useState(null);

  // Cập nhật filter
  const handleFilterChange = (field, value) => {
    setFilter((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  // Lấy dữ liệu từ API
  const fetchData = async () => {
    // Xây dựng query params
    const queryParams = [];
    if (filter.day) queryParams.push(`day=${filter.day}`);
    if (filter.month) queryParams.push(`month=${filter.month}`);
    if (filter.year) queryParams.push(`year=${filter.year}`);

    const queryString = queryParams.length ? `?${queryParams.join('&')}` : "";

    try {
      const response = await fetch(`/api/statistics${queryString}`);
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats || {}); // Kiểm tra nếu 'stats' tồn tại trước khi cập nhật
        setChartData(data.chartData || []); // Kiểm tra nếu 'chartData' tồn tại trước khi cập nhật
      } else {
        console.error("Lỗi khi tải dữ liệu:", response.statusText);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  // Lấy dữ liệu khi filter thay đổi
  useEffect(() => {
    fetchData();
  }, [filter]);

  // Render chi tiết khi click vào mục
  const renderDetail = (key) => {
    switch (key) {
      case "users":
        return (
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-bold mb-4">Biểu đồ người dùng</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      case "staff":
        return (
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-bold mb-4">Biểu đồ số nhân viên</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="staff" fill="#FF6A00" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      case "fields":
        return (
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-bold mb-4">Biểu đồ số sân</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="fields" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      case "revenue":
        return (
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-bold mb-4">Biểu đồ doanh thu</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#FF6A00" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Lọc dữ liệu */}
      <div className="flex gap-4 items-center">
        <label className="text-sm">
          Ngày:
          <input
            type="number"
            className="ml-2 p-1 border rounded w-24"
            value={filter.day}
            onChange={(e) => handleFilterChange("day", e.target.value || "")}
            placeholder="Ngày"
          />
        </label>

        <label className="text-sm">
          Tháng:
          <select
            className="ml-2 p-1 border rounded"
            value={filter.month}
            onChange={(e) => handleFilterChange("month", e.target.value || "")}
          >
            <option value="">Chọn tháng</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          Năm:
          <input
            type="number"
            className="ml-2 p-1 border rounded w-24"
            value={filter.year}
            onChange={(e) => handleFilterChange("year", e.target.value)}
            placeholder="Năm"
          />
        </label>
      </div>

      {/* Các phần thống kê chính */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          onClick={() => setActiveDetail("users")}
          className="bg-white p-4 shadow rounded border-l-4 border-blue-500 cursor-pointer"
        >
          <h4 className="text-sm text-gray-600">Số người dùng</h4>
          <p className="text-2xl font-bold text-blue-700">{stats.users}</p>
        </div>
        <div
          onClick={() => setActiveDetail("staff")}
          className="bg-white p-4 shadow rounded border-l-4 border-yellow-500 cursor-pointer"
        >
          <h4 className="text-sm text-gray-600">Số nhân viên</h4>
          <p className="text-2xl font-bold text-yellow-600">{stats.staff}</p>
        </div>
        <div
          onClick={() => setActiveDetail("fields")}
          className="bg-white p-4 shadow rounded border-l-4 border-green-500 cursor-pointer"
        >
          <h4 className="text-sm text-gray-600">Số sân</h4>
          <p className="text-2xl font-bold text-green-600">{stats.fields}</p>
        </div>
        <div
          onClick={() => setActiveDetail("revenue")}
          className="bg-white p-4 shadow rounded border-l-4 border-red-500 cursor-pointer"
        >
          <h4 className="text-sm text-gray-600">Doanh thu</h4>
          <p className="text-2xl font-bold text-red-600">
            {stats.revenue.toLocaleString()} VNĐ
          </p>
        </div>
      </div>

      {/* Hiển thị chi tiết theo mục đã click */}
      {activeDetail && renderDetail(activeDetail)}
    </div>
  );
};

export default Dashboard;
