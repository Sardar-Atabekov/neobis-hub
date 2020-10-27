import React, { useEffect, useState } from "react";
import { getData } from "../../functions/requests";
import Title from "./../../components/title/title";
import bgImg from "./../../assets/img/Group 77 (1).png";
import Loading from "../../components/loading/loading";
import AddBtn from "./../../components/buttons/add-btn";
import { Link } from "react-router-dom";
import "./departments.css";
// import { Table } from "reactstrap";
const DepartmentsPage = () => {
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const userRights = JSON.parse(localStorage.getItem("neobisHUBDate"));

  const colors = [
    "#07B755",
    "#FD5A01",
    "#0300A6",
    "#555555",
    "#E93C05",
    "#FFA902",
    "#115EF8",
    "#4723A9",
  ];
  useEffect(() => {
    getData("department").then((res) => {
      console.log(res);
      setDepartments(res);
      setLoading(true);
    });
  }, []);

  console.log(departments);
  return (
    <div className="wrapper">
      <Title
        mt={"mt-3"}
        component={
          userRights.add_department ? (
            <AddBtn url="add-department" className="m-0" />
          ) : null
        }
      >
        Департаменты
      </Title>
      {loading ? (
        <div className="grid">
          {departments.map((department, i) => (
            <Link
              className="department"
              key={department.id}
              to={`/department/${department.id}/`}
              style={{ background: colors[i] }}
              //   style={{ backgroundImage: `url(${department.background})` }}
            >
              <div className="department-info">
                <div className="icon-block">
                  <img src={department.logo} alt={department.name} />
                </div>
                <h4 className="mt-1">{department.name} department</h4>
                <span className="people-count">{department.count} человек</span>
                <div className="counts-department">
                  <span className="mentor_count">
                    Менторы: {department.mentor_count}
                  </span>
                </div>
              </div>
              <img
                src={department.background ? department.background : bgImg}
                alt={department.name}
                className="bgDepartment"
              />
            </Link>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default DepartmentsPage;
