import React, { useEffect, useState } from "react";
import Title from "../../components/title/title";
import { getData } from "../../functions/requests";
import { userRole } from "./../../constants/status";
import AddBtn from "./../../components/buttons/add-btn";
import Loading from "./../../components/loading/loading";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import activeIcon from "./../../assets/icons/Ellipse 43.svg";
import noActiveIcon from "./../../assets/icons/Ellipse 44.svg";
import { confirmAlert } from "../../functions/alert";
import "./users-page.css";

const UsersPage = () => {
  const [role, setRole] = useState([]);
  const [status, setStatus] = useState("all");
  const [users, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [department, setDepartment] = useState("all");
  const [departments, setDepartments] = useState([]);
  const [searchText, setSearchText] = useState("");

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
    getUsers();
  }, []);

  useEffect(() => {
    let filteredData = [];
    if (searchText != "all") {
      filteredData = filterData.filter(
        (user) => `${user.surname} ${user.name}`.search(searchText) !== -1
      );
    }

    setUsersData([...filteredData]);
  }, [searchText]);

  useEffect(() => {
    let filteredData = [];
    if (role == "all") {
      filteredData = filterData;
    } else {
      filteredData = filterData.filter((user) => user.status == role);
      console.log("filteredData", filteredData);
    }

    if (status == "all") {
      filteredData = filteredData;
    } else {
      filteredData = filterData.filter((user) => `${user.is_active}` == status);
    }

    if (department == "all") {
      filteredData = filteredData;
    } else {
      filteredData = filterData.filter(
        (user) => `${user.department_name}` == department
      );
    }

    setUsersData([...filteredData]);
  }, [role, status, department]);

  const getUsers = () => {
    getData("user/").then((res) => {
      setFilterData(res);
      setLoading(true);
      setUsersData(res);
    });
  };

  console.log(users);
  return (
    <div className="wrapper">
      <Title search={true} setSearchText={setSearchText}>
        Пользователи
      </Title>
      <AddBtn url="add-user" />
      {loading ? (
        <Table striped className={"mb-5 table-3 tables"}>
          <thead>
            <tr>
              <th className={"thead-item"}>
                <span>Ф. И. О.</span>{" "}
              </th>
              <select
                defaultValue=""
                className="filter-select"
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="all">Департамент</option>
                {departments.map((department) => (
                  <option key={department.id} value={department.name}>
                    {department.name}
                  </option>
                ))}
              </select>
              <th className={"thead-item "}>
                <span>Номер телефона </span>
              </th>
              <select
                defaultValue=""
                className="filter-select"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="all">Роль</option>
                <option value="h">Мембер</option>
                <option value="m">Ментор</option>
                <option value="t">Тимлид</option>
              </select>
              <th className={"thead-item "}>
                <span>Активные проекты </span>
              </th>
              <th className={"thead-item "}>
                <span>Завершенные</span>
              </th>
              <select
                defaultValue=""
                className="filter-select"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="all">Статус</option>
                <option value={"true"}>Активные</option>
                <option value={"false"}>Неактивные</option>
              </select>
            </tr>
          </thead>
          <tbody className={"tbody"}>
            {users.map((user) => (
              <tr key={user.id}>
                <td data-th="Ф.И.О" className={"tbody-item"}>
                  <Link to={`/user/${user.id}/`}>
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
                  {userRole[user.status]}
                </td>
                <td data-th="Активные проекты" className={"tbody-item"}>
                  {user.active_projects_count}
                </td>
                <td data-th="Завершенные" className={"tbody-item"}>
                  {user.finished_projects_count}
                </td>
                <td data-th="Статус" className={"tbody-item"}>
                  <img
                    src={user.is_active ? activeIcon : noActiveIcon}
                    alt="user status"
                  />
                </td>
                {/* <td className={"tbody-item item-more"}>
                                        <Link to={`/user/${user.id}/`}>Посмотреть</Link>
                                    </td>
                                    <td
                                        onClick={() => deleteMessage(user.id, user.name)}
                                        className={"tbody-item item-delete"}
                                    >
                                        Удалить
                                    </td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default UsersPage;
