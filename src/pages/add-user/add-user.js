import React, { useState, useEffect } from "react";
import Loading from "../../components/loading/loading";
import Title from "../../components/title/title";
import { userRole, userStatus } from "../../constants/status";
import "./add-user.css";
import { getData, postData } from "../../functions/requests";
import Alert from "../../functions/alert";
// import { Table } from "reactstrap";
const AddProjectPage = (props) => {
    const [loading, setLoading] = useState(false);
    const [departments, setDepartments] = useState([]);
    useEffect(() => {
        getData("department/").then((res) => {
            console.log(res);
            setDepartments(res);
            setLoading(true);
        });
    }, []);

    const postUserData = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target),
            data = {};
        console.log(formData);
        formData.forEach((value, key) => {
            data[key] = value;
        });

        console.log(data);
        data.patronymic = "null";
        data.summary = "null";
        postData("user/create/", data).then((response) => {
            console.log(response);
            if (response.id) {
                Alert("Пользователь добавлен");
                setTimeout(() => props.history.push(`/users`), 1000);
            } else {
                Alert(response.error, "error");
            }
        });
    };

    return (
        <div className="wrapper">
            <Title>Создание пользователя </Title>
            <form className="add-user" onSubmit={postUserData}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="email"
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
                    <label htmlFor="status">Статус</label>
                    <br />
                    <select id="status" className="select form-control" name="status">
                        <option value="h">
                            Новичок
                        </option>
                        <option value="m">
                            Ментор
                        </option>
                        <option value="t">
                            Тимлид
                        </option>
                    </select>
                </div>
                <div className="text-right"> <input
                    type="submit"
                    className="btn add-btn w-50 mt-5"
                    value="Сохранить"
                /></div>
            </form>
        </div>
    );
};
export default AddProjectPage;
