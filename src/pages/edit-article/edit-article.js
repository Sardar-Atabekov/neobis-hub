import React, { useState, useEffect } from "react";
import Title from "../../components/title/title";
import Loading from "../../components/loading/loading";
import Alert, { confirmAlert } from "../../functions/alert";
import DeleteBtn from "./../../components/buttons/deleteBtn";
import { getData, patchFilesData } from "../../functions/requests";

const EditArticlePage = (props) => {
  const [article, setArticle] = useState("");
  const [loading, setLoading] = useState(false);
  const [bgImgDownload, setBgImgDownload] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(false);
  const userData = JSON.parse(localStorage.getItem("neobisHUBDate"));

  useEffect(() => {
    getData(`news/update_delete/${props.match.params.id}/`).then((res) => {
      setArticle(res);
      setLoading(true);
      setBgImgDownload(res.picture);
    });
  }, [props.match.params.id]);

  const editArticleData = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target),
      data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    formData.append("name", data.name);
    formData.append("text", data.text);
    formData.append("link", "https://neobis.kg/");
    if (backgroundImage) {
      formData.append("picture", backgroundImage);
    }

    patchFilesData(`news/update_delete/${article.id}/`, formData)
      .then((response) => {
        if (response.id) {
          Alert("Новость обновлен");
          setTimeout(() => props.history.push(`/news/`), 1000);
        } else {
          Alert(response, "error");
        }
      })
      .catch(() =>
        confirmAlert("Ошибка сервера. Напишите нам, мы всё починим.")
      );
  };

  return (
    <div className="wrapper">
      <Title>Редактировать новость </Title>
      {loading ? (
        <form onSubmit={editArticleData} className="flex-block">
          <div className="input-blocks">
            <div className="form-group">
              <label htmlFor="name">Заголовок</label>
              <input
                type="name"
                name="name"
                defaultValue={article.name}
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
                defaultValue={article.text}
                id="text"
                required
              />
            </div>
            <div className="button-block">
              {userData.delete_news ? (
                <DeleteBtn
                  title={`Вы уверены что хотите удалить новость ${article.name}?`}
                  subTitle="Новость удален"
                  url={`news/update_delete/${article.id}/`}
                  toUrl={"/news/"}
                  props={props}
                />
              ) : null}
              <input type="submit" className="btn add-btn " value="Сохранить" />
            </div>
          </div>
          <div className="backgroundImage-news">
            <label htmlFor="backgroundImage" className="text-center">
              <img
                src={bgImgDownload}
                alt="NewDepartmentIcon "
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
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default EditArticlePage;
