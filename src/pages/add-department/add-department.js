import React, { useState } from "react";
import Alert from "../../functions/alert";
import Title from "./../../components/title/title";
import downloadIcon from "./../../assets/img/Group 115.png";
import { postData } from "../../functions/requests";
import NewDepartmentIcon from "./../../assets/icons/newDepartment.svg";
import axios from 'axios';
import "./add-department.css";
// import { Table } from "reactstrap";
const AddDepartmentPage = (props) => {
    const [file, setFile] = useState('');
    const [name, setName] = useState('');
    const postUserData = (e) => {
        let token = JSON.parse(localStorage.getItem("neobisHUBDate")).token;
        e.preventDefault();
        let formData = new FormData(e.target),
            data = {};
        formData.append('logo', file);
        formData.forEach((value, key) => {
            data[key] = value;
        });
        console.log('file', file);
        console.log(data, formData);
        // axios
        //     .post(
        //         "https://cors-anywhere.herokuapp.com/http://46.101.236.211:8477/department/create/",
        //         {
        //             name: name,
        //             logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/63/IMG_%28business%29.svg/1200px-IMG_%28business%29.svg.png',
        //         }, {
        //         headers: {
        //             Accept: "application/json",
        //             "Content-Type": "application/json",
        //             Authorization: `Token ${token}`,
        //             "Access-Control-Allow-Origin": "*",
        //             "Access-Control-Allow-Credentials": true,
        //         },
        //     }).then(item => console.log(item));

        postData("department/create/", { formData, name: name }).then((response) => {
            console.log(response);
            if (response.id) {
                Alert("Департамент создан");
                setTimeout(() => props.history.push(`/departments/`), 1000);
            } else {
                Alert(response.error ? response.error : response.detail, "error");
            }
        });
    };
    return (
        <div className="wrapper">
            <Title>Cоздание департамента </Title>
            <form className="add-department" onSubmit={postUserData}>
                <div className="new-department-title-block">
                    <img src={NewDepartmentIcon} alt="NewDepartmentIcon " className="mr-3" />
                    <span className="new-department-title">Новый департамент </span>
                </div>
                <div className="download-icon">
                    <label htmlFor="userProfilePicture" className="text-center">
                        <img src={downloadIcon} alt="NewDepartmentIcon " className="downloadIcon" />
                    </label>
                    <input
                        type="file"
                        id="userProfilePicture"
                        className="d-none"
                        onChange={e => setFile(e.target.files[0])}
                    />
                    <label htmlFor="userProfilePicture" className="download-text">
                        <span>Загрузить картинку</span>
                    </label>
                </div>
                <div className="name">
                    <span>НАЗВАНИЕ ДЕПАРТАМЕНТА </span>
                    <input className="form-control"
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div>
                    <div className="text-right"> <input
                        type="submit"
                        className="btn add-btn"
                        value="Сохранить"
                    /></div>
                </div>
            </form>
        </div>
    );
};
export default AddDepartmentPage;
