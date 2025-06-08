import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home';

export default function App() {
  const [view, setView] = useState('register');
  const [forgotEmail, setForgotEmail] = useState('');
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      {view === 'register' && <Register onLogin={() => setView('login')} />}
      {view === 'login' && <Login 
                onRegister={() => setView('register')} 
                onForgot={email => { setForgotEmail(email); setView('forgot'); }} 
                onLoginSuccess={() => setView('home')}
      />}
      {view === 'forgot' && <ForgotPassword emailInit={forgotEmail} onDone={() => setView('login')} />}
      {view === 'home' && <Home />}
    </div>
  );
}
