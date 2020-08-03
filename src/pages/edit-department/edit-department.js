import React, { useEffect, useState } from "react";
import Title from "./../../components/title/title";
import Loading from "../../components/loading/loading";
import Alert, { confirmAlert } from "../../functions/alert";
import downloadIcon from "./../../assets/img/Group 115.png";
import { getData, patchData } from "../../functions/requests";
import DeleteBtn from "./../../components/buttons/deleteBtn";
import axios from "axios";

const USerPage = (props) => {
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [DepartmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    getData(`department/${props.match.params.id}`)
      .then((res) => {
        setDepartmentData(res);
        setName(res.name);
        setLoading(true);
      })
      .catch(() =>
        confirmAlert("Ошибка сервера. Напишите нам, мы всё починим.")
      );
  }, [props.match.params.id]);

  const postDepartmentData = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("logo", file);
    formData.append("name", name);

    let token = JSON.parse(localStorage.getItem("neobisHUBDate")).token;
    axios
      .patch(
        `http://46.101.236.211:8477/department/update_delete/${props.match.params.id}/`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data; boundary=<calculated when request is sent>",
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.id) {
          Alert("Департамент изменен");
          setTimeout(() => props.history.push(`/departments`), 1000);
        }
      })
      .catch(() =>
        confirmAlert("Ошибка сервера. Напишите нам, мы всё починим.")
      );
  };

  return (
    <div className="wrapper">
      {loading ? (
        <>
          <Title>Редактировать данные департамента</Title>
          <form className="add-user" onSubmit={postDepartmentData}>
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
            <div className="form-group mt-4">
              <label htmlFor="name">Названия департамента</label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="name"
                onChange={(e) => setName(e.target.value)}
                defaultValue={DepartmentData.name}
              />
            </div>

            <div className="button-block">
              <DeleteBtn
                title={`Вы уверены что хотите удалить департамент ${DepartmentData.name}?`}
                subTitle="Департамент удален"
                url={`department/update_delete/${DepartmentData.id}/`}
                toUrl={"/departments"}
                props={props}
              />
              <input type="submit" className="btn add-btn" value="Сохранить" />
            </div>
          </form>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default USerPage;
