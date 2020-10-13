import React, { useState, useEffect } from "react";
import Title from "../../components/title/title";
import Team from "./../../components/team-block/team";
import { format, addDays, addMonths } from "date-fns";
import Loading from "../../components/loading/loading";
import Alert, { confirmAlert } from "../../functions/alert";
import downloadIcon from "./../../assets/img/Group 115.png";
import DeleteBtn from "./../../components/buttons/deleteBtn";
import deleteIcon from "./../../assets/icons/deleteIcon.svg";
import DatePicker, { registerLocale } from "react-datepicker";
import { projectType } from "../../constants/status";
import LinksBlock from "./links";
// import deleteIcon from "./../../assets/icons/deleteIcon.svg";
import {
  getData,
  patchData,
  postFilesData,
  putFilesData,
  deleteData,
} from "../../functions/requests";

import NewDepartmentIcon from "./../../assets/icons/newDepartment.svg";
import ruDateLocale from "date-fns/locale/ru";
import "./edit-project.css";
registerLocale("ru", ruDateLocale);
// import axios from "axios";
const AddProjectPage = (props) => {
  let [team, setTeam] = useState([]);
  const [logo, setLogo] = useState(false);
  const [season, setSeason] = useState([]);
  const [project, setProject] = useState([]);
  const [screenshots, setScreenshots] = useState([]);
  const [downloadImg, setDownloadImg] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [finishDate, setFinishDate] = useState(new Date());
  let [links, setLinks] = useState([{ name: "", link: "" }]);
  const [loadingProject, setLoadingProject] = useState(false);
  const userRights = JSON.parse(localStorage.getItem("neobisHUBDate"));

  useEffect(() => {
    getData(`project/${props.match.params.id}`).then((res) => {
      setProject(res);
      setTeam(res.team);
      setLoadingProject(true);
      setLinks(
        res.links.length > 0
          ? [...res.links, { name: "", link: "" }]
          : [{ name: "", link: "" }]
      );
      setScreenshots(res.screenshots);
      setStartDate(new Date(res.date_of_start));
      setFinishDate(new Date(res.date_of_finish));
      setDownloadImg(res.logo ? res.logo : downloadIcon);
    });
    getData(`project/season/`).then((res) => {
      setSeason(res);
    });
  }, [props.match.params.id]);

  const postProjectData = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target),
      data = {},
      logoData = new FormData();
    formData.forEach((value, key) => {
      data[key] = value;
    });
    team = team.map((item) => {
      console.log(item, data);
      delete item.department;
      delete item.telegram;
      item.user_role = +item.user_role;
      console.log(item.user, item.user);
      console.log("item", item);
      // item.user = +item.user;
      return item;
    });
    data.team = team;

    if (logo) {
      logoData.append("logo", logo);
      putFilesData(`project/logo/${project.id}/`, logoData)
        .then((response) => {
          console.log(response);
          if (!response.logo) {
            Alert("Ошибка с загрузкой логотипа", "error");
          }
        })
        .catch(() =>
          confirmAlert("Ошибка сервера. Напишите нам, мы всё починим.")
        );
    }
    patchData(`project/update_delete/${project.id}/`, data)
      .then((response) => {
        if (response.id) {
          Alert("Данные проекта изменен");
          setTimeout(() => props.history.push(`/projects/`), 1000);
        } else {
          Alert(response.error ? response.error : response.detail, "error");
        }
      })
      .catch(() =>
        confirmAlert("Ошибка сервера. Напишите нам, мы всё починим.")
      );
  };

  console.log(project.links);
  const AddScreenshot = (screenshot) => {
    const screenshotData = new FormData();
    screenshotData.append("image", screenshot);
    screenshotData.append("project", project.id);

    postFilesData(`project/screenshot/`, screenshotData)
      .then((response) => {
        setScreenshots([...screenshots, response]);
      })
      .catch(() =>
        confirmAlert(
          "Ошибка при загрузке скриншота. Напишите нам, мы всё починим."
        )
      );
  };

  const deleteScreenshot = (id) => {
    deleteData(`project/screenshot/delete/${id}/`)
      .then((response) => {
        console.log(response);
        let arr = screenshots.filter((screenshot) => screenshot.id !== id);
        setScreenshots([...arr]);
      })
      .catch(() =>
        confirmAlert(
          "Ошибка при удаление скриншота. Напишите нам, мы всё починим."
        )
      );
  };
  return (
    <div className="wrapper">
      <Title>Редактирования проекта </Title>
      {loadingProject ? (
        <form className="flex-block" onSubmit={postProjectData}>
          <div className="mr-5 input-blocks project-label">
            <div className="new-department-title-block mb-3">
              <img
                src={NewDepartmentIcon}
                alt="NewDepartmentIcon "
                className="mr-3"
              />
              <span className="new-department-title">
                Редактирование проекта
              </span>
            </div>
            <div className="form-group">
              <label htmlFor="name">Наименование проекта</label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="name"
                defaultValue={project.name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Краткое описание</label>
              <textarea
                type="text"
                name="description"
                className="form-control"
                id="description"
                defaultValue={project.description}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="product_owner">Продукт Овнер</label>
              <input
                type="text"
                name="product_owner"
                defaultValue={project.product_owner}
                className="form-control"
                id="product_owner"
              />
            </div>
            <div className="form-group">
              <label htmlFor="progress">Прогресс</label>
              <input
                type="number"
                name="progress"
                defaultValue={project.progress}
                className="form-control"
                id="progress"
              />
            </div>
            <div className="form-group d-flex">
              <div className="w-50 mr-3">
                <label htmlFor="date_of_start">Дата начала </label>
                <br />
                <DatePicker
                  locale="ru"
                  className="form-control"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="2000-11-11"
                  maxDate={addDays(new Date(finishDate), -1)}
                  selected={new Date(startDate)}
                  onSelect={(date) => {
                    setStartDate(format(new Date(date), "yyyy-MM-dd"));
                  }}
                />
              </div>
              <div className="w-50">
                <label htmlFor="date_of_finish">Дата завершения</label>
                <br />

                <DatePicker
                  locale="ru"
                  className="form-control"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="2000-11-11"
                  selected={new Date(finishDate)}
                  minDate={addDays(new Date(startDate), 1)}
                  onSelect={(date) => {
                    setFinishDate(format(new Date(date), "yyyy-MM-dd"));
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="season">Сезон</label>
              <br />
              <select
                id="season"
                className="select form-control"
                name="season"
                defaultValue={project.season ? project.season : ""}
              >
                <option value="" disabled>
                  Выберите сезон проекта
                </option>
                {season.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="type">Тип проекта</label>
              <select
                id="type"
                className="select form-control"
                defaultValue={project.project_type}
                required
                name="project_type"
              >
                <option value="" disabled>
                  Выберите тип проекта
                </option>
                {Object.entries(projectType).map((item) => (
                  <option value={item[0]} key={item[0]}>
                    {item[1]}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="status">Статус</label>
              <br />
              <select
                id="status"
                className="select form-control"
                name="status"
                defaultValue={project.status}
              >
                <option value="a">Активный</option>
                <option value="f">Заморожен</option>
                <option value="c">Завершенный</option>
              </select>
            </div>
            <Team team={team} setTeam={setTeam} pmID={project.pm} />

            <div className="button-block">
              {userRights.add_project ? (
                <DeleteBtn
                  title={`Вы уверены что хотите удалить проект ${project.name}?`}
                  subTitle="Проект удален"
                  url={`project/update_delete/${project.id}/`}
                  toUrl={"/projects/"}
                  props={props}
                />
              ) : null}

              <input type="submit" className="btn add-btn" value="Сохранить" />
            </div>
          </div>
          <div className="ml-200">
            <div className="logo-project">
              <label htmlFor="logo" className="text-center">
                <img
                  src={downloadImg}
                  alt="NewDepartmentIcon "
                  className="download-img"
                />
              </label>
              <input
                type="file"
                id="logo"
                className="d-none"
                onChange={(e) => {
                  setLogo(e.target.files[0]);
                  setDownloadImg(URL.createObjectURL(e.target.files[0]));
                }}
              />
              <label htmlFor="logo" className="download-text">
                <span>Загрузить логотип</span>
              </label>
            </div>
            <div className="screenshots-block">
              {screenshots.map((screenshot) => (
                <div className="screenshot-block" key={screenshot.id}>
                  <img
                    src={screenshot.image}
                    alt={screenshot.id}
                    className="screenshot"
                  />
                  <img
                    src={deleteIcon}
                    alt="deleteIcon"
                    onClick={() => deleteScreenshot(screenshot.id)}
                    className="screenshot-deleteIcon"
                  />
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <input
                type="file"
                id="screenshot"
                className="d-none"
                onChange={(e) => {
                  AddScreenshot(e.target.files[0]);
                }}
              />
              <label htmlFor="screenshot" className="download-text">
                <span>Загрузить скриншоты</span>
              </label>
            </div>
            <LinksBlock
              setLinks={setLinks}
              links={links}
              projectId={project.id}
            />
          </div>
        </form>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default AddProjectPage;
