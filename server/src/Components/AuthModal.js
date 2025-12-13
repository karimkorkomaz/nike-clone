import React, { useState, forwardRef, useImperativeHandle } from "react";
import "../Styles/AuthModal.css";
import { useAuth } from "../Context/AuthContext";


const AuthModal = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { login } = useAuth();

  const [error, setError] = useState("");

  useImperativeHandle(ref, () => ({
    openModal() {
      setOpen(true);
    }
  }));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // --------------------------
  // SIGNUP
  // --------------------------
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Signup failed");
      return;
    }

    alert("Account created! Please log in.");
    setIsLogin(true);
  };

  // --------------------------
  // LOGIN
  // --------------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Login failed");
      return;
    }

    // Save JWT + user info
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("name", data.name);
    localStorage.setItem("user", JSON.stringify({ 
        id: data.id,
        name: data.name,
        role: data.role 
    }));

    // update AuthContext
    login({ name: data.name, role: data.role });

    setOpen(false);
    alert("Login successful");

  };

  return (
    <>
      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>

            {error && <p className="error-text">{error}</p>}

            {isLogin ? (
              <form className="modal-form" onSubmit={handleLogin}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />

                <button className="modal-submit">Login</button>

                <p className="switch-text">
                  Don't have an account?
                  <span onClick={() => setIsLogin(false)}> Register</span>
                </p>
              </form>
            ) : (
              <form className="modal-form" onSubmit={handleSignup}>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />

                <button className="modal-submit">Register</button>

                <p className="switch-text">
                  Already have an account?
                  <span onClick={() => setIsLogin(true)}> Login</span>
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
});

export default AuthModal;
