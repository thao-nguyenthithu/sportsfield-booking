import React from 'react';

function Header() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-md sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="w-6 h-6" />
        <span className="text-lg font-semibold text-orange-600">Sport Booking</span>
      </div>

      {/* Menu trung tâm */}
      <ul className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
        <li><a href="/" className="hover:text-orange-500">Trang chủ</a></li>
        <li><a href="/find" className="hover:text-orange-500">Tìm sân</a></li>
        <li><a href="/guide" className="hover:text-orange-500">Hướng dẫn</a></li>
        <li><a href="/contact" className="hover:text-orange-500">Liên hệ</a></li>
      </ul>

      {/* Đăng nhập */}
      <div className="flex items-center space-x-2">
        <a href="/login" className="text-sm text-gray-700 hover:text-orange-500">Đăng nhập</a>
      </div>
    </nav>
  );
}

export default Header;
