import React, { useState, useEffect } from "react";
import Title from "../../components/title/title";
import { EditorState, convertToRaw } from "draft-js";
import Loading from "../../components/loading/loading";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Alert, { confirmAlert } from "../../functions/alert";
import DeleteBtn from "./../../components/buttons/deleteBtn";
import { getData, patchFilesData } from "../../functions/requests";
import { Editor } from "react-draft-wysiwyg";
import ReactHtmlParser from 'react-html-parser';
const EditArticlePage = (props) => {
  const [article, setArticle] = useState("");
  const [loading, setLoading] = useState(false);
  const [bgImgDownload, setBgImgDownload] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(false);
  const [editor, setEditor] = useState(EditorState.createEmpty());
  const userData = JSON.parse(localStorage.getItem("neobisHUBDate"));

  useEffect(() => {
    getData(`news/update_delete/${props.match.params.id}/`).then((res) => {
      setArticle(res);
      setLoading(true);
      let editorText = EditorState.createEmpty(ReactHtmlParser(res.text));
      console.log(editorText);
      // setEditor(editorText);
      setBgImgDownload(res.picture);
    });
  }, [props.match.params.id]);

  const uploadCallback = async (file: any) => {
    return await new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onloadend = function () {
        resolve({ data: { link: reader.result } });
      };
      reader.readAsDataURL(file);
    });
  };

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
          setTimeout(() => props.history.push(`/news/1/`), 1000);
        } else {
          Alert(response, "error");
        }
      })
      .catch(() =>
        confirmAlert("Ошибка сервера. Напишите нам, мы всё починим.")
      );
  };

  console.log('editor', editor);
  return (
    <div className="wrapper">
      <Title>Редактировать новость </Title>
      {loading ? (
        <form onSubmit={editArticleData}>
          <div className="flex-block">
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
            {/* <Editor
              editorState={editor}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editor-block"
              onEditorStateChange={(e) => {
                setEditor(e);
              }}
              toolbar={{
                inline: { inDropdown: false },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
                image: {
                  uploadCallback: uploadCallback,
                  preview_image: true,
                  alt: { present: false, mandatory: false },
                },
              }}
            /> */}
          </div>
          <div className="button-block w-30">
            {userData.delete_news ? (
              <DeleteBtn
                title={`Вы уверены что хотите удалить новость ${article.name}?`}
                subTitle="Новость удалена"
                url={`news/update_delete/${article.id}/`}
                toUrl={"/news/"}
                props={props}
              />
            ) : null}
            <input type="submit" className="btn add-btn " value="Сохранить" />
          </div>
        </form>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default EditArticlePage;
