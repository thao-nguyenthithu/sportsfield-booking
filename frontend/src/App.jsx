import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import BookingPage from './components/BookingPage';
import BookingDetailPage from './components/BookingDetailPage';
import HomeAd from './components/page/HomeAd';

function App() {
  const [view, setView] = useState('home'); // Mặc định là trang Home
  const [forgotEmail, setForgotEmail] = useState('');
  const [user, setUser] = useState(null); // Lưu thông tin người dùng sau khi đăng nhập
  const [selectedFieldId, setSelectedFieldId] = useState(null);

  const handleLoginSuccess = (nextView) => {
    setView(nextView); 
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
        onAdminClick={() => setView('homead')}
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
        {view === 'bookingpage' && (
          <BookingPage 
            onBook={(id) => {
              setSelectedFieldId(id);
              setView('bookingdetailpage');
            }}
          />
        )}
          {view === 'bookingdetailpage' && (
            <BookingDetailPage id={selectedFieldId} />
          )}
        {view === 'homead' && <HomeAd />}
      </main>
      <Footer />
    </div>
  );
}

export default App;