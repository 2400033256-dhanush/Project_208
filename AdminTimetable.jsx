import React, { useEffect, useState } from "react";
import "./Timetable.css";
import { useNavigate } from "react-router-dom";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const TIMES = ["09:00", "11:00", "13:00", "15:00"];

export default function AdminTimetable() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [timetable, setTimetable] = useState({});

  useEffect(() => {
    const c = JSON.parse(localStorage.getItem("coursesList") || "[]");
    setCourses(c);
    const t = JSON.parse(localStorage.getItem("adminTimetable") || "{}");
    setTimetable(t);
  }, []);

  const handleChange = (day, time, code) => {
    setTimetable(prev => {
      const updated = { ...prev };
      if (!updated[day]) updated[day] = {};
      updated[day][time] = code;
      localStorage.setItem("adminTimetable", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="timetable-page">
      <header className="header">
        <h1>🗂️ Edit Master Timetable</h1>
        <button className="btn" onClick={() => navigate("/admin-dashboard")}>⬅ Back to Admin Dashboard</button>
      </header>
      <main>
        <div className="timetable-table-wrapper">
          <table className="timetable-table">
            <thead>
              <tr>
                <th></th>
                {TIMES.map(time => (
                  <th key={time}>{time}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DAYS.map(day => (
                <tr key={day}>
                  <td className="daycell">{day}</td>
                  {TIMES.map(time => (
                    <td key={time}>
                      <select
                        value={timetable[day]?.[time] || ""}
                        onChange={e => handleChange(day, time, e.target.value)}
                      >
                        <option value="">- Select -</option>
                        {courses.map(c => (
                          <option key={c.code} value={c.code}>{c.name} ({c.code})</option>
                        ))}
                      </select>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
