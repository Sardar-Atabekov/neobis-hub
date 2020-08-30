import React, { useState } from "react";
import Title from "../../components/title/title";
import { postFilesData } from "../../functions/requests";
import downloadIcon from "./../../assets/img/Group 115.png";
import Alert, { confirmAlert } from "../../functions/alert";
import "./add-news.css";

const AddNewsPage = (props) => {
  const [backgroundImage, setBackgroundImage] = useState(false);
  const [bgImgDownload, setBgImgDownload] = useState(downloadIcon);

  const postNewsData = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target),
      data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    formData.append("name", data.name);
    formData.append("text", data.text);
    formData.append("picture", backgroundImage);
    formData.append("link", "https://neobis.kg/");
    if (backgroundImage) {
      postFilesData("news/create/", formData)
        .then((response) => {
          console.log("response", response);
          if (response.id) {
            Alert("Новость добавлена");
            setTimeout(() => props.history.push(`/news/`), 1000);
          } else {
            Alert(response, "error");
          }
        })
        .catch(() =>
          confirmAlert("Ошибка сервера. Напишите нам, мы всё починим.")
        );
    } else {
      Alert("Добавьте фоновое изображение", "error");
    }
  };

  return (
    <div className="wrapper">
      <Title>Добавить новость </Title>
      <form onSubmit={postNewsData} className="flex-block">
        <div className="input-blocks">
          <div className="form-group">
            <label htmlFor="name">Заголовок</label>
            <input
              type="name"
              name="name"
              className="form-control"
              id="name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="text">Описания</label>
            <textarea
              name="text"
              className="form-control description-news"
              id="text"
              required
            />
          </div>
          <div className="text-right">
            <input
              type="submit"
              className="btn add-btn w-50 mt-5"
              value="Сохранить"
            />
          </div>
        </div>
        <div className="backgroundImage-news">
          <label htmlFor="backgroundImage" className="text-center">
            <img
              src={bgImgDownload}
              alt="NewDepartmentIcon"
              className="download-img"
            />
          </label>
          <input
            type="file"
            id="backgroundImage"
            className="d-none"
            onChange={(e) => {
              setBackgroundImage(e.target.files[0]);
              setBgImgDownload(URL.createObjectURL(e.target.files[0]));
            }}
          />
          <label htmlFor="backgroundImage" className="download-text">
            <span>Загрузить картинку фона</span>
          </label>
        </div>
      </form>
    </div>
  );
};
export default AddNewsPage;
