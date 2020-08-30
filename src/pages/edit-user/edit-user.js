import React, { useEffect, useState } from "react";
import Title from "./../../components/title/title";
import Loading from "../../components/loading/loading";
import Alert, { confirmAlert } from "../../functions/alert";
import DeleteBtn from "./../../components/buttons/deleteBtn";
import { getData, patchData } from "../../functions/requests";

const EditUserPage = (props) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const userRights = JSON.parse(localStorage.getItem("neobisHUBDate"));

  useEffect(() => {
    getData("department/")
      .then((res) => {
        console.log(res);
        setDepartments(res);
      })
      .catch(() =>
        confirmAlert("Ошибка сервера. Напишите нам, мы всё починим.")
      );
  }, []);

  useEffect(() => {
    getData(`user/${props.match.params.id}`)
      .then((res) => {
        setUserData(res);
        setLoading(true);
      })
      .catch(() =>
        confirmAlert("Ошибка сервера. Напишите нам, мы всё починим.")
      );
  }, [props.match.params.id]);

  const postUserData = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target),
      data = {};
    console.log(formData);
    formData.forEach((value, key) => {
      data[key] = value;
    });

    data.department = departments.filter(
      (department) => department.name === data.department
    )[0].id;

    patchData(`user/update/${props.match.params.id}/`, data)
      .then((response) => {
        if (response.id) {
          Alert("Данные пользователя обновлен");
          setTimeout(() => props.history.push(`/users/`), 1000);
        } else {
          Alert(response.error, "error");
        }
      })
      .catch(() =>
        confirmAlert("Ошибка сервера. Напишите нам, мы всё починим.")
      );
  };
  console.log("userData", userData);
  return (
    <div className="wrapper">
      <Title>Редактировать данные пользователя</Title>
      {loading ? (
        <form className="input-blocks mt-4" onSubmit={postUserData}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              className="form-control"
              id="email"
              defaultValue={userData.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="department">Департамент</label>
            <br />
            <select
              id="department"
              className="select form-control"
              name="department"
              defaultValue={
                userData.department_name ? userData.department_name : ""
              }
            >
              <option value="" disabled>
                Выберите департамента
              </option>
              {departments.map((department) => (
                <option key={department.id} value={department.name}>
                  {department.name}
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
              defaultValue={userData.status}
            >
              <option value="h">Мембер</option>
              <option value="m">Ментор</option>
              <option value="t">Тимлид</option>
            </select>
          </div>
          <div className="button-block">
            {userRights.delete_user ? (
              <DeleteBtn
                title={`Вы уверены что хотите удалить пользователя ${userData.name}?`}
                subTitle="Пользователь удален"
                url={`user/delete/${userData.id}/`}
                toUrl={"/users/"}
                props={props}
              />
            ) : null}

            <input type="submit" className="btn add-btn" value="Сохранить" />
          </div>
        </form>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default EditUserPage;
