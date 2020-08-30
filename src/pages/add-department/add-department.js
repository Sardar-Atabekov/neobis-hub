import React, { useState } from "react";
import Title from "./../../components/title/title";
import { postFilesData } from "../../functions/requests";
import Alert, { confirmAlert } from "../../functions/alert";
import downloadIcon from "./../../assets/img/Group 115.png";
import NewDepartmentIcon from "./../../assets/icons/newDepartment.svg";
import "./add-department.css";

const AddDepartmentPage = (props) => {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(false);
  const [downloadImg, setDownloadImg] = useState(downloadIcon);
  const [bgImgDownload, setBgImgDownload] = useState(downloadIcon);

  const postUserData = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("logo", logo);
    formData.append("name", name);
    formData.append("background", backgroundImage);

    if (logo) {
      if (backgroundImage) {
        postFilesData("department/create/", formData)
          .then((response) => {
            if (response.id) {
              Alert("Департамент добавлен");
              setTimeout(() => props.history.push(`/departments/`), 1000);
            }
          })
          .catch(() =>
            confirmAlert("Ошибка сервера. Напишите нам, мы всё починим.")
          );
      } else {
        Alert("Добавьте фоновое изображение", "error");
      }
    } else {
      Alert("Добавьте логотип департамента", "error");
    }
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
        <div className="download-images">
          <div>
            <label htmlFor="userPrologoPicture" className="text-center">
              <img
                src={downloadImg}
                alt="NewDepartmentIcon "
                className="download-img"
              />
            </label>
            <input
              type="file"
              id="userPrologoPicture"
              className="d-none"
              onChange={(e) => {
                setLogo(e.target.files[0]);
                setDownloadImg(URL.createObjectURL(e.target.files[0]));
              }}
            />
            <label htmlFor="userPrologoPicture" className="download-text">
              <span>Загрузить логотип</span>
            </label>
          </div>
          <div>
            <label htmlFor="backgroundImage" className="text-center">
              <img
                src={bgImgDownload}
                alt="NewDepartmentIcon "
                className="download-img"
              />
            </label>
            <input
              type="file"
              className="d-none"
              id="backgroundImage"
              onChange={(e) => {
                setBackgroundImage(e.target.files[0]);
                setBgImgDownload(URL.createObjectURL(e.target.files[0]));
              }}
            />
            <label htmlFor="backgroundImage" className="download-text">
              <span>Загрузить картинку фона</span>
            </label>
          </div>
        </div>
        <div className="name">
          <span>НАЗВАНИЕ ДЕПАРТАМЕНТА </span>
          <input
            required
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <div className="text-right">
            <input type="submit" className="btn add-btn" value="Сохранить" />
          </div>
        </div>
      </form>
    </div>
  );
};
export default AddDepartmentPage;
