import React from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-buttons">
        <button
          className="tab-btn"
          onClick={() => navigate("/manage-courses")}
        >
          Manage Courses
        </button>
        <button
          className="tab-btn"
          onClick={() => navigate("/added-course-list")}
        >
          Newly Added Course List
        </button>
        <button
          className="tab-btn"
          onClick={() => navigate("/removed-course-list")}
        >
          Removed Course List
        </button>
        {/* New Admin Timetable button */}
        <button
          className="tab-btn"
          onClick={() => navigate("/admin-timetable")}
        >
          Admin Timetable
        </button>
      </div>
      <button className="btn back-btn" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}
