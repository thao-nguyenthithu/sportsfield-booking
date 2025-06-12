import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookingPage() {
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [date, setDate] = useState('');
  const [sportType, setSportType] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/fields')
      .then(res => setFields(res.data))
      .catch(err => console.error('Error loading fields:', err));
  }, []);

  const filteredFields = fields.filter(field =>
    (!sportType || field.type === sportType) &&
    (!location || field.location === location)
  );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Đặt Sân Thể Thao</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Bộ lọc */}
        <div className="col-span-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Bộ lọc tìm kiếm</h2>

          <label className="block mb-2 text-sm font-medium text-gray-600">Loại sân</label>
          <select
            className="w-full p-2 mb-4 border rounded"
            value={sportType}
            onChange={e => setSportType(e.target.value)}
          >
            <option value="">Tất cả</option>
            <option value="Football">Bóng đá</option>
            <option value="Tennis">Tennis</option>
          </select>

          <label className="block mb-2 text-sm font-medium text-gray-600">Khu vực</label>
          <select
            className="w-full p-2 mb-4 border rounded"
            value={location}
            onChange={e => setLocation(e.target.value)}
          >
            <option value="">Tất cả</option>
            <option value="HCM">TP.HCM</option>
            <option value="HN">Hà Nội</option>
          </select>

          <label className="block mb-2 text-sm font-medium text-gray-600">Ngày</label>
          <input
            type="date"
            className="w-full p-2 mb-4 border rounded"
            value={date}
            onChange={e => setDate(e.target.value)}
          />

          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Áp dụng
          </button>
        </div>

        {/* Danh sách sân */}
        <div className="col-span-3 space-y-6">
          {selectedField && (
            <div className="bg-white shadow rounded p-4 border-l-4 border-orange-500 flex items-center justify-between">
              <div>
                <span className="text-gray-600">Đã chọn:</span>
                <strong className="text-orange-600 ml-2">{selectedField.name}</strong>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
                Xác nhận đặt sân
              </button>
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Sân được đề xuất</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredFields.map(field => (
                <div
                  key={field.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                >
                  <img
                    src={field.image || `https://via.placeholder.com/400x200?text=${field.name}`}
                    alt={field.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800">{field.name}</h3>
                    <p className="text-gray-500">{field.location || 'Địa điểm chưa xác định'}</p>
                    <p className="mt-1 text-green-600 font-semibold">${field.price || 45} / giờ</p>
                    <button
                      onClick={() => setSelectedField(field)}
                      className="mt-3 block w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                    >
                      Đặt ngay
                    </button>
                  </div>
                </div>
              ))}
              {filteredFields.length === 0 && (
                <p className="text-gray-600 col-span-full text-center">Không tìm thấy sân phù hợp.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
