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
import "./users-page.css";
const UsersPage = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsersData] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    getData("user/").then((res) => {
      setUsersData(res);
      setLoading(true);
    });
  };

  console.log("users", users);
  return (
    <div className="wrapper">
      <Title>Пользователи</Title>
      <AddBtn url="add-user" />
      {loading ? (
        <Table striped className={"mb-5 table-3 tables"}>
          <thead>
            <tr>
              <th className={"thead-item"}>Ф. И. О.</th>
              <th className={"thead-item"}>Департамент</th>
              <th className={"thead-item"}>Статус</th>
              <th className={"thead-item"}>Номер телефона</th>
              <th className={"thead-item"}>Активные проекты</th>
              <th className={"thead-item"}>Завершенные</th>
              <th className={"thead-item"}>Статус</th>
            </tr>
          </thead>
          <tbody className={"tbody"}>
            {users.map((user) => (
              <tr key={user.id}>
                <td data-th="Ф.И.О" className={"tbody-item"}>
                  <Link to={`/user/${user.id}/`}>
                    {user.name ? user.name : "Незаполнен/неактивный"}{" "}
                    {user.surname}
                  </Link>
                </td>
                <td data-th="Департамент" className={"tbody-item"}>
                  {user.department_name}
                </td>
                <td data-th="Статус" className={"tbody-item"}>
                  {userRole[user.status]}
                </td>
                <td data-th="Номер телефона" className={"tbody-item"}>
                  {user.phone}
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
