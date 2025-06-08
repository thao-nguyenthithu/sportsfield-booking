import React, { useState, useEffect } from 'react';


export default function Register({ onLogin }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: '',
    fullName: '',
    password: '',
    confirm: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    fullName: '',
    password: '',
    confirm: ''
  });
  const [codes, setCodes] = useState(Array(6).fill(''));
  const [sending, setSending] = useState(false);
  const [justSent, setJustSent] = useState(false);
  const [verifyError, setVerifyError] = useState('');

  useEffect(() => {
    if (justSent) {
      const timer = setTimeout(() => setJustSent(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [justSent]);

  const validateEmail = async () => {
    let msg = '';
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
    if (!re.test(form.email)) {
      msg = 'Email không hợp lệ';
    } else {
      const res = await fetch('/api/auth/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email })
      });
      const data = await res.json();
      if (!data.valid) msg = 'Email đã được đăng ký';
    }
    setErrors(e => ({ ...e, email: msg }));
    return !msg;
  };
  const validateFullName = () => {
    let msg = form.fullName.trim() ? '' : 'Họ và tên không được để trống';
    setErrors(e => ({ ...e, fullName: msg }));
    return !msg;
  };
  const validatePassword = () => {
    let msg = form.password.length >= 6 ? '' : 'Mật khẩu phải ít nhất 6 ký tự';
    setErrors(e => ({ ...e, password: msg }));
    return !msg;
  };
  const validateConfirm = () => {
    let msg = form.confirm === form.password ? '' : 'Mật khẩu không khớp';
    setErrors(e => ({ ...e, confirm: msg }));
    return !msg;
  };

  const handleNext = async () => {
    const ok1 = await validateEmail();
    const ok2 = validateFullName();
    const ok3 = validatePassword();
    const ok4 = validateConfirm();
    if (!(ok1 && ok2 && ok3 && ok4)) return;

    try {
      fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email })
      });
    } catch (err) {
      console.error('Có lỗi gửi mã xác thực, hãy thử lại hoặc kiểm tra email sau.', err);
    }
    setStep(2);
  };

  const handleVerify = async () => {
    setVerifyError('');
    const code = codes.join('');
    const res = await fetch('/api/auth/verify-and-register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: form.email,
        fullName: form.fullName,
        password: form.password,
        code
      })
    });
    if (res.ok) {
      onLogin();
    } else {
      setVerifyError('Mã xác thực không hợp lệ hoặc đã hết hạn.');
    }
  };


  const handleResend = async () => {
    setSending(true);
    setJustSent(false);
    try {
      await fetch('/api/auth/resend-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email })
      });
      setJustSent(true);
    } catch (err) {
      console.error('Resend error', err);
    }
    setSending(false);
  };


  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setErrors(err => ({ ...err, [name]: '' }));
  };
  const handleCodeChange = (i, val) => {
    if (/^\d?$/.test(val)) {
      const arr = [...codes]; arr[i] = val; setCodes(arr);
      if (val && i < 5) document.getElementById(`code-${i+1}`)?.focus();
    }
  };


  return (
    <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg">
      {step === 1 ? (
        <> {/* Step1 */}
          <div className="mb-6">
            <div className="flex mb-2">
              <div className="w-1/2 h-1 bg-indigo-500 rounded-l" />
              <div className="w-1/2 h-1 bg-gray-600 rounded-r ml-1" />
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Thông tin tài khoản</span><span>Xác thực</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Đăng ký tài khoản SportBooking</h2>
          <p className="text-gray-400 mb-6">Tham gia cộng đồng của chúng tôi để dễ dàng đặt sân thể thao yêu thích của bạn.</p>
          <div className="space-y-4">
            <div>
              <input
                name="email" type="email" placeholder="Nhập email"
                value={form.email} onChange={handleChange} onBlur={validateEmail}
                className={`w-full bg-gray-700 border px-4 py-2 rounded text-white placeholder-gray-400 ${errors.email?'border-red-500':'border-gray-600'}`} />
              {errors.email&&<p className="mt-1 text-red-400 text-sm">{errors.email}</p>}
            </div>
            <div>
              <input
                name="fullName" placeholder="Nhập họ và tên"
                value={form.fullName} onChange={handleChange} onBlur={validateFullName}
                className={`w-full bg-gray-700 border px-4 py-2 rounded text-white placeholder-gray-400 ${errors.fullName?'border-red-500':'border-gray-600'}`} />
              {errors.fullName&&<p className="mt-1 text-red-400 text-sm">{errors.fullName}</p>}
            </div>
            <div>
              <input
                name="password" type="password" placeholder="Nhập mật khẩu"
                value={form.password} onChange={handleChange} onBlur={validatePassword}
                className={`w-full bg-gray-700 border px-4 py-2 rounded text-white placeholder-gray-400 ${errors.password?'border-red-500':'border-gray-600'}`} />
              {errors.password&&<p className="mt-1 text-red-400 text-sm">{errors.password}</p>}
            </div>
            <div>
              <input
                name="confirm" type="password" placeholder="Nhập lại mật khẩu"
                value={form.confirm} onChange={handleChange} onBlur={validateConfirm}
                className={`w-full bg-gray-700 border px-4 py-2 rounded text-white placeholder-gray-400 ${errors.confirm?'border-red-500':'border-gray-600'}`} />
              {errors.confirm&&<p className="mt-1 text-red-400 text-sm">{errors.confirm}</p>}
            </div>
          </div>
          <button onClick={handleNext} className="mt-6 w-full bg-indigo-600 hover:bg-indigo-500 py-2 rounded text-white">Tiếp tục &rsaquo;</button>
          <p className="mt-4 text-center text-sm text-gray-400">Bạn đã có tài khoản? <button onClick={onLogin} className="text-indigo-400">Đăng nhập</button></p>
        </>
      ) : (
        <> {/* Step2 */}
          <div className="mb-6">
            <div className="flex mb-2">
              <div className="w-1/2 h-1 bg-gray-600 rounded-l" />
              <div className="w-1/2 h-1 bg-indigo-500 rounded-r ml-1" />
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Thông tin tài khoản</span><span className="text-white">Xác thực</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Đăng ký tài khoản SportBooking</h2>
          <p className="text-gray-400 mb-6">Xác nhận địa chỉ email của bạn<br/>Chúng tôi đã gửi mã đến <strong>{form.email}</strong></p>


          {(sending || justSent) && (
            <p className={`text-center text-sm mb-2 ${sending?'text-gray-400':'text-green-400'}`}>{sending?'Đang gửi mã...':'Mã mới đã được gửi'}</p>
          )}


          <div className="flex justify-between mb-6">
            {codes.map((c,i)=>(
              <input key={i} id={`code-${i}`} type="text" maxLength="1" value={c}
                onChange={e=>handleCodeChange(i,e.target.value)}
                className="w-12 h-12 text-center bg-gray-700 border border-gray-600 rounded text-white" />
            ))}
          </div>


          {verifyError && <p className="text-center text-sm text-red-400 mb-2">{verifyError}</p>}


          <button onClick={handleVerify} className="w-full bg-indigo-600 hover:bg-indigo-500 py-2 rounded text-white mb-4">Tiếp tục &rsaquo;</button>
          <p className="text-center text-sm text-gray-400 mb-2">Bạn không nhận được email? <button onClick={handleResend} className="text-indigo-400">Gửi lại mã</button></p>
          <p className="text-center text-sm"><button onClick={()=>setStep(1)} className="text-indigo-400 underline">Quay lại</button></p>
        </>
      )}
    </div>
  );
}



