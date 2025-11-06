import React, { useEffect, useState } from "react";
import "./RemovedCourseList.css";

export default function RemovedCourseList() {
  const REMOVED_KEY = "removedCourses";
  const [removedCourses, setRemovedCourses] = useState([]);

  useEffect(() => {
    const arr = JSON.parse(localStorage.getItem(REMOVED_KEY) || "[]");
    setRemovedCourses(arr);
  }, []);

  return (
    <div className="removed-courses-container">
      <h2>Removed Course List</h2>
      <ul className="course-list removed-list">
        {removedCourses.length ? (
          removedCourses.map(c => (
            <li key={c.code}>
              {c.name} ({c.code})
            </li>
          ))
        ) : (
          <li>No courses removed.</li>
        )}
      </ul>
    </div>
  );
}
