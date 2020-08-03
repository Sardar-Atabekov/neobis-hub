import React from "react";
import "./deleteBtn.css";
import { deleteAlert } from "./../../functions/alert";
import { Link } from "react-router-dom";

const DeleteBtn = ({ title, subTitle, url, toUrl, props }) => {
  const deleteMessage = () => {
    deleteAlert(title, subTitle, url, toUrl, props);
  };
  return (
    <div className="delete-btn-block btn" onClick={deleteMessage}>
      Удалить
    </div>
  );
};
export default DeleteBtn;
