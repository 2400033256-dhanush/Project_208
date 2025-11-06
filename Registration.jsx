import React, { useState, useEffect } from "react";
import "./Registration.css";

export default function Registration() {
  const [courses, setCourses] = useState([]);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState("");
  const [registrations, setRegistrations] = useState([]);

  
useEffect(() => {
  const data = localStorage.getItem("coursesList");
  if (data) setCourses(JSON.parse(data));
  else setCourses([]);
  const regData = localStorage.getItem("studentRegistrations");
  if (regData) setRegistrations(JSON.parse(regData));
}, []);

  
  useEffect(() => {
    localStorage.setItem("studentRegistrations", JSON.stringify(registrations));
  }, [registrations]);

  const handleSubmit = e => {
    e.preventDefault();
    if (selectedCourseIndex === "") {
      alert("⚠ Please select a course.");
      return;
    }
    const regCourse = {
      course: courses[selectedCourseIndex].name,
      code: courses[selectedCourseIndex].code
    };
    
    if (registrations.find(r => r.code === regCourse.code)) {
      alert("You already registered for this course.");
      return;
    }
    setRegistrations([...registrations, regCourse]);
    alert(`✅ Registered for ${regCourse.course}!`);
    setSelectedCourseIndex("");
  };

  return (
    <div>
      <header className="header">
        <h1>📘 Course Registration</h1>
      </header>
      <div className="registration-top">
        <h2 className="reg-top-heading">Register for a Course</h2>
        <label className="select-label" htmlFor="course-select">Select Course:</label>
        <select
          id="course-select"
          required
          value={selectedCourseIndex}
          onChange={e => setSelectedCourseIndex(e.target.value)}
          className="select-on-top"
        >
          <option value="">-- Select a Course --</option>
          {courses.map((course, idx) => (
            <option value={idx} key={course.code}>
              {course.name} {course.code ? `(${course.code})` : ""}
            </option>
          ))}
        </select>
        <button 
          className="btn primary-btn reg-btn-on-top" 
          onClick={handleSubmit} 
          style={{marginBottom: "3px"}}
        >
          Register
        </button>
        {registrations.length > 0 && (
          <section className="registered-section">
            <h3>Your Registered Courses</h3>
            <ul>
              {registrations.map((reg, idx) => (
                <li key={idx}>{reg.course}{reg.code && ` (${reg.code})`}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
