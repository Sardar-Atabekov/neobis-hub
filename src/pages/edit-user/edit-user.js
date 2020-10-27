import React, { useEffect, useState } from "react";
import Title from "./../../components/title/title";
import Loading from "../../components/loading/loading";
import Alert, { confirmAlert } from "../../functions/alert";
import DeleteBtn from "./../../components/buttons/deleteBtn";
import TestsBlock from "./../../components/test-block/test-block";
import { getData, patchData, postData } from "../../functions/requests";
import "./edit-user.css";
const EditUserPage = (props) => {
  const [tests, setTests] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const userRights = JSON.parse(localStorage.getItem("neobisHUBDate"));

  useEffect(() => {
    getData("department")
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
        let isActive = `${res.is_active}`;
        let firstSymbol = isActive[0].toUpperCase(),
          symbol = isActive.substring(1, isActive.length);
        isActive = firstSymbol.concat(symbol);
        res.is_active = isActive;
        setUserData(res);
        setLoading(true);
        setTests(res.progress);
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
  const [points, setPoints] = useState("");
  const [testName, setTestName] = useState("");

  const AddTest = () => {
    postData(`user/study_progress/create`, {
      user: userData.id,
      test_name: testName,
      points: points,
    })
      .then((response) => {
        if (response.id) {
          setPoints("");
          setTestName("");
          setTests([...tests, response]);
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
        <form className="d-flex" onSubmit={postUserData}>
          <div className="input-blocks mt-4" onSubmit={postUserData}>
            {userRights.change_user ? (
              <div>
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
                  <label htmlFor="status">Роль</label>
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
                <div className="form-group mb-5">
                  <label htmlFor="is_active">Статус</label>
                  <br />
                  <select
                    id="is_active"
                    className="select form-control"
                    name="is_active"
                    defaultValue={userData.is_active}
                  >
                    <option value={"True"}>Активный</option>
                    <option value={"False"}>Не активный</option>
                  </select>
                </div>
              </div>
            ) : null}
            {userRights.add_study_plan ? (
              <div className="mt-5">
                <h4 className="user-info-title">Тесты</h4>
                <div className="form-group">
                  <label htmlFor="test_name">Название теста</label>
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    id="test_name"
                    onChange={(e) => setTestName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="points">Набранный балл</label>
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    id="points"
                    onChange={(e) => setPoints(+e.target.value)}
                  />
                </div>
                <div className="button-block justify-content-end">
                  <span className="btn add-btn" onClick={AddTest}>
                    Добавить тест
                  </span>
                </div>
              </div>
            ) : null}
          </div>
          {userRights.add_study_plan ? (
            <div className="study-plans">
              <TestsBlock tests={tests} />
            </div>
          ) : null}
          <div className="button-block mt-auto w-30 ps-20">
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
