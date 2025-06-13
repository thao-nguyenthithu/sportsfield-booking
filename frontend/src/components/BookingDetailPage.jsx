import React from 'react';


const BookingDetailPage = ({ id }) => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lịch chọn ngày */}
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-2 text-lg">Chọn ngày</h2>
          <input type="date" className="w-full p-2 border rounded" />
        </div>

        {/* Thông tin sân */}
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <img
            src={`https://via.placeholder.com/400x200?text=Field+${id}`}
            alt="Field"
            className="w-full h-40 object-cover rounded"
          />
          <h2 className="text-xl font-bold mt-4">Field ID: {id}</h2>
          <p className="text-gray-600">Địa chỉ, loại sân, giá,...</p>

          {/* Các khung giờ */}
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2">Khung giờ khả dụng:</h3>
            <div className="flex flex-wrap gap-2">
              {["09:00 AM", "10:00 AM", "03:00 PM", "05:00 PM"].map((slot, idx) => (
                <button key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200">
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <button className="mt-6 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
            Xác nhận đặt sân
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailPage;
