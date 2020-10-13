import React, { useState, useEffect } from "react";
import { getData } from "../../functions/requests";
import deleteIcon from "./../../assets/icons/deleteIcon.svg";

import "./team.css";

const AddNewsPage = ({ team, setTeam, pmID }) => {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rolesLoading, setRolesLoading] = useState(false);

  useEffect(() => {
    getData("user/").then((res) => {
      setUsers(res);
      setLoading(true);
    });
    getData("project/role/").then((res) => {
      setRoles(res);
      setRolesLoading(true);
    });
  }, [loading, pmID]);

  const AddUserTeam = () => {
    let user = {
      user: null,
      user_role: null,
    };

    setTeam([...team, user]);
  };

  const changeUser = (id, value) => {
    team[id].user = value;
    setTeam([...team]);
  };

  const changeUserRole = (id, value) => {
    team[id].user_role = value;
    setTeam([...team]);
  };

  const deleteUser = (id) => {
    delete team[id];
    team = team.filter((item) => item);
    setTeam([...team]);
  };
  return (
    <div className="mt-2">
      {loading ? (
        <div className="form-group">
          <label htmlFor="pm">ПМ проекта</label>
          <select
            className="select form-control"
            name="pm"
            id="pm"
            required
            defaultValue={pmID ? pmID : ""}
          >
            <option value="" disabled>
              Выберите пользователя
            </option>
            {loading &&
              users.map((item) => (
                <option key={item.id} value={item.id}>
                  {`${item.surname} ${item.name}`}
                </option>
              ))}
          </select>
        </div>
      ) : null}

      <label htmlFor="description">Пользователи в проекте</label>
      <br />
      {rolesLoading &&
        loading &&
        team.map((item, i) => (
          <div key={i} className="user-project">
            <div className="form-group w-100">
              <select
                className="select form-control"
                onChange={(e) => changeUser(i, e.target.value)}
                defaultValue={item.user ? item.user : ""}
                required
              >
                <option value="" disabled name={`user${i}`}>
                  Выберите пользователя
                </option>
                {users.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.surname}
                    {item.name ? item.name : item.email}
                  </option>
                ))}
              </select>
              <select
                className="select  form-control mt-3"
                defaultValue={item.user_role ? item.user_role : ""}
                required
                onChange={(e) => changeUserRole(i, e.target.value)}
              >
                <option value="" disabled>
                  Выберите роль
                </option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <img
                src={deleteIcon}
                onClick={() => deleteUser(i)}
                alt="deleteIcon"
              />
            </div>
          </div>
        ))}
      <div onClick={AddUserTeam} className="btn btnSumbit btnUser add-btn">
        Добавить пользователя
      </div>
    </div>
  );
};
export default AddNewsPage;
