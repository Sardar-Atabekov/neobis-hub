import React, { useEffect, useState } from "react";
import { getData } from "../../functions/requests";
import Title from "./../../components/title/title";
import { userRole } from "./../../constants/status";
import Loading from "../../components/loading/loading";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import "./department.css";

const DepartmentPage = (props) => {
  const [role, setRole] = useState("all");
  const [users, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const userRights = JSON.parse(localStorage.getItem("neobisHUBDate"));

  useEffect(() => {
    getData(`department/${props.match.params.id}`).then((res) => {
      setDepartment(res);
      setLoading(true);
      setFilterData(res.users);
      setUsersData(res.users);
    });
  }, [props.match.params.id]);

  useEffect(() => {
    let filteredData = [];
    if (role === "all") {
      filteredData = filterData;
    } else {
      filteredData = filterData.filter((user) => user.status === role);
    }

    setUsersData([...filteredData]);
  }, [role, filterData]);

  return (
    <div className="wrapper">
      {loading ? (
        <>
          <Title
            link={
              userRights.change_department
                ? `/edit-department/${department.id}/`
                : false
            }
          >
            {department.name} департамент
          </Title>
          <div>
            <div className="mt-4 mb-5 department-block">
              <div className="icon-block">
                <img src={department.logo} alt={department.name} />
              </div>
              <h4 className="department-name">{department.name} департамент</h4>
              <div className="d-flex mt-3">
                <div className="head-block">
                  <span>Тимлид департамента:</span>
                  <span className="head-name">{department.head_name}</span>
                </div>
                <div>
                  <span>{department.count} человек</span>
                  <div className="counts">
                    <span className="mr-5">
                      Менторы: {department.mentor_count}{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="department-users">
              <span>Список участников </span>
              <Table striped className={"mb-5 mt-4 table-3 tables"}>
                <thead>
                  <tr>
                    <th className={"thead-item"}>Ф. И. О.</th>
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
                    <th className={"thead-item"}>Номер телефона</th>
                    <th className={"thead-item"}>Активные проекты</th>
                    <th className={"thead-item"}>Завершенные</th>
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

                      <td data-th="role" className={"tbody-item"}>
                        {userRole[user.status]}
                      </td>
                      <td data-th="Номер телефона" className={"tbody-item"}>
                        {user.phone}
                      </td>
                      <td data-th="Номер телефона" className={"tbody-item"}>
                        {user.active_projects_count}
                      </td>
                      <td data-th="Номер телефона" className={"tbody-item"}>
                        {user.finished_projects_count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default DepartmentPage;
