import React from "react";
import "./StudentDashboard.css";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const navigate = useNavigate();
  return (
    <div>
      <header className="header">
        <div className="container">
          <h1>🎓 Student Dashboard</h1>
          <nav className="navbar">
            <button onClick={() => navigate("/courses")}>📚 Courses</button>
            <button onClick={() => navigate("/schedule-builder")}>🗓️ Schedule</button>
            <button onClick={() => navigate("/student-timetable")}>🕒 Timetable</button>
            <button onClick={() => navigate("/registration")}>📝 Register</button>
            <button className="logout-btn" onClick={() => navigate("/")}>🚪 Logout</button>
          </nav>
        </div>
      </header>
      <main className="main-content">
        <div className="welcome-card">
          <h2>Welcome, Student!</h2>
          <p>
            Use the navigation above to access course lists, schedule builder, the official timetable, and registration options.
          </p>
        </div>
      </main>
    </div>
  );
}
