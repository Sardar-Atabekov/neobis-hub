import React from "react";
import "./study-plan.css";

const StudyPlan = ({ icon, department }) => {

    return (
        <div className="study-plan">
            <span className="pmIcon" >
                <img src={icon} alt="pm department icon" />
            </span>
            <span className="title">Study Plan</span>
            <span className="name">{department}</span>
            <span className="line"></span>
        </div>
    );
};
export default StudyPlan;
