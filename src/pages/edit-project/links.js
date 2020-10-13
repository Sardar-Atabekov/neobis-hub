import React, { useState } from "react";
import { confirmAlert } from "../../functions/alert";
import deleteIcon from "./../../assets/icons/deleteIcon.svg";
import { postData, deleteData } from "../../functions/requests";

const LinksBlock = ({ links, setLinks, projectId }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState(false);

  const postLink = () => {
    if (link && name.length > 0) {
      postData(`project/link/`, {
        name: name,
        link: link,
        project: projectId,
      })
        .then((response) => {
          if (response.id) {
            console.log("response", response);
            let arr = links.filter((link) => link.id);
            setLinks([...arr, response]);
            setName("");
            setLink("");
            setError(true);
          }
        })
        .catch(() =>
          confirmAlert(
            "Ошибка при загрузке скриншота. Напишите нам, мы всё починим."
          )
        );
    }
  };

  const AddLink = () => {
    let linkData = {
      link: null,
      name: null,
    };
    if (error) {
      setLinks([...links, linkData]);
      setError(false);
    }
  };

  const deleteLink = (id) => {
    if (id) {
      deleteData(`project/link/delete/${id}/`)
        .then((response) => {
          if (response.ok) {
            let filterData = links.filter((link) => link.id !== id);
            setLinks([...filterData]);
          }
        })
        .catch(() =>
          confirmAlert(
            "Ошибка при удаление скриншота. Напишите нам, мы всё починим."
          )
        );
    }
  };
  return (
    <div className="mt-2 links-block">
      <label htmlFor="typeDoc">Документы в проекте</label>
      <br />
      {links.map((item, i) => (
        <div key={i} className="user-project">
          <div className="form-group">
            <label htmlFor="typeDoc">Тип</label>
            <select
              className="select form-control"
              defaultValue={item.id ? item.name : ""}
              disabled={item.id ? true : false}
              onChange={(e) => setName(e.target.value)}
            >
              <option value="" disabled>
                Выберите тип документа
              </option>
              <option value="doc">Docx</option>
              <option value="trello">Trello</option>
            </select>
            <input
              type="text"
              disabled={item.id ? true : false}
              defaultValue={item.link}
              className="form-control mt-1"
              onChange={(e) => {
                setLink(e.target.value);
              }}
            />
          </div>
          <div>
            <img
              src={deleteIcon}
              onClick={() => deleteLink(item.id)}
              alt="deleteIcon"
            />
          </div>
        </div>
      ))}
      <div className="btn btnSumbit btnUser add-btn" onClick={postLink}>
        Сохранить документ
      </div>
      <br />
      <div onClick={AddLink} className="btn btnSumbit btnUser add-btn">
        Добавить еще документ
      </div>
    </div>
  );
};
export default LinksBlock;
