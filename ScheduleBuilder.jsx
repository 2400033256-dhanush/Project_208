import React, { useState, useEffect } from "react";
import "./ScheduleBuilder.css";


export default function ScheduleBuilder() {
  
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("coursesList");
    if (data) {
      setCourses(JSON.parse(data));
    } else {
      setCourses([]);
    }
  }, []);

  const handleToggle = code => {
    if (selected.includes(code)) {
      setSelected(selected.filter(item => item !== code));
    } else {
      setSelected([...selected, code]);
    }
  };

  const getCourseName = code => {
    const c = courses.find(course => course.code === code);
    return c ? c.name : code;
  };

  return (
    <div>
      <header className="header">
        <h1>🗓️ Schedule Builder</h1>
       
      </header>
      <main>
        <div className="builder-wrapper">
          <section>
            <h3>Select Courses to Add to Your Schedule:</h3>
            <ul className="courses-list">
              {courses.length ? courses.map(course => (
                <li key={course.code} className="builder-row">
                  <label>
                    <input
                      type="checkbox"
                      checked={selected.includes(course.code)}
                      onChange={() => handleToggle(course.code)}
                    />
                    <span>{course.name} <span className="course-meta">({course.code})</span></span>
                  </label>
                </li>
              )) : <li>No courses available.</li>}
            </ul>
          </section>
          <section>
            <h3>Your Schedule</h3>
            <ul className="schedule-list">
              {selected.length ? selected.map(code => (
                <li key={code}>{getCourseName(code)}</li>
              )) : <li>No courses scheduled yet.</li>}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
