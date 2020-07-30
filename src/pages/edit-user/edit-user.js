import React, { useEffect, useState } from "react";
import { getData } from "../../functions/requests";
import Title from "./../../components/title/title";
import Loading from "../../components/loading/loading";

// import { Table } from "reactstrap";
const USerPage = (props) => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState([]);
    const [departments, setDepartments] = useState([]);
    useEffect(() => {
        getData("department/").then((res) => {
            console.log(res);
            setDepartments(res);
            setLoading(true);
        });
    }, []);

    useEffect(() => {
        getData(`user/${props.match.params.id}`).then((res) => {
            setUserData(res);
            setLoading(true);
        });
    }, [props.match.params.id]);

    // const getDepartment = () => {
    //     getData(`department/${props.match.params.id}`).then((res) => {
    //         setDepartment(res);
    //         setLoading(true);
    //     });
    // };

    console.log('userData', userData);
    return (
        <div className="wrapper">
            {
                loading ? <><Title link={`/edit-user/${userData.id}`}>Редактировать личный данные</Title>
                    <form className="add-user">
                        <div className="form-group">
                            <label htmlFor="email">Имя</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                id="name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="surname">Фамилия</label>
                            <input
                                type="email"
                                name="surname"
                                className="form-control"
                                id="surname"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="telegram">Фамилия</label>
                            <input
                                type="text"
                                name="telegram"
                                className="form-control"
                                id="telegram"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Номер телефона</label>
                            <input
                                type="text"
                                name="phone"
                                className="form-control"
                                id="phone"
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
                    </form></> : <Loading />
            }

        </div>
    );
};
export default USerPage;
