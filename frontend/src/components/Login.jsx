// import React, { useState } from "react";

// export default function Login({ onRegister, onLoginSuccess, onForgot }) {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState({ email: "", password: "" });
//   const [loginError, setLoginError] = useState("");

//   const validateEmail = async () => {
//     let msg = "";
//     const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
//     if (!re.test(form.email)) {
//       msg = "Email không hợp lệ";
//     } else {
//       const res = await fetch('/api/auth/check-email-exists', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: form.email })
//       });
//       const data = await res.json();
//       if (!data.exists) msg = "Email chưa được đăng ký";
//     }
//     setErrors(e => ({ ...e, email: msg }));
//     return !msg;
//   };

//   const validatePassword = () => {
//     let msg = form.password.length >= 6 ? "" : "Mật khẩu phải ít nhất 6 ký tự";
//     setErrors(e => ({ ...e, password: msg }));
//     return !msg;
//   };

//   const handleLogin = async () => {
//     setLoginError("");
//     const ok1 = await validateEmail();
//     const ok2 = validatePassword();
//     if (!(ok1 && ok2)) return;

//     const res = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form)
//     });
//     const data = await res.json();
//     if (res.ok) {
//       onLoginSuccess();
//     } else {
//       setLoginError(data.message || "Đăng nhập thất bại");
//       setTimeout(() => setLoginError(""), 5000);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col flex-grow items-center justify-center">
//       <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg">
//         <h2 className="text-2xl font-bold mb-6">Đăng nhập SportBooking</h2>
//         {loginError && <div className="text-red-400 text-center mb-3">{loginError}</div>}
//         <div className="space-y-4">
//           <div>
//             <label>Email</label>
//             <input
//               name="email" type="email" placeholder="Nhập email"
//               value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
//               onBlur={validateEmail}
//               className={`w-full bg-gray-900 border px-4 py-2 rounded text-white placeholder-gray-400 ${errors.email ? "border-red-500" : "border-gray-600"}`}
//             />
//             {errors.email && <p className="mt-1 text-red-400 text-sm">{errors.email}</p>}
//           </div>
//           <div>
//             <label>Mật khẩu</label>
//             <input
//               name="password" type="password" placeholder="Nhập mật khẩu"
//               value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
//               onBlur={validatePassword}
//               className={`w-full bg-gray-900 border px-4 py-2 rounded text-white placeholder-gray-400 ${errors.password ? "border-red-500" : "border-gray-600"}`}
//             />
//             {errors.password && <p className="mt-1 text-red-400 text-sm">{errors.password}</p>}
//           </div>
//           <p className="text-sm"><button className="text-indigo-400" onClick={() => onForgot(form.email)}>Quên mật khẩu?</button></p>
//         </div>
//         <button onClick={handleLogin} className="mt-6 w-full bg-indigo-600 hover:bg-indigo-500 py-2 rounded text-white">Đăng Nhập ›</button>
//         <p className="mt-4 text-center text-sm text-gray-400">Bạn chưa có tài khoản? <button onClick={onRegister} className="text-indigo-400">Đăng kí</button></p>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";

export default function Login({ onRegister, onLoginSuccess, onForgot }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const validateEmail = async () => {
    let msg = "";
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
    if (!re.test(form.email)) {
      msg = "Email không hợp lệ";
    } else {
      const res = await fetch('/api/auth/check-email-exists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email })
      });
      const data = await res.json();
      if (!data.exists) msg = "Email chưa được đăng ký";
    }
    setErrors(e => ({ ...e, email: msg }));
    return !msg;
  };

  const validatePassword = () => {
    let msg = form.password.length >= 6 ? "" : "Mật khẩu phải ít nhất 6 ký tự";
    setErrors(e => ({ ...e, password: msg }));
    return !msg;
  };

  const handleLogin = async () => {
    setLoginError("");
    const ok1 = await validateEmail();
    const ok2 = validatePassword();
    if (!(ok1 && ok2)) return;

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    console.log("Login response:", data); // Debug
    if (res.ok) {
      const role = data.user?.role;
      console.log("Detected role:", role); // Debug
      if (role === "ADMIN") {
        onLoginSuccess("homead"); // Chuyển đến HomeAd cho Admin
      } else {
        onLoginSuccess("home"); // Chuyển đến Home cho USER/MANAGER
      }
    } else {
      setLoginError(data.message || "Đăng nhập thất bại");
      setTimeout(() => setLoginError(""), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col flex-grow items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">Đăng nhập SportBooking</h2>
        {loginError && <div className="text-red-400 text-center mb-3">{loginError}</div>}
        <div className="space-y-4">
          <div>
            <label className="block text-green-600 mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Nhập email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              onBlur={validateEmail}
              className={`w-full bg-gray-900 border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600 text-white placeholder-gray-500 ${errors.email ? "border-red-500" : "border-gray-600"}`}
            />
            {errors.email && <p className="mt-1 text-red-400 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-green-600 mb-1">Mật khẩu</label>
            <input
              name="password"
              type="password"
              placeholder="Nhập mật khẩu"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              onBlur={validatePassword}
              className={`w-full bg-gray-900 border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600 text-white placeholder-gray-500 ${errors.password ? "border-red-500" : "border-gray-600"}`}
            />
            {errors.password && <p className="mt-1 text-red-400 text-sm">{errors.password}</p>}
          </div>
          <p className="text-sm text-center"><button className="text-green-600 hover:underline" onClick={() => onForgot(form.email)}>Quên mật khẩu?</button></p>
        </div>
        <button
          onClick={handleLogin}
          className="mt-6 w-full bg-orange-500 hover:bg-orange-600 py-2 rounded text-white font-semibold transition duration-300"
        >
          Đăng Nhập ›
        </button>
        <p className="mt-4 text-center text-sm text-gray-400">Bạn chưa có tài khoản? <button onClick={onRegister} className="text-green-600 hover:underline">Đăng kí</button></p>
      </div>
    </div>
  );
}