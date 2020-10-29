import React, { useEffect, useState } from "react";
import Title from "./../../components/title/title";
import Loading from "../../components/loading/loading";
import downloadIcon from "../../assets/img/Group 115.png";
import Alert, { confirmAlert } from "../../functions/alert";
import { getData, patchFilesData } from "../../functions/requests";
import AddDocumentIcon from "./../../assets/icons/addDocument.svg";
import { Link } from "react-router-dom";
import "./personal-edit.css";

const EditPersonalAreaPage = (props) => {
  const [photo, setPhoto] = useState(false);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(false);
  const [photoImgDownload, setPhotoImgDownload] = useState(null);

  useEffect(() => {
    getData(`user/${props.match.params.id}`)
      .then((res) => {
        setUserData(res);
        setLoading(true);
        setPhotoImgDownload(res.photo);
      })
      .catch(() =>
        confirmAlert("Ошибка сервера. Напишите нам, мы всё починим.")
      );
  }, [props.match.params.id]);

  const postUserData = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target),
      data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (photo) {
      formData.append("photo", photo);
    }
    if (summary) {
      formData.append("summary", summary);
    }

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("surname", data.surname);
    formData.append("telegram", data.telegram);

    patchFilesData(`user/self_update`, formData)
      .then((response) => {
        if (response.name) {
          Alert("Данные обновлены");
          setTimeout(
            () => props.history.push(`/personal/${userData.id}/`),
            1000
          );
        } else {
          Alert(response.error, "error");
        }
      })
      .catch(() =>
        confirmAlert("Ошибка сервера. Напишите нам, мы всё починим.")
      );
  };
  console.log("userData", userData);
  return (
    <div className="wrapper">
      <Title>Редактировать личные данные</Title>
      {loading ? (
        <form className="flex-block" onSubmit={postUserData}>
          <div className="input-blocks mr-5">
            <div className="form-group">
              <label htmlFor="name">Имя</label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="name"
                defaultValue={userData.name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="surname">Фамилия</label>
              <input
                type="text"
                name="surname"
                className="form-control"
                id="surname"
                defaultValue={userData.surname}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                // disabled
                name="email"
                className="form-control"
                id="email"
                defaultValue={userData.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="telegram">Telegram</label>
              <input
                type="text"
                name="telegram"
                className="form-control"
                id="telegram"
                defaultValue={userData.telegram}
              />
            </div>
            <div className="button-block">
              <Link
                className="delete-btn-block btn p-3"
                to={`/change-password/${userData.id}`}
              >
                Изменить пароль
              </Link>
              <input type="submit" className="btn add-btn" value="Сохранить" />
            </div>
          </div>
          <div className="downloadBlock">
            <div className="text-center">
              <label htmlFor="photoImg" className="text-center mb-0">
                <img
                  src={photoImgDownload ? photoImgDownload : downloadIcon}
                  alt="NewDepartmentIcon"
                  className="download-img"
                />
              </label>
              <input
                type="file"
                id="photoImg"
                className="d-none"
                onChange={(e) => {
                  setPhoto(e.target.files[0]);
                  setPhotoImgDownload(window.URL.createObjectURL(e.target.files[0]));
                }}
              />
              <label htmlFor="photoImg" className="download-text">
                <span>Загрузить фотографию</span>
              </label>
            </div>
            <div className="mt-4">
              <input
                type="file"
                id="downloadDocument"
                className="d-none"
                onChange={(e) => {
                  setSummary(e.target.files[0]);
                }}
              />
              <label htmlFor="downloadDocument" className="download-text mb-0">
                <span>{summary ? "Файл загружена" : "Загрузить файл"} </span>
                <img
                  src={AddDocumentIcon}
                  alt="NewDepartmentIcon "
                  className="downloadIcon"
                />
              </label>
            </div>
          </div>
        </form>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default EditPersonalAreaPage;
