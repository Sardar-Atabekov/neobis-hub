import React, { useState, useEffect } from "react";
import Title from "../../components/title/title";
import "react-datepicker/dist/react-datepicker.css";
import { format, addDays, addMonths } from "date-fns";
// import Loading from "../../components/loading/loading";
import Alert, { confirmAlert } from "../../functions/alert";
import { postData, getData } from "../../functions/requests";
import DatePicker, { registerLocale } from "react-datepicker";
import NewDepartmentIcon from "./../../assets/icons/newDepartment.svg";
import { userRole, userStatus, projectType } from "../../constants/status";
import ruDateLocale from "date-fns/locale/ru";
import "./add-project.css";
import axios from "axios";
registerLocale("ru", ruDateLocale);
// import { Table } from "reactstrap";
const AddProjectPage = (props) => {
  // const [type, setType] = useState("false");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [finishDate, setFinishDate] = useState(
    format(addMonths(new Date(), 1), "yyyy-MM-dd")
  );
  // const [startDate, setStartDate] = useState(new Date());
  let [team, setTeam] = useState([
    {
      number: 1,
      user: null,
      user_role: null,
    },
  ]);

  useEffect(() => {
    getData("user/").then((res) => {
      console.log(res);
      setUsers(res);
      setLoading(true);
    });
  }, []);

  const AddUserTeam = () => {
    let user = {
      number: team.length + 1,
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

    team = team.map((item) => {
      delete item.number;
      item.user_role = +item.user_role;
      item.user = +item.user;
      return item;
    });
    formData.forEach((value, key) => {
      data[key] = value;
    });

    data.team = team;
    data.pm = +data.pm;
    data.project_type = +data.project_type;
    data.date_of_start = startDate;
    data.date_of_finish = finishDate;
    console.log("data", data);

    postData("project/create/", data)
      .then((response) => {
        console.log("response", response);
        if (response.id) {
          Alert("Новость добавлена");
          setTimeout(() => props.history.push(`/projects/`), 1000);
        } else {
          Alert(response.detail, "error");
        }
      })
      .catch(() =>
        confirmAlert("Ошибка сервера. Напишите нам, мы всё починим.")
      );
  };

  return (
    <div className="wrapper">
      <Title>Создание проекта </Title>
      {loading ? (
        <form className="flex-block" onSubmit={postUserData}>
          <div className="form-block mr-5 input-blocks">
            <div className="new-department-title-block mb-3">
              <img
                src={NewDepartmentIcon}
                alt="NewDepartmentIcon "
                className="mr-3"
              />
              <span className="new-department-title">Новый проект </span>
            </div>
            <div className="form-group">
              <label htmlFor="name">Наименование проекта</label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Краткое описание</label>
              <textarea
                type="text"
                name="description"
                required
                className="form-control"
                id="description"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="product_owner">Продукт Овнер</label>
              <input
                type="text"
                name="product_owner"
                required
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
                required
                defaultValue=""
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
            </div>
            <div className="form-group d-flex">
              <div className="w-50 mr-3">
                <label htmlFor="date_of_start">Дата начала </label>
                <br />
                <DatePicker
                  locale="ru"
                  className="form-control"
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
              <label htmlFor="status">Статус</label>
              <br />
              <select id="status" className="select form-control" name="status">
                <option value="a">Активный</option>
                <option value="f">Заморожен</option>
                <option value="c">Завершенный</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="type">Тип проекта</label>
              <select
                id="type"
                className="select form-control"
                defaultValue=""
                required
                name="project_type"
                // onChange={(e) => setType(e.target.value)}
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
            <div className="mt-2">
              <label htmlFor="description">Пользователи в проекте</label>
              <br />
              {team.map((item) => (
                <div key={item.number}>
                  <div className="form-group">
                    <label>Пользователь {item.number}</label>
                    <br />
                    <select
                      className="select form-control"
                      onChange={(e) => changeUser(item.number, e.target.value)}
                      defaultValue=""
                      required
                    >
                      <option value="" disabled name={`user${item.number}`}>
                        Выберите пользователя
                      </option>
                      {users.map((item) => (
                        <option key={item.id} value={item.id}>
                          {`${item.surname} ${item.name}`}
                        </option>
                      ))}
                    </select>
                    <select
                      className="select  form-control mt-3"
                      defaultValue=""
                      required
                      onChange={(e) =>
                        changeUserRole(item.number, e.target.value)
                      }
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
            <div className="text-right">
              <input
                type="submit"
                className="btn add-btn w-50 mt-5"
                value="Сохранить"
              />
            </div>
          </div>
        </form>
      ) : null}
    </div>
  );
};
export default AddProjectPage;
