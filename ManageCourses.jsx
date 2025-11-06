import React, { useState, useEffect } from "react";
import "./ManageCourses.css";

export default function ManageCourses() {
  const LOCAL_KEY = "coursesList";
  const ADDED_KEY = "addedCourses";
  const REMOVED_KEY = "removedCourses";

  const loadCourses = () => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) return JSON.parse(saved);
    return [{ name: "Math 101", code: "MATH101" }];
  };

  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courses, setCourses] = useState(loadCourses);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(courses));
  }, [courses]);

  // Sync added/removed for lists
  const addToLocalArray = (key, course) => {
    const arr = JSON.parse(localStorage.getItem(key) || "[]");
    arr.push(course);
    localStorage.setItem(key, JSON.stringify(arr));
  };
  const removeFromLocalArray = (key, courseCode) => {
    const arr = JSON.parse(localStorage.getItem(key) || "[]");
    const filtered = arr.filter(c => c.code !== courseCode);
    localStorage.setItem(key, JSON.stringify(filtered));
  };

  const handleAddCourse = () => {
    if (!courseName || !courseCode) return;
    const newCourse = { name: courseName, code: courseCode };
    setCourses([...courses, newCourse]);
    addToLocalArray(ADDED_KEY, newCourse); // Add to added list
    removeFromLocalArray(REMOVED_KEY, courseCode); // Remove from removed list if exists
    setCourseName("");
    setCourseCode("");
  };

  const handleRemove = code => {
    const removedCourse = courses.find(c => c.code === code);
    setCourses(courses.filter(c => c.code !== code));
    addToLocalArray(REMOVED_KEY, removedCourse); // Add to removed list
    removeFromLocalArray(ADDED_KEY, code); // Remove from added list if exists
  };

  return (
    <div className="manage-courses">
      <h2>Manage Courses</h2>
      <div className="courses-center">
        <form className="add-course-form" onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            placeholder="Course Name"
            value={courseName}
            onChange={e => setCourseName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Course Code"
            value={courseCode}
            onChange={e => setCourseCode(e.target.value)}
          />
          <button
            type="button"
            onClick={handleAddCourse}
            className="btn add-btn"
          >
            Add Course
          </button>
        </form>
        <h3>Course List</h3>
        <ul className="course-list">
          {courses.map(c => (
            <li key={c.code} className="course-row">
              <span>
                {c.name} ({c.code})
              </span>
              <button
                className="btn remove-btn"
                onClick={() => handleRemove(c.code)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
