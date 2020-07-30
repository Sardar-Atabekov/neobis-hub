import React from "react";
// import { Button, FormGroup, Form, Input } from "reactstrap";
import img4 from "./../../assets/img/Rectangle 443.png";
import Title from "./../../components/title/title";
import "./news-page.css";
const LoginPage = () => {


    return (
        <div className="wrapper">
            <Title >Новости</Title>
            <div className="news-block">
                <img src={img4} alt="img4" />
                <div className="news-title" >Mail.ru для бизнеса собирает онлайн-встречу по информационной безопасности‎ </div>
                <div>
                    <span>14.02.2020 </span>
                    <span>прочитать</span>
                </div>
            </div>
        </div>
    );
};
export default LoginPage;
