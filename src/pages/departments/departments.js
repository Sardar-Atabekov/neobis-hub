import React, { useEffect, useState } from "react";
import { getData } from "../../functions/requests";
import Title from "./../../components/title/title";
import PythonImg from "./../../assets/img/python.png";
import Loading from "../../components/loading/loading";
import AddBtn from "./../../components/buttons/add-btn";
import PythonIcon from "./../../assets/icons/python.svg";
import { Link } from "react-router-dom";
import "./departments.css";
// import { Table } from "reactstrap";
const DepartmentsPage = () => {
    const [loading, setLoading] = useState(false);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        getDepartments();
    }, []);

    const getDepartments = () => {
        getData("department/").then((res) => {
            console.log(res);
            setDepartments(res);
            setLoading(true);
        });
    };

    console.log(departments);
    return (
        <div className="wrapper">
            <Title>Департаменты</Title>
            <AddBtn url="add-department" />
            {
                loading ?
                    <div className="grid" >
                        {
                            departments.map(department =>
                                <Link className="department" key={department.id} to={`/department/${department.id}`}>
                                    <div>
                                        <div className="icon-block">
                                            <img src={PythonIcon} alt="PythonIcon" />
                                        </div>
                                        <h4>{department.name} department</h4>
                                        <span>{department.count} человек</span>
                                        <div className="counts-department">
                                            <span className="mentor_count">Менторы: {department.mentor_count}</span>
                                            <span>Мемберы: {department.count - department.mentor_count}</span>
                                        </div>
                                    </div>
                                    <img src={PythonImg} alt="PythonImg" className="bgDepartment" />
                                </Link>
                            )
                        }
                    </div> : <Loading />
            }
        </div>
    );
};
export default DepartmentsPage;
