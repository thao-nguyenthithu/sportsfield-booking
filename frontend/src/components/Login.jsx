import React, { useState } from 'react';

export default function Login({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // TODO: gọi API login
    alert(`Đăng nhập với ${email}`);
  };

  return (
    <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg">
      <div className="mb-6">
        <div className="w-full h-1 bg-indigo-500 rounded"></div>
      </div>
      <h2 className="text-2xl font-bold mb-6">Đăng nhập SportBooking</h2>
      <input type="email" placeholder="Nhập email" value={email} onChange={e=>setEmail(e.target.value)}
        className="w-full bg-gray-700 border border-gray-600 text-white rounded px-4 py-2 placeholder-gray-400 mb-4"/>
      <input type="password" placeholder="Nhập mật khẩu" value={password} onChange={e=>setPassword(e.target.value)}
        className="w-full bg-gray-700 border border-gray-600 text-white rounded px-4 py-2 placeholder-gray-400 mb-4"/>
      <div className="text-right mb-6">
        <button className="text-sm text-indigo-400">Quên mật khẩu?</button>
      </div>
      <button onClick={handleLogin}
        className="w-full bg-indigo-600 hover:bg-indigo-500 py-2 rounded text-white">Đăng Nhập &rsaquo;</button>
      <p className="mt-4 text-center text-sm text-gray-400">
        Bạn chưa có tài khoản? 
        <button onClick={onRegister} className="text-indigo-400">Đăng ký</button>
      </p>
    </div>
  );
}
