import React, { useEffect, useState } from "react";
import Title from "./../../components/title/title";
import Loading from "../../components/loading/loading";
import Alert, { confirmAlert } from "../../functions/alert";
import downloadIcon from "./../../assets/img/Group 115.png";
import DeleteBtn from "./../../components/buttons/deleteBtn";
import { getData, patchFilesData } from "../../functions/requests";

const EditDepartmentPage = (props) => {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloadImg, setDownloadImg] = useState("");
  const [bgImgDownload, setBgImgDownload] = useState("");
  const [DepartmentData, setDepartmentData] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(false);
  const userRights = JSON.parse(localStorage.getItem("neobisHUBDate"));

  useEffect(() => {
    getData(`department/${props.match.params.id}`)
      .then((res) => {
        setName(res.name);
        setDepartmentData(res);
        setBackgroundImage(res.background);
        setDownloadImg(res.logo ? res.logo : downloadIcon);
        setBgImgDownload(res.background ? res.background : downloadIcon);
        setLoading(true);
      })
      .catch(() =>
        confirmAlert("Ошибка сервера. Напишите нам, мы всё починим.")
      );
  }, [props.match.params.id]);

  const postDepartmentData = (e) => {
    e.preventDefault();
    let formData = new FormData();

    if (logo) {
      formData.append("logo", logo);
    }
    if (backgroundImage) {
      formData.append("background", backgroundImage);
    }

    formData.append("name", name);

    patchFilesData(`department/update_delete/${DepartmentData.id}/`, formData)
      .then((response) => {
        if (response.id) {
          Alert("Данные департамента изменен");
          setTimeout(() => props.history.push(`/departments/`), 1000);
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
          <form className="input-blocks" onSubmit={postDepartmentData}>
            <div className="download-images">
              <div>
                <label htmlFor="userProfilePicture" className="text-center">
                  <img
                    src={downloadImg}
                    alt="NewDepartmentIcon "
                    className="download-img"
                  />
                </label>
                <input
                  type="file"
                  id="userProfilePicture"
                  className="d-none"
                  onChange={(e) => {
                    setLogo(e.target.files[0]);
                    setDownloadImg(URL.createObjectURL(e.target.files[0]));
                  }}
                />
                <label htmlFor="userProfilePicture" className="download-text">
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
            <div className="form-group mt-4">
              <label htmlFor="name">Названия департамента</label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="name"
                onChange={(e) => setName(e.target.value)}
                defaultValue={name}
              />
            </div>

            <div className="button-block">
              {userRights.delete_department ? (
                <DeleteBtn
                  title={`Вы уверены что хотите удалить департамент ${DepartmentData.name}?`}
                  subTitle="Департамент удален"
                  url={`department/update_delete/${DepartmentData.id}/`}
                  toUrl={"/departments/"}
                  props={props}
                />
              ) : null}
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
export default EditDepartmentPage;
