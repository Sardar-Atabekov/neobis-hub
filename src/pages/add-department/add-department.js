import React, { useState } from "react";
import Title from "./../../components/title/title";
// import { postData } from "../../functions/requests";
import Alert, { confirmAlert } from "../../functions/alert";
import downloadIcon from "./../../assets/img/Group 115.png";
import NewDepartmentIcon from "./../../assets/icons/newDepartment.svg";
import "./add-department.css";
import axios from "axios";
// import { Table } from "reactstrap";
const AddDepartmentPage = (props) => {
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const postUserData = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("logo", file);
    formData.append("name", name);
    
    let token = JSON.parse(localStorage.getItem("neobisHUBDate")).token;
    axios
      .post("http://46.101.236.211:8477/department/create/", formData, {
        headers: {
          // Accept: "application/json",
          "Content-Type":
            "multipart/form-data; boundary=<calculated when request is sent>",
          Authorization: `Token ${token}`,
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Credentials": true,
        },
      })
      .then((response) => {
        if (response.data.id) {
          Alert("Департамент добавлен");
          setTimeout(() => props.history.push(`/departments`), 1000);
        }
      })
      .catch(() =>
        confirmAlert("Ошибка сервера. Напишите нам, мы всё починим.")
      );
  };
  return (
    <div className="wrapper">
      <Title>Cоздание департамента </Title>
      <form className="add-department" onSubmit={postUserData}>
        <div className="new-department-title-block">
          <img
            src={NewDepartmentIcon}
            alt="NewDepartmentIcon "
            className="mr-3"
          />
          <span className="new-department-title">Новый департамент </span>
        </div>
        <div className="download-icon">
          <label htmlFor="userProfilePicture" className="text-center">
            <img
              src={downloadIcon}
              alt="NewDepartmentIcon "
              className="downloadIcon"
            />
          </label>
          <input
            type="file"
            id="userProfilePicture"
            className="d-none"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="userProfilePicture" className="download-text">
            <span>Загрузить картинку</span>
          </label>
        </div>
        <div className="name">
          <span>НАЗВАНИЕ ДЕПАРТАМЕНТА </span>
          <input
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <div className="text-right">
            {" "}
            <input type="submit" className="btn add-btn" value="Сохранить" />
          </div>
        </div>
      </form>
    </div>
  );
};
export default AddDepartmentPage;
