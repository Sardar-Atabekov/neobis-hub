import React, { useState, useEffect } from "react";
import Title from "../../components/title/title";
import Loading from "../../components/loading/loading";
import {
  getData,
  postData,
  putData,
  patchData,
} from "../../functions/requests";
import DeleteBtn from "./../../components/buttons/deleteBtn";
import { userRole, userStatus } from "../../constants/status";
import NewDepartmentIcon from "./../../assets/icons/newDepartment.svg";
import Alert, { confirmAlert } from "../../functions/alert";
// import { Table } from "reactstrap";
const AddProjectPage = (props) => {
  const [users, setUsers] = useState([]);
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  let [team, setTeam] = useState([]);

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
    });
  }, [props.match.params.id]);

  console.log("team", project, team);

  const AddUserTeam = () => {
    let user = {
      id: team.length + 1,
      user: null,
      user_role: null,
    };

    setTeam([...team, user]);
  };

  const changeUser = (id, value) => {
    team[id - 1].user = value;
    setTeam([...team]);
  };

  const changeUserRole = (id, value) => {
    team[id - 1].user_role = value;
    setTeam([...team]);
  };

  const postUserData = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target),
      data = {};
    console.log(formData);
    formData.forEach((value, key) => {
      data[key] = value;
    });
    team = team.map((item) => {
      console.log(item);
      return item;
    });
    data.team = team;
    patchData(`project/update_delete/${props.match.params.id}/`, data)
      .then((response) => {
        console.log(response);
        if (response.id) {
          Alert("Проект создан");
          // setTimeout(() => props.history.push(`/projects/`), 1000);
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
        <form className="add-user" onSubmit={postUserData}>
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
            <input
              type="text"
              name="description"
              className="form-control"
              id="description"
              defaultValue={project.description}
            />
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
              defaultValue={""}
            >
              <option value="" disabled>
                Выберите пользователя
              </option>
              {users.map((item) => (
                <option key={item.id} value={`${item.id}`}>
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
              <div key={item.id}>
                <div className="form-group">
                  <label>Пользователь {i + 1}</label>
                  <br />
                  {item.id > 0 ? (
                    <select
                      className="select form-control"
                      onChange={(e) => changeUser(i + 1, e.target.value)}
                      defaultValue={""}
                    >
                      <option value="" disabled>
                        Выберите пользователя
                      </option>
                      {users.map((item) => (
                        <option key={item.id} value={item.id}>
                          {`${item.surname} ${item.name}`}
                        </option>
                      ))}
                    </select>
                  ) : null}

                  <select
                    className="select  form-control mt-3"
                    defaultValue={""}
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
            <DeleteBtn
              title={`Вы уверены что хотите удалить проект ${project.name}?`}
              subTitle="Проект удален"
              url={`project/update_delete/${project.id}/`}
              toUrl={"/projects"}
              props={props}
            />
            <input type="submit" className="btn add-btn" value="Сохранить" />
          </div>
        </form>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default AddProjectPage;
