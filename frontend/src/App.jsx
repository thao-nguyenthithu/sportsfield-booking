// import React, { useState } from 'react';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Home from './components/Home';
// import Login from './components/Login';
// import Register from './components/Register';
// import ForgotPassword from './components/ForgotPassword';
// import BookingPage from './components/BookingPage';
// import HomeAd from './components/Admin/HomeAd';

// function App() {
//   const [view, setView] = useState('home'); // Mặc định là trang Home
//   const [forgotEmail, setForgotEmail] = useState('');
//   const handleLoginSuccess = (nextView) => {
//     setView(nextView); // Chuyển đến 'admin' hoặc 'home' dựa trên vai trò
//   };

//   return (
//     <div>
//       <Header 
//         onLoginClick={() => setView('login')} 
//         onBookingClick={() =>setView('bookingpage')}
//       />
//       <main>
//         {view === 'home' && <Home />}
//         {view === 'register' && <Register onLogin={() => setView('login')} />}
//         {view === 'login' && (
//           <Login 
//             onRegister={() => setView('register')} 
//             onForgot={email => { setForgotEmail(email); setView('forgot'); }} 
//             onLoginSuccess={handleLoginSuccess}
//           />
//         )}
//         {view === 'forgot' && <ForgotPassword emailInit={forgotEmail} onDone={() => setView('login')} />}
//         {view === 'bookingpage' && <BookingPage />}
//         {view === 'homead' && <HomeAd />}
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import BookingPage from './components/BookingPage';
import HomeAd from './components/page/HomeAd';

function App() {
  const [view, setView] = useState('home'); // Mặc định là trang Home
  const [forgotEmail, setForgotEmail] = useState('');
  const [user, setUser] = useState(null); // Lưu thông tin người dùng sau khi đăng nhập

  const handleLoginSuccess = (nextView) => {
    setView(nextView); // Chuyển đến 'homead' hoặc 'home' dựa trên vai trò
    // Fetch thông tin người dùng từ API (giả định endpoint /api/auth/me)
    fetch('/api/auth/me', {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        console.log("User data:", data); // Debug
        setUser(data.user || data.email || data.fullName || data.username || 'Người dùng'); // Đặt giá trị mặc định nếu không có dữ liệu
      })
      .catch(err => console.error("Error fetching user data:", err));
  };

  const handleLogout = () => {
    setUser(null); // Xóa thông tin người dùng
    setView('home'); // Chuyển về trang Home chính
  };

  return (
    <div>
      <Header 
        onLoginClick={() => setView('login')} 
        onBookingClick={() => setView('bookingpage')}
        onLogout={handleLogout}
        user={user}
      />
      <main>
        {view === 'home' && <Home />}
        {view === 'register' && <Register onLogin={() => setView('login')} />}
        {view === 'login' && (
          <Login 
            onRegister={() => setView('register')} 
            onForgot={email => { setForgotEmail(email); setView('forgot'); }} 
            onLoginSuccess={handleLoginSuccess}
          />
        )}
        {view === 'forgot' && <ForgotPassword emailInit={forgotEmail} onDone={() => setView('login')} />}
        {view === 'bookingpage' && <BookingPage />}
        {view === 'homead' && <HomeAd />} {/* Sử dụng 'homead' thay vì 'admin' */}
      </main>
      <Footer />
    </div>
  );
}

export default App;