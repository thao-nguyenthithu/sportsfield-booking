import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate(); // Khai báo navigate
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: ''
  });
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8080/api/auth/register', {
        ...formData, role: 'USER'
      });
      if (res.data) {
        alert('Mã xác nhận đã được gửi đến email của bạn');
        setStep(2);
      }
    } catch (err) {
      alert('Lỗi khi đăng ký: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8080/api/auth/verify-email', {
        email: formData.email, otp
      });
      if (res.data === true) {
        alert('Xác thực thành công! Vui lòng đăng nhập');
        navigate('/login'); // Dùng useNavigate thay vì window.location.href
      } else {
        alert('Mã xác nhận không đúng!');
      }
    } catch (err) {
      alert('Lỗi xác nhận: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-black to-indigo-700">
      <div className="w-full max-w-md bg-white bg-opacity-95 p-8 rounded-lg shadow-2xl via-black to-indigo-700">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {step === 1 ? 'Tạo tài khoản mới' : 'Verify Your Email'}
        </h2>

        {step === 1 ? (
          <form onSubmit={handleRegister}>
            <input name="name" placeholder="Full name" value={formData.name} onChange={handleChange} required
              className="w-full mb-3 p-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required
              className="w-full mb-3 p-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required
              className="w-full mb-3 p-2  border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required
              className="w-full mb-3 p-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              {loading ? 'Đang đăng ký...' : 'Đăng ký'}
            </button>
            <p className="text-sm mt-4 text-center">
              Bạn đã có tài khoản? <a href="/login" className="text-orange-500 font-medium">Đăng nhập</a>
            </p>
          </form>
        ) : (
          <form onSubmit={handleVerify}>
            <p className="mb-4 text-sm text-gray-700">
              Vui lòng nhập mã xác nhận được gửi tới <strong>{formData.email}</strong>
            </p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Mã xác nhận"
              className="w-full mb-4 p-2 border rounded"
              required
            />
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
              {loading ? 'Đang xác nhận...' : 'Xác nhận'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Register;
