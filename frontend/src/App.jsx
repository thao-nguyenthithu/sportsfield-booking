import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';

export default function App() {
  const [view, setView] = useState('register');
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      {view === 'register' && <Register onLogin={() => setView('login')} />}
      {view === 'login' && <Login onRegister={() => setView('register')} />}
    </div>
  );
}
