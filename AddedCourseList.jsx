import React, { useEffect, useState } from "react";
import "./AddedCourseList.css";

export default function AddedCourseList() {
  const ADDED_KEY = "addedCourses";
  const [addedCourses, setAddedCourses] = useState([]);

  useEffect(() => {
    const arr = JSON.parse(localStorage.getItem(ADDED_KEY) || "[]");
    setAddedCourses(arr);
  }, []);

  return (
    <div className="added-courses-container">
      <h2>Newly Added Course List</h2>
      <ul className="course-list">
        {addedCourses.length ? (
          addedCourses.map(c => (
            <li key={c.code}>
              {c.name} ({c.code})
            </li>
          ))
        ) : (
          <li>No new courses added.</li>
        )}
      </ul>
    </div>
  );
}
