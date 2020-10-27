import React, { useState, useEffect } from "react";
import Title from "../../components/title/title";

import Loading from "../../components/loading/loading";
import Alert, { confirmAlert } from "../../functions/alert";
import { getData, postData } from "../../functions/requests";
import "./add-user.css";

const AddUserPage = (props) => {
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    getData("department")
      .then((res) => {
        setDepartments(res);
        setLoading(true);
      })
      .catch(() =>
        confirmAlert("Ошибка сервера. Напишите нам, мы всё починим.")
      );
  }, []);

  const postUserData = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target),
      data = {};
    console.log(formData);
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // data.role = 5;
    postData("user/create", data)
      .then((response) => {
        console.log("response", response);
        if (response.Message === "Пользователь успешно создан") {
          Alert("Пользователь добавлен");
          setTimeout(() => props.history.push(`/users/`), 1000);
        } else {
          Alert(response.Message, 'error');
        }
      })
      .catch(() =>
        confirmAlert("Ошибка сервера. Напишите нам, мы всё починим.")
      );
  };

  return (
    <div className="wrapper">
      <Title>Создание пользователя </Title>
      {loading ? (
        <form className="input-blocks pt-4" onSubmit={postUserData}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="department">Департамент</label>
            <br />
            <select
              id="department"
              className="select form-control"
              name="department"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Выберите департамента
              </option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="status">Роль</label>
            <br />
            <select id="status" className="select form-control" name="status">
              <option value="h">Мембер</option>
              <option value="m">Ментор</option>
              <option value="t">Тимлид</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="role">Права</label>
            <br />
            <select id="role" className="select form-control" name="role" defaultValue="4">
              <option value="1">Менеджер клуба</option>
              <option value="2">Координатор проектов</option>
              <option value="3">Тимлид</option>
              <option value="4">Обычный пользователь</option>
            </select>
          </div>
          <div className="text-right">
            <input
              type="submit"
              className="btn add-btn w-50 mt-5"
              value="Сохранить"
            />
          </div>
        </form>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default AddUserPage;
