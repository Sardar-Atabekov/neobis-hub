import React, { useEffect, useState } from "react";
import Title from "../../components/title/title";
import { getData } from "../../functions/requests";
import { confirmAlert } from "../../functions/alert";
import { userStatus } from "./../../constants/status";
import Loading from "./../../components/loading/loading";
import sortsIcon from "./../../assets/icons/Polygon 5.png";
import activeIcon from "./../../assets/icons/Ellipse 43.svg";
import noActiveIcon from "./../../assets/icons/Ellipse 44.svg";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import "./users-page.css";

const UsersPage = () => {
  const [role, setRole] = useState("false");
  const [users, setUsersData] = useState([]);
  const [status, setStatus] = useState("false");
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState("false");
  const [sortActiveProjects, setSortActiveProjects] = useState(false);
  const [sortFinishedProjects, setSortFinishedProjects] = useState(false);

  // finished_projects_count;
  const userRights = JSON.parse(localStorage.getItem("neobisHUBDate"));

  useEffect(() => {
    getData("department/")
      .then((res) => {
        setDepartments(res);
        setLoading(true);
      })
      .catch(() =>
        confirmAlert("Ошибка сервера. Напишите нам, мы всё починим.")
      );
  }, []);

  useEffect(() => {
    setLoading(false);
    getData(
      `user/?${department !== "false" ? `department=${department}` : ""}${
        role !== "false" ? `&&status=${role}` : ""
      }${status !== "false" ? `&&user__is_active=${status}` : ""}${
        searchText && `&&search=${searchText}`
      }&&page_size=9`
    ).then((res) => {
      setUsersData(res);
      setLoading(true);
    });
  }, [role, status, department, searchText]);

  useEffect(() => {
    let filteredUsers = users.sort(
      (a, b) => a.active_projects_count - b.active_projects_count
    );
    filteredUsers = sortActiveProjects
      ? filteredUsers.reverse()
      : filteredUsers;
    setUsersData([...filteredUsers]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortActiveProjects]);

  useEffect(() => {
    console.log("change");
    let filteredUsers = users.sort(
      (a, b) => a.finished_projects_count - b.finished_projects_count
    );
    filteredUsers = sortFinishedProjects
      ? filteredUsers.reverse()
      : filteredUsers;
    setUsersData([...filteredUsers]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortFinishedProjects]);

  console.log("users", users);
  return (
    <div className="wrapper">
      <Title search={true} setSearchText={setSearchText}>
        Пользователи
      </Title>
      <div className="add-btn-block">
        <div className="form-group mr-2 mb-0">
          <select
            defaultValue={department}
            className="select form-control"
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="false">Департаменты</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mr-2 mb-0">
          <select
            defaultValue={role}
            className="select form-control"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value={"false"}>Роли</option>
            <option value="h">Мембер</option>
            <option value="m">Ментор</option>
            <option value="t">Тимлид</option>
          </select>
        </div>
        <div className="form-group mr-2 mb-0">
          <select
            defaultValue={status}
            className="select form-control"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="false">Статусы</option>
            <option value={"True"}>Активные</option>
            <option value={"False"}>Неактивные</option>
          </select>
        </div>
        {userRights.add_user ? (
          <Link to={`/add-user/`} className="add-btn">
            Создать
          </Link>
        ) : null}
      </div>

      {loading ? (
        <Table striped className={"mb-5 table-3 tables"}>
          <thead>
            <tr>
              <th className={"thead-item"}>
                <span>Ф. И. О.</span>{" "}
              </th>
              <th className={"thead-item"}>
                <span>Департамент </span>
              </th>
              <th className={"thead-item "}>
                <span>Номер телефона </span>
              </th>
              <th className={"thead-item "}>
                <span>Роль </span>
              </th>
              <th className={"thead-item filters-iconBlock"}>
                <span>Активные проекты </span>
                <img
                  src={sortsIcon}
                  alt="filtersIcon"
                  onClick={() => setSortActiveProjects(!sortActiveProjects)}
                />
              </th>

              <th className={"thead-item p-1"}>
                <div className="filters-iconBlock">
                  <span className="mr-1">Завершенные</span>
                  <img
                    src={sortsIcon}
                    alt="filtersIcon"
                    onClick={() =>
                      setSortFinishedProjects(!sortFinishedProjects)
                    }
                  />
                </div>
              </th>
              {userRights.add_project ? (
                <th className={"thead-item "}>
                  <span>Статус</span>
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody className={"tbody"}>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td data-th="Ф.И.О" className={"tbody-item table-Username"}>
                    <Link
                      to={
                        userRights.user_id === user.id
                          ? `/personal/${user.id}/`
                          : `/user/${user.id}/`
                      }
                    >
                      {user.name ? user.name : user.email} {user.surname}
                    </Link>
                  </td>
                  <td data-th="Департамент" className={"tbody-item"}>
                    {user.department_name}
                  </td>
                  <td data-th="Номер телефона" className={"tbody-item"}>
                    {user.phone}
                  </td>
                  <td data-th="Статус" className={"tbody-item"}>
                    {userStatus[user.status]}
                  </td>
                  <td data-th="Активные проекты" className={"tbody-item"}>
                    {user.active_projects_count}
                  </td>
                  <td data-th="Завершенные" className={"tbody-item"}>
                    {user.finished_projects_count}
                  </td>
                  {userRights.add_project ? (
                    <td data-th="Статус" className={"tbody-item"}>
                      <img
                        src={user.is_active ? activeIcon : noActiveIcon}
                        alt="user status"
                      />
                    </td>
                  ) : null}
                </tr>
              ))
            ) : (
              <tr className="no-filter-Data">
                <td colSpan="9">Нет данных по этим параметрам</td>
              </tr>
            )}
          </tbody>
        </Table>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default UsersPage;
