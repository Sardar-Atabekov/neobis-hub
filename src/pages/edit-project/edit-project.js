import React, { useState, useEffect } from "react";
import Title from "../../components/title/title";
import Loading from "../../components/loading/loading";
import Alert, { confirmAlert } from "../../functions/alert";
import downloadIcon from "./../../assets/img/Group 115.png";
import DeleteBtn from "./../../components/buttons/deleteBtn";
import deleteIcon from "./../../assets/icons/deleteIcon.svg";
import {
  getData,
  patchData,
  patchFilesData,
  putFilesData,
} from "../../functions/requests";
// import { userRole, userStatus } from "../../constants/status";
import NewDepartmentIcon from "./../../assets/icons/newDepartment.svg";
import "./edit-project.css";
import axios from "axios";
const AddProjectPage = (props) => {
  let [team, setTeam] = useState([]);
  const [users, setUsers] = useState([]);
  const [logo, setLogo] = useState(false);
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloadImg, setDownloadImg] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(false);

  const userRights = JSON.parse(localStorage.getItem("neobisHUBDate"));

  useEffect(() => {
    getData("user/").then((res) => {
      setUsers(res);
      setLoadingUsers(true);
    });
  }, []);

  useEffect(() => {
    getData(`project/${props.match.params.id}`).then((res) => {
      setProject(res);
      setTeam(res.team);
      setLoading(true);
      setDownloadImg(res.logo ? res.logo : downloadIcon);
    });
  }, [props.match.params.id]);

  const AddUserTeam = () => {
    let user = {
      id: team.length + 1,
      name: null,
      user_role: null,
    };

    setTeam([...team, user]);
  };

  const changeUser = (id, value) => {
    team[id - 1].name = value;
    setTeam([...team]);
  };

  const changeUserRole = (id, value) => {
    team[id - 1].user_role = value;
    setTeam([...team]);
  };

  const deleteUser = (id) => {
    delete team[id];
    team = team.filter((item) => item);
    setTeam([...team]);
  };
  
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
      item.user = users.filter((user) => {
        console.log("item", item);
        console.log("user", user);
        return `${user.surname} ${user.name}` == item.name;
      })[0].id;
      delete item.name;
      console.log(item.user, item.user);
      console.log("item", item);
      // item.user = +item.user;
      return item;
    });
    data.pm = users.filter(
      (item) => `${item.surname} ${item.name}` == data.pm
    )[0].id;
    data.team = team;

    if (logo) {
      logoData.append("logo", logo);
      putFilesData(`project/logo/${project.id}/`, logoData)
        .then((response) => {
          console.log(response);
          if (response.id) {
            Alert("Данные проекта изменен");
            // setTimeout(() => props.history.push(`/projects/`), 1000);
          } else {
            Alert(response.error ? response.error : response.detail, "error");
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

  return (
    <div className="wrapper">
      <Title>Редактирования проекта </Title>
      {loading && loadingUsers ? (
        <form className="flex-block" onSubmit={postProjectData}>
          <div className="mr-5 input-blocks">
            <div className="new-department-title-block mb-3">
              <img
                src={NewDepartmentIcon}
                alt="NewDepartmentIcon "
                className="mr-3"
              />
              <span className="new-department-title">
                Редактирования проекта{" "}
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
              <label htmlFor="pm">ПМ</label>
              <select
                className="select form-control"
                name="pm"
                id="pm"
                defaultValue={project.pm_name}
              >
                <option value="" disabled>
                  Выберите пользователя
                </option>
                {users.map((item) => (
                  <option key={item.id} value={`${item.surname} ${item.name}`}>
                    {`${item.surname} ${item.name}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group d-flex">
              <div className="w-50 mr-3">
                <label htmlFor="date_of_start">Дата начала </label>
                <br />
                <input
                  type="text"
                  name="date_of_start"
                  className="form-control"
                  placeholder="2000-11-11"
                  id="date_of_start"
                  defaultValue={project.date_of_start}
                />
              </div>
              <div className="w-50">
                <label htmlFor="date_of_finish">Дата завершения</label>
                <br />

                <input
                  type="text"
                  name="date_of_finish"
                  placeholder="2000-12-20"
                  className="form-control"
                  defaultValue={project.date_of_finish}
                  id="date_of_finish"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="status">Статус</label>
              <br />
              <select id="status" className="select form-control" name="status">
                <option value="a">Активный</option>
                <option value="f">Заморожен</option>
                <option value="s">Завершенный</option>
              </select>
            </div>
            <div className="mt-2">
              <label htmlFor="description">Пользователи в проекте</label>
              <br />
              {team.map((item, i) => (
                <div key={i} className="user-project">
                  <div className="form-group w-100">
                    <label>Пользователь {i + 1}</label>
                    <br />
                    <select
                      className="select form-control"
                      onChange={(e) => changeUser(i + 1, e.target.value)}
                      defaultValue={item.name ? item.name : ""}
                    >
                      <option value="" disabled>
                        Выберите пользователя
                      </option>
                      {users.map((user) => (
                        <option
                          key={user.id}
                          value={`${user.surname} ${user.name}`}
                        >
                          {`${user.surname} ${user.name}`}
                        </option>
                      ))}
                    </select>

                    <select
                      className="select  form-control mt-3"
                      defaultValue={item.user_role ? item.user_role : ""}
                      onChange={(e) => changeUserRole(i + 1, e.target.value)}
                    >
                      <option value="" disabled>
                        Выберите роль
                      </option>
                      <option value={1}>Front-End разработчик</option>
                      <option value={2}>Backend разработчик</option>
                      <option value={3}>Дизайнер</option>
                      <option value={4}>IOS разработчик</option>
                      <option value={5}>Android разработчик</option>
                    </select>
                  </div>
                  <div>
                    <img src={deleteIcon} onClick={() => deleteUser(i)} />
                  </div>
                </div>
              ))}
              <div
                onClick={AddUserTeam}
                className="btn btnSumbit btnUser add-btn"
              >
                Добавить пользователя
              </div>
            </div>
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
          </div>{" "}
          <div>
            <div className="text-center">
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
          </div>
        </form>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default AddProjectPage;
