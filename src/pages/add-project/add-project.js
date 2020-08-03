import React, { useState, useEffect } from "react";
import Title from "../../components/title/title";
import Loading from "../../components/loading/loading";
import Alert, { confirmAlert } from "../../functions/alert";
import downloadIcon from "./../../assets/img/Group 115.png";
import { getData, postData } from "../../functions/requests";
import { userRole, userStatus } from "../../constants/status";
import NewDepartmentIcon from "./../../assets/icons/newDepartment.svg";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ruDateLocale from "date-fns/locale/ru";
import { format, addDays, addMonths } from "date-fns";
import "./add-project.css";
import axios from "axios";
registerLocale("ru", ruDateLocale);
// import { Table } from "reactstrap";
const AddProjectPage = (props) => {
  const [file, setFile] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [finishDate, setFinishDate] = useState(addMonths(new Date(), 1));
  // const [startDate, setStartDate] = useState(new Date());
  let [team, setTeam] = useState([
    {
      id: 1,
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
    formData.forEach((value, key) => {
      data[key] = value;
    });

    formData.append("name", data.name);
    formData.append("logo", file);
    formData.append("pm", data.pm);
    formData.append("description", data.description);
    formData.append("date_of_finish", finishDate);
    formData.append("date_of_start", startDate);
    formData.append("product_owner", data.product_owner);
    formData.append("status", data.status);
    formData.append("team", data.team);

    team = team.map((item) => {
      delete item.id;
      return item;
    });
    data.team = team;

    let token = JSON.parse(localStorage.getItem("neobisHUBDate")).token;
    axios
      .post("http://46.101.236.211:8477/project/create/", formData, {
        headers: {
          "Content-Type":
            "multipart/form-data; boundary=<calculated when request is sent>",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        if (response.data.id) {
          Alert("Проект создан");
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
      <Title>Создание проекта </Title>
      {loading ? (
        <form className="mt-5 d-flex" onSubmit={postUserData}>
          <div className="form-block mr-5">
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
              <input
                type="text"
                name="description"
                required
                className="form-control"
                id="description"
              />
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
                    {item.name}
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
                <option value="s">Завершенный</option>
              </select>
            </div>
            <div className="mt-2">
              <label htmlFor="description">Пользователи в проекте</label>
              <br />
              {team.map((item) => (
                <div key={item.id}>
                  <div className="form-group">
                    <label>Пользователь {item.id}</label>
                    <br />
                    <select
                      className="select form-control"
                      onChange={(e) => changeUser(item.id, e.target.value)}
                      defaultValue=""
                      required
                    >
                      <option value="" disabled name={`user${item.id}`}>
                        Выберите пользователя
                      </option>
                      {users.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <select
                      className="select  form-control mt-3"
                      defaultValue=""
                      required
                      onChange={(e) => changeUserRole(item.id, e.target.value)}
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
          <div>
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
                <span>Загрузить логотип</span>
              </label>
            </div>
          </div>
        </form>
      ) : null}
    </div>
  );
};
export default AddProjectPage;
