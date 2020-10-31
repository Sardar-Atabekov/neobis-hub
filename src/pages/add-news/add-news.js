import React, { useState } from "react";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import Title from "../../components/title/title";
import { EditorState, convertToRaw } from "draft-js";
import { postFilesData } from "../../functions/requests";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import downloadIcon from "./../../assets/img/Group 115.png";
import Alert, { confirmAlert } from "../../functions/alert";
import "./add-news.css";

const AddNewsPage = (props) => {
  const [backgroundImage, setBackgroundImage] = useState(false);
  const [editor, setEditor] = useState(EditorState.createEmpty());
  const [bgImgDownload, setBgImgDownload] = useState(downloadIcon);

  const uploadCallback = async (file: any) => {
    return await new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onloadend = function () {
        resolve({ data: { link: reader.result } });
      };
      reader.readAsDataURL(file);
    });
  };

  console.log("editor", convertToRaw(editor.getCurrentContent()));
  const postNewsData = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target),
      data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });
    formData.append("text", draftToHtml(convertToRaw(editor.getCurrentContent())));
    formData.append("name", data.name);
    formData.append("picture", backgroundImage);
    formData.append("link", "https://neobis.kg/");
    if (backgroundImage) {
      postFilesData("news/create/", formData)
        .then((response) => {
          console.log("response", response);
          if (response.id) {
            Alert("Новость добавлена");
            setTimeout(() => props.history.push(`/news/1/`), 1000);
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
      <form onSubmit={postNewsData}>
        <div className="flex-block">
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
        </div>
        <div className="form-group">
          <label htmlFor="text">Описания</label>
          <Editor
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
          />
        </div>
        <div className="form-group w-30">
          <input
            type="submit"
            className="btn add-btn w-50 mt-5"
            value="Сохранить"
          />
        </div>
      </form>
    </div>
  );
};
export default AddNewsPage;
