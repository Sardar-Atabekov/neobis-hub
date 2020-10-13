import React from "react";
import "./study-plan.css";


const StudyPlan = ({ icon, department, finishedStudyPlan }) => {
  return (
    <div className="study-plan">
      <span className="userRole-icon">
        <img src={icon} alt="study" />
      </span>
      <span className="title">Study Plan</span>
      <span className="name">{department}</span>
      <div className="line">
        <span className="percentage">100%</span>
      </div>
    </div>
  );
};
export default StudyPlan;
