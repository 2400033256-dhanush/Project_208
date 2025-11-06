import React, { useEffect, useState } from "react";
import "./CourseList.css";


export default function CourseList() {

  const [courses, setCourses] = useState([]);
  
  useEffect(() => {
    // Load courses from ManageCourses localStorage
    const data = localStorage.getItem("coursesList");
    if (data) {
      setCourses(JSON.parse(data));
    } else {
      setCourses([]); // fallback if nothing found
    }
  }, []);

  return (
    <div>
      <header className="header">
        <h1>📘 Available Courses</h1>
        
      </header>
      <main>
        <div className="course-container">
          {courses.length ? courses.map((course, idx) => (
            <div className="course-card" key={idx}>
              <strong>{course.name}</strong>
              <br />
              {course.code ? <span className="course-meta">Code: {course.code}</span> : null}
            </div>
          )) : (
            <div className="course-card empty">
              No courses available.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
