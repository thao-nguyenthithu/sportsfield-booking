import React, { useState } from "react";

export default function ForgotPassword({ emailInit, onDone }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState(emailInit || "");
  const [emailError, setEmailError] = useState("");
  const [codes, setCodes] = useState(Array(6).fill(""));
  const [verifyError, setVerifyError] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [passError, setPassError] = useState("");

  const handleSendCode = async () => {
    const ok = await validateEmail();
    if (!ok) return;
    setEmailError("");
    fetch("/api/auth/forgot-password/send-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    }).catch(() => {});
    setStep(2);
  };


  const handleVerify = async () => {
    setVerifyError("");
    const code = codes.join("");
    const res = await fetch("/api/auth/forgot-password/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code })
    });
    const data = await res.json();
    if (!res.ok) setVerifyError(data.message || "Sai mã xác thực");
    else setStep(3);
  };

  const handleResetPass = async () => {
    setPassError("");
    if (pass.length < 6) {
      setPassError("Mật khẩu phải ít nhất 6 ký tự"); return;
    }
    if (pass !== pass2) {
      setPassError("Mật khẩu không khớp"); return;
    }
    await fetch("/api/auth/forgot-password/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: pass })
    });
    onDone();
  };

  const validateEmail = async () => {
    let msg = "";
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
    if (!re.test(email)) {
      msg = "Email không hợp lệ";
    } else {
      const res = await fetch("/api/auth/check-email-exists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!data.exists) msg = "Email chưa được đăng ký";
    }
    setEmailError(msg);
    return !msg;
  };


  const handleCodeChange = (i, val) => {
    if (/^\d?$/.test(val)) {
      const arr = [...codes]; arr[i] = val; setCodes(arr);
      if (val && i < 5) document.getElementById(`code-fg-${i+1}`)?.focus();
    }
  };

  return (
    <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg">
      {step === 1 && <>
        <h2 className="text-2xl font-bold mb-6">Khôi phục mật khẩu</h2>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Vui lòng nhập email của bạn"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onBlur={validateEmail}
            className={`w-full bg-gray-900 border px-4 py-2 rounded text-white placeholder-gray-400 ${emailError ? "border-red-500" : "border-gray-600"}`}
          />
          {emailError && <p className="mt-1 text-red-400 text-sm">{emailError}</p>}
        </div>
        <button onClick={handleSendCode} className="w-full bg-indigo-600 hover:bg-indigo-500 py-2 rounded text-white">Gửi &rsaquo;</button>
        <p className="text-center mt-4">
            <button className="text-indigo-400" type="button"
                onClick={onDone}>Quay lại</button>
        </p>
      </>}
      {step === 2 && <>
        <h2 className="text-2xl font-bold mb-6">Xác nhận địa chỉ email của bạn</h2>
        <div className="flex justify-between mb-6">
          {codes.map((c,i)=>(
            <input key={i} id={`code-fg-${i}`} type="text" maxLength="1" value={c}
              onChange={e=>handleCodeChange(i,e.target.value)}
              className="w-12 h-12 text-center bg-gray-700 border border-gray-600 rounded text-white" />
          ))}
        </div>
        {verifyError && <div className="text-center text-sm text-red-400 mb-2">{verifyError}</div>}
        <button onClick={handleVerify} className="w-full bg-indigo-600 hover:bg-indigo-500 py-2 rounded text-white mb-4">Tiếp tục &rsaquo;</button>
        <p className="text-center text-sm">Bạn không nhận được email? <button className="text-indigo-400" onClick={handleSendCode}>Gửi lại mã</button></p>
        <p className="text-center mt-2"><button className="text-indigo-400 underline" type="button" onClick={() => setStep(1)}>Quay lại</button></p>

      </>}
      {step === 3 && <>
        <h2 className="text-2xl font-bold mb-6">Đặt lại mật khẩu</h2>
        <input type="password" placeholder="Nhập mật khẩu"
          value={pass} onChange={e=>setPass(e.target.value)}
          className={`w-full bg-gray-900 border px-4 py-2 rounded text-white placeholder-gray-400 ${passError ? "border-red-500" : "border-gray-600"} mb-2`}
        />
        <input type="password" placeholder="Nhập lại mật khẩu"
          value={pass2} onChange={e=>setPass2(e.target.value)}
          className={`w-full bg-gray-900 border px-4 py-2 rounded text-white placeholder-gray-400 ${passError ? "border-red-500" : "border-gray-600"} mb-2`}
        />
        {passError && <div className="text-center text-red-400 mb-2">{passError}</div>}
        <button onClick={handleResetPass} className="w-full bg-indigo-600 hover:bg-indigo-500 py-2 rounded text-white">Quay lại để đăng nhập &rsaquo;</button>
      </>}
    </div>
  );
}
