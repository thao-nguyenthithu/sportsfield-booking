import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";

const ReportSection = () => {
  const [reports, setReports] = useState([]);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Giả lập fetch dữ liệu
    setReports([
      { category: "Doanh thu", value: 5000000 },
      { category: "Lượt đặt", value: 30 },
      { category: "Sân trống", value: 20 },
    ]);
  }, []);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: reports.map((r) => r.category),
        datasets: [
          {
            data: reports.map((r) => r.value),
            backgroundColor: ["#3B82F6", "#10B981", "#F97316"],
            borderColor: "#1E3A8A",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom", labels: { color: "#FFFFFF" } },
        },
      },
    });
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [reports]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-[#4CAF50]">Báo cáo</h2>
      <div className="w-full h-64">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default ReportSection;