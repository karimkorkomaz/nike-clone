import React, { useState, forwardRef, useImperativeHandle } from "react";
import "../Styles/AuthModal.css";

const AuthModal = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);


  useImperativeHandle(ref, () => ({
    openModal() {
      setOpen(true);
    }
  }));

  return (
    <>
      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>

            {isLogin ? (
              <form className="modal-form">
                <label>Email</label>
                <input type="email" />

                <label>Password</label>
                <input type="password" />

                <button className="modal-submit">Login</button>

                <p className="switch-text">
                  Don't have an account?
                  <span onClick={() => setIsLogin(false)}> Register</span>
                </p>
              </form>
            ) : (
              <form className="modal-form">
                <label>Name</label>
                <input type="text" />

                <label>Email</label>
                <input type="email" />

                <label>Password</label>
                <input type="password" />

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
