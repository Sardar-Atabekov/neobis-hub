import React, { useState, useEffect } from "react";
import Title from "../../components/title/title";
import "react-datepicker/dist/react-datepicker.css";
import { format, addDays, addMonths } from "date-fns";
import Team from "./../../components/team-block/team";
import { postData, getData } from "../../functions/requests";
import Alert, { confirmAlert } from "../../functions/alert";
import DatePicker, { registerLocale } from "react-datepicker";
import NewDepartmentIcon from "./../../assets/icons/newDepartment.svg";
import { projectType } from "../../constants/status";
import ruDateLocale from "date-fns/locale/ru";
import "./add-project.css";

registerLocale("ru", ruDateLocale);

const AddProjectPage = (props) => {
  const [season, setSeason] = useState([]);
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [finishDate, setFinishDate] = useState(
    format(addMonths(new Date(), 1), "yyyy-MM-dd")
  );

  const [team, setTeam] = useState([
    {
      user: null,
      user_role: null,
    },
  ]);

  useEffect(() => {
    getData(`project/season/`).then((res) => {
      setSeason(res);
    });
  }, [props.match.params.id]);

  const postUserData = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target),
      data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    data.team = team;
    data.date_of_start = startDate;
    data.date_of_finish = finishDate;
    console.log("data", data);

    postData("project/create", data)
      .then((response) => {
        console.log("response", response);
        if (response.id) {
          Alert("Проект добавлена");
          setTimeout(() => props.history.push(`/projects/1/`), 1000);
        } else {
          Alert(response.detail, "error");
        }
      })
      .catch(() =>
        confirmAlert("Ошибка сервера. Напишите нам, мы всё починим.")
      );
  };

  console.log("season", season);
  return (
    <div className="wrapper">
      <Title>Создание проекта </Title>
      <form className="flex-block project-label" onSubmit={postUserData}>
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
            <label htmlFor="status">Статус</label>
            <br />
            <select id="status" className="select form-control" name="status">
              <option value="a">Активный</option>
              <option value="f">Заморожен</option>
              <option value="c">Завершенный</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="season">Сезон</label>
            <br />
            <select
              id="season"
              className="select form-control"
              name="season"
              defaultValue=""
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
              defaultValue=""
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
          <Team team={team} setTeam={setTeam} />
          <div className="text-right">
            <input
              type="submit"
              className="btn add-btn w-50 mt-5"
              value="Сохранить"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default AddProjectPage;
