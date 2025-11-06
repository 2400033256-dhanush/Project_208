import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password || !role) {
      setError("Please fill all fields.");
      return;
    }
    // Direct navigation on button click
    if (role === "admin") {
      navigate("/admin-dashboard");
    } else if (role === "student") {
      navigate("/student-dashboard");
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="login-bg">
      <div className="login-topcenter">
        <h2 className="login-title">Login</h2>
        <div className="form-row role-row">
          <label htmlFor="roleSelect">Role</label>
          <select
            id="roleSelect"
            value={role}
            onChange={e => {
              setRole(e.target.value);
              setError("");
            }}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
        </div>
        {role && (
          <>
            <div className="form-row email-row">
              <label htmlFor="username">{role === "admin" ? "Username" : "Email"}</label>
              <input
                id="username"
                type="text"
                placeholder={role === "admin" ? "Enter username" : "Enter email"}
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>
            <div className="form-row password-row">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
          </>
        )}
        <button
          id="loginBtn"
          disabled={!role || !username || !password}
          onClick={handleLogin}
          className="login-btn"
        >
          Login
        </button>
        <button
          type="button"
          className="forgot-btn"
          onClick={handleForgotPassword}
        >
          Forgot Password?
        </button>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}
