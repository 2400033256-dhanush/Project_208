import React, { useEffect, useState } from "react";
import "./Timetable.css";
import { useNavigate } from "react-router-dom";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const TIMES = ["09:00", "11:00", "13:00", "15:00"];

export default function StudentTimetable() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [timetable, setTimetable] = useState({});
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const c = JSON.parse(localStorage.getItem("coursesList") || "[]");
    setCourses(c);
    const t = JSON.parse(localStorage.getItem("adminTimetable") || "{}");
    setTimetable(t);
    const r = JSON.parse(localStorage.getItem("studentRegistrations") || "[]");
    setRegistrations(r.map(r => r.code));
  }, []);

  const findCourseName = code => {
    const course = courses.find(c => c.code === code);
    return course ? course.name : "";
  };

  return (
    <div className="timetable-page">
      <header className="header">
        <h1>🗂️ Your Timetable</h1>
        <button className="btn" onClick={() => navigate("/student-dashboard")}>⬅ Back to Dashboard</button>
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
                  {TIMES.map(time => {
                    const code = timetable[day]?.[time] || "";
                    // Only show if code is in registrations
                    return (
                      <td key={time}>
                        {registrations.includes(code) && code ? (
                          <>
                            {findCourseName(code)}
                            <span className="course-meta">
                              <br />({code})
                            </span>
                          </>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
