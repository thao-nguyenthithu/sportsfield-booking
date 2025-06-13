import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookingPage({onBook}) {
  const [fields, setFields] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    types: [],
    locations: [],
    ratings: []
  });

  const handleBook = (fieldId) => {
    if(onBook) onBook(fieldId);
  };

  const [selectedField, setSelectedField] = useState(null);
  const [sportType, setSportType] = useState('');
  const [location, setLocation] = useState('');
  const [ratingRange, setRatingRange] = useState('');
  const [priceRange, setPriceRange] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/fields')
      .then(res => setFields(res.data))
      .catch(err => console.error('Lỗi khi tải danh sách sân:', err));

    axios.get('http://localhost:8080/api/filter-options')
      .then(res => setFilterOptions(res.data))
      .catch(err => console.error('Lỗi khi tải filter options:', err));
  }, []);

  // Hàm parse khoảng sao và giá
  const parseRange = (rangeStr) => {
    const [min, max] = rangeStr.split('-').map(Number);
    return { min, max };
  };

  // Lọc dữ liệu
  const filteredFields = fields.filter(field => {
    const matchType = !sportType || field.type === sportType;
    const matchLocation = !location || field.location === location;

    const matchRating = !ratingRange || (
      field.rating >= parseRange(ratingRange).min &&
      field.rating <= parseRange(ratingRange).max
    );

    const matchPrice = !priceRange || (
      field.price >= parseRange(priceRange).min &&
      field.price <= parseRange(priceRange).max
    );

    return matchType && matchLocation && matchRating && matchPrice;
  });

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
            {filterOptions.types.map((type, idx) => (
              <option key={idx} value={type}>{type}</option>
            ))}
          </select>

          <label className="block mb-2 text-sm font-medium text-gray-600">Khu vực</label>
          <select
            className="w-full p-2 mb-4 border rounded"
            value={location}
            onChange={e => setLocation(e.target.value)}
          >
            <option value="">Tất cả</option>
            {filterOptions.locations.map((loc, idx) => (
              <option key={idx} value={loc}>{loc}</option>
            ))}
          </select>

          <label className="block mb-2 text-sm font-medium text-gray-600">Sao</label>
          <select
            className="w-full p-2 mb-4 border rounded"
            value={ratingRange}
            onChange={e => setRatingRange(e.target.value)}
          >
            <option value="">Tất cả</option>
            <option value="1-2">1 - 2 sao</option>
            <option value="2-3">2 - 3 sao</option>
            <option value="3-4">3 - 4 sao</option>
            <option value="4-5">4 - 5 sao</option>
          </select>

          <label className="block mb-2 text-sm font-medium text-gray-600">Khoảng giá (USD)</label>
          <select
            className="w-full p-2 mb-4 border rounded"
            value={priceRange}
            onChange={e => setPriceRange(e.target.value)}
          >
            <option value="">Tất cả</option>
            <option value="0-50">0 - 50</option>
            <option value="51-100">51 - 100</option>
            <option value="101-200">101 - 200</option>
          </select>
        </div>

        
        
        <div className="col-span-3 space-y-6">
          

          <h2 className="text-xl font-semibold text-gray-700 mb-4">Sân được đề xuất</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredFields.length > 0 ? (
              filteredFields.map(field => (
                <div
                  key={field.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={field.image || 'https://via.placeholder.com/400x200?text=No+Image'}
                      alt={field.name}
                      className="w-full h-40 object-cover"
                    />
                    {field.rating && (
                      <div className="absolute top-2 left-2 bg-green-600 text-white text-sm font-semibold px-2 py-1 rounded">
                        {field.rating} ★
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800">{field.name}</h3>
                    <p className="text-sm text-gray-500">{field.location || 'Không rõ vị trí'}</p>
                    <p className="mt-1">
                      <span className="text-orange-600 font-bold">${field.price || 45}</span>
                      <span className="text-gray-600"> / giờ</span>
                    </p>
                    <button
                        onClick={() => handleBook(field.id)}
                        className="mt-3 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                      >
                        Đặt ngay
                    </button>
                    <button
                      onClick={() =>
                        alert(`Chi tiết sân:\n${field.name}\nLoại: ${field.type}\nGiá: $${field.price}`)
                      }
                      className="mt-2 w-full text-sm text-blue-600 hover:underline"
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 col-span-full text-center">Không tìm thấy sân phù hợp.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
