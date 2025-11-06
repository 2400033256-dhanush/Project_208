import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function isAlpha(str) {
  return /^[A-Za-z]{1,20}$/.test(str);
}
function isStrongPassword(str) {
  return (
    str.length >= 10 &&
    /[A-Z]/.test(str) &&
    /[a-z]/.test(str) &&
    /[0-9]/.test(str) &&
    /[\W_]/.test(str)
  );
}

export default function Registration() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });
  const [success, setSuccess] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setSnackbarMessage("Please fill all fields!");
      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 3000);
      return;
    }
    if (!isAlpha(form.name)) {
      setSnackbarMessage("Name must be alphabets only and max 20 letters!");
      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 3000);
      return;
    }
    if (!isStrongPassword(form.password)) {
      setSnackbarMessage(
        "Password must be at least 10 characters and include uppercase, lowercase, number, and symbol!"
      );
      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 3500);
      return;
    }
    if (form.role !== "student") {
      setSnackbarMessage("Only 'Student' role can register.");
      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 3000);
      return;
    }

    setSuccess(true);
    setSnackbarMessage("Registration Successful!");
    setShowSnackbar(true);
  };

  const handleNext = () => {
    navigate("/login");
  };

  return (
    <div className="register-bg">
      <main className="main-container">
        <form className="registration-form horizontal" onSubmit={handleSubmit} autoComplete="off">
          <h2>
            <span className="icon">📝</span>
            Create Student Account
          </h2>
          <div className="form-row">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              id="name"
              required
              maxLength={20}
              value={form.name}
              onChange={handleChange}
              pattern="[A-Za-z]{1,20}"
              autoComplete="off"
              placeholder="A-Z only"
              title="Alphabets only, max 20 letters"
              disabled={success}
            />
          </div>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="student@email.com"
              autoComplete="off"
              disabled={success}
            />
          </div>
          <div className="form-row">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              value={form.password}
              onChange={handleChange}
              minLength={10}
              placeholder="Enter password"
              title="At least 10 characters, upper, lower, number & symbol"
              autoComplete="off"
              disabled={success}
            />
          </div>
          <div className="form-row">
            <label htmlFor="role">Register as</label>
            <select id="role" required value={form.role} onChange={handleChange} disabled>
              <option value="student">Student</option>
            </select>
          </div>
          <div className="form-actions">
            {!success && (
              <button type="submit" className="btn primary-btn">
                Register
              </button>
            )}
            {success && (
              <>
                <div className="success-message">🎉 Registration Successful!</div>
                <button type="button" className="btn next-btn" onClick={handleNext}>
                  Next
                </button>
              </>
            )}
          </div>
        </form>
        <div id="snackbar" className={showSnackbar ? "show" : ""}>
          {snackbarMessage}
        </div>
      </main>
    </div>
  );
}
