import React from "react";
import { Link } from "react-router-dom";
import "./buttons.css";

const AddBtn = ({ url, text = "Создать", className = "" }) => {
  return (
    <div className="add-btn-block">
      <Link to={`/${url}/`} className={`add-btn ${className}`}>
        {text}
      </Link>
    </div>
  );
};
export default AddBtn;
