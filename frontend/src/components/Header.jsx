// import React from 'react';

// function Header({ onLoginClick, onBookingClick }) {
//   return (
//     <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-md sticky top-0 z-50">
//       {/* Logo */}
//       <div className="flex items-center space-x-2">
//         <img src="https://png.pngtree.com/png-clipart/20210704/original/pngtree-colorful-logo-design-png-transparent-png-image_6498766.jpg" alt="Logo" className="w-6 h-6" />
//         <span className="text-lg font-semibold text-orange-600">Sport Booking</span>
//       </div>

//       {/* Menu trung tâm */}
//       <ul className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
//         <li><a href="/" className="hover:text-orange-500">Trang chủ</a></li>
//         <button onClick={onBookingClick} className="hover:text-orange-500">Đặt sân ngay</button>
//         <li><a href="/guide" className="hover:text-orange-500">Hướng dẫn</a></li>
//         <li><a href="/contact" className="hover:text-orange-500">Liên hệ</a></li>
//       </ul>

//       {/* Đăng nhập */}
//       <div className="flex items-center space-x-2">
//         <button onClick={onLoginClick} className="text-sm text-gray-700 hover:text-orange-500">Đăng nhập</button>
//       </div>
//     </nav>
//   );
// }

// export default Header;
import React from 'react';

function Header({ onLoginClick, onLogout, user, onBookingClick }) {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-md sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src="https://png.pngtree.com/png-clipart/20210704/original/pngtree-colorful-logo-design-png-transparent-png-image_6498766.jpg" alt="Logo" className="w-6 h-6" />
        <span className="text-lg font-semibold text-orange-600">Sport Booking</span>
      </div>

      {/* Menu trung tâm */}
      <ul className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
        <li><a href="/" className="hover:text-orange-500">Trang chủ</a></li>
        <button onClick={onBookingClick} className="hover:text-orange-500">Đặt sân ngay</button>
        <li><a href="/guide" className="hover:text-orange-500">Hướng dẫn</a></li>
        <li><a href="/contact" className="hover:text-orange-500">Liên hệ</a></li>
      </ul>

      {/* Đăng nhập hoặc thông tin người dùng */}
      <div className="flex items-center space-x-2">
        {user ? (
          <>
            <span className="text-sm text-gray-700">Xin chào, {user.email || user.fullName || user.username}</span>
            <button onClick={onLogout} className="text-sm text-orange-600 hover:text-orange-500">Đăng xuất</button>
          </>
        ) : (
          <button onClick={onLoginClick} className="text-sm text-gray-700 hover:text-orange-500">Đăng nhập</button>
        )}
      </div>
    </nav>
  );
}

export default Header;