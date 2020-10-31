import React, { useState } from "react";
import neobisLogo from "./../../assets/logo/neobisHub.svg";
import { postDataNoToken } from "../../functions/requests";
import { Button, FormGroup, Form, Input } from "reactstrap";
import forgetPassword from "./../../assets/img/forget-password.png";
import "./forget-password.css";

const ForgetPasswordPage = (props) => {
  const [error, setError] = useState(false);
  const postUserData = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target),
      data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log(data);
    postDataNoToken("user/send_code/", data)
      .then((response) => {
        console.log(response);
        if (response.user_id) {
          props.history.push(`/password-recovery/${response.user_id}/`);
        }
      })
      .catch(() => setError(true));
  };

  return (
    <div className="loginWrapper">
      <div className="d-flex">
        <div className="login w-50 text-left">
          <img src={neobisLogo} alt="neobis logo" />
          <h1 className="forget-password">Восстановление пароля</h1>
          <div className="forget-password-subTitle">
            Введите ваш email, который был использован в системе
          </div>

          <Form className="loginForm" onSubmit={postUserData}>
            <FormGroup>
              <Input
                className="loginInput"
                type="email"
                placeholder="Email"
                name="email"
                required
              />
            </FormGroup>
            {error ? (
              <div className="errorMessage">Неправильный email или пароль</div>
            ) : null}
            <Button className="loginInput loginBtn button">Отправить</Button>
          </Form>
        </div>
        <div className="loginImg w-50">
          <img src={forgetPassword} alt="forgetPassword" />
        </div>
      </div>
    </div>
  );
};
export default ForgetPasswordPage;
