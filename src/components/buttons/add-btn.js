import React from "react";
import { Link } from "react-router-dom";
import "./buttons.css";

const AddBtn = ({ url, text = "Создать" }) => {
  return (
    <div className="add-btn-block">
      <Link to={`/${url}/`} className="add-btn">
        {text}
      </Link>
    </div>
  );
};
export default AddBtn;
