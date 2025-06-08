import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";


function Home() {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/fields')
      .then(response => setFields(response.data))
      .catch(error => console.error("Error fetching fields:", error));
  }, []);

  const getStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    return (
      '★★★★★'.slice(0, fullStars) +
      (halfStar ? '½' : '') +
      '☆'.repeat(emptyStars)
    );
  };

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20230715/pngtree-3d-rendering-of-soccer-stadium-in-green-hue-image_3867120.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center flex-col text-center px-4">
          <h1 className="text-white text-4xl font-bold mb-10">Đặt Sân Thể Thao Dễ Dàng, Nhanh Chóng</h1>
          <p className="text-white text-lg mb-10">Tìm kiếm và đặt sân bóng đá, cầu lông, tennis, và nhiều hơn nữa chỉ trong tích tắc.</p>
          <div className="flex w-full max-w-xl">
            <input type="text" placeholder="Tìm kiếm địa điểm, loại sân, khung giờ..." className="flex-grow p-2 rounded-l-3xl" />
            <button className="bg-orange-500 text-white px-4 rounded-r-3xl">Tìm kiếm</button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-white text-center">
        <h2 className="text-2xl font-bold mb-8">Tại Sao Chọn Sport Booking?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-6 border border-gray-300 rounded-lg shadow-md flex flex-col items-center">
            <div className="text-green-600 text-3xl mb-2 flex items-center justify-center h-12 w-12">
              <FaSearch/>
            </div>
            <h3 className="font-bold">Tìm Sân Dễ Dàng</h3>
            <p>Tìm kiếm sân thể thao dễ dàng, lọc theo vị trí, loại sân, khung giờ và nhiều tiêu chí phù hợp.</p>
          </div>
          <div className="p-6 border border-gray-300 rounded-lg shadow-md flex flex-col items-center">
            <div className="text-green-600 text-3xl mb-2 flex items-center justify-center h-12 w-12">
              <FaRegCalendarAlt/>
            </div>
            <h3 className="font-bold">Đặt Lịch Nhanh Chóng</h3>
            <p>Hệ thống đặt lịch trực tuyến nhanh chóng, xác nhận liền tay, tiết kiệm thời gian tối đa.</p>
          </div>
          <div className="p-6 border border-gray-300 rounded-lg shadow-md flex flex-col items-center">
            <div className="text-green-600 text-3xl mb-2 flex items-center justify-center h-12 w-12">
              <FaCreditCard/>
            </div>
            <h3 className="font-bold">Thanh Toán Linh Hoạt</h3>
            <p>Hỗ trợ đa dạng hình thức thanh toán tiện lợi, từ chuyển khoản đến ví điện tử.</p>
          </div>
        </div>
      </section>

      {/* Featured Fields */}
      <section className="py-12 bg-gray-100 text-center">
        <h2 className="text-2xl font-bold mb-8">Các Sân Nổi Bật</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {fields.map(field => (
            <div key={field.id} className="bg-white p-4 shadow rounded">
              <img src={field.image || `https://via.placeholder.com/300x200?text=${field.name}`}
                alt={field.name}
                className="w-full h-40 object-cover mb-2 rounded" />
              <h3 className="font-semibold text-lg">{field.name}</h3>
              <p className="text-sm text-gray-500">{field.address}</p>
              <p className="text-yellow-500 mt-1 text-sm">{getStarRating(field.rating || 0)} {field.rating || 0} ({field.reviewCount || 0} đánh giá)</p>
            </div>
          ))}
        </div>
        <button className="mt-6 bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">Xem Tất Cả Sân</button>
      </section>

      {/* Steps */}
      <section className="py-12 bg-white text-center">
        <h2 className="text-2xl font-bold mb-8">Đặt Sân Dễ Dàng Chỉ Với 3 Bước</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-6 border border-gray-300 rounded-lg shadow-md flex flex-col items-center">
            <div className="bg-orange-500 text-white w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 font-bold">1</div>
            <div className="text-green-600 text-4xl mb-2 flex items-center justify-center h-12 w-12">
              <FaSearch/>
            </div>
            <h3 className="font-bold">Tìm kiếm sân</h3>
            <p>Nhập địa điểm, loại sân bạn muốn và nhấn tìm kiếm.</p>
          </div>
          <div className="p-6 border border-gray-300 rounded-lg shadow-md flex flex-col items-center">
            <div className="bg-orange-500 text-white w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 font-bold">2</div>
            <div className="text-green-600 text-4xl mb-2 flex items-center justify-center h-12 w-12">
              <FaRegCalendarAlt/>
            </div>
            <h3 className="font-bold">Chọn sân & giờ</h3>
            <p>Xem thông tin chi tiết, chọn khung giờ trống và xác nhận người chơi.</p>
          </div>
          <div className="p-6 border border-gray-300 rounded-lg shadow-md flex flex-col items-center">
            <div className="bg-orange-500 text-white w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 font-bold">3</div>
            <div className="text-green-600 text-4xl mb-2 flex items-center justify-center h-12 w-12">
              <FaCheckCircle/>
            </div>
            <h3 className="font-bold">Thanh toán & xác nhận</h3>
            <p>Hoàn tất thanh toán và xác nhận qua email.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-orange-50 text-center">
        <h2 className="text-2xl font-bold mb-4">Sẵn Sàng Đặt Sân Của Bạn?</h2>
        <p>Tham gia Sport Booking ngay hôm nay để trải nghiệm dịch vụ đặt sân thể thao hàng đầu!</p>
        <a href="/register" className="mt-6 bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 inline-block">Đăng Ký Ngay</a>
      </section>
    </div>
  );
}

export default Home;
