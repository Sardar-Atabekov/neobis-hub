import React, { useState } from "react";
import neobisLogo from "./../../assets/logo/neobisHub.svg";
import { postDataNoToken } from "../../functions/requests";
import { Button, FormGroup, Form, Input } from "reactstrap";
import "./login-page.css";

const LoginPage = (props) => {
  const [error, setError] = useState(false);
  const postUserData = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target),
      data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log(data);
    postDataNoToken("user/login/", data)
      .then((response) => {
        console.log(response);
        if (response.token) {
          localStorage.setItem("neobisHUBDate", JSON.stringify(response));
          setTimeout(() => (window.location.href = `/departments`), 500);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true));
  };
  
  if (localStorage.getItem("neobisHUBDate")) {
    props.history.push(`/users/`);
  }
  return (
    <div className="loginWrapper">
      <div className="d-flex">
        <div className="login w-50 text-left">
          <img src={neobisLogo} alt="neobis logo" />
          <h1>Welcome!</h1>
          {/* <h2></h2> */}
          <Form className="loginForm" onSubmit={postUserData}>
            <FormGroup>
              <Input
                className="loginInput"
                type="text"
                placeholder="Логин"
                name="email"
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                className="loginInput"
                type="password"
                placeholder="Пароль"
                name="password"
                required
              />
            </FormGroup>
            {error ? (
              <div className="errorMessage">Неправильный email или пароль</div>
            ) : null}
            <Button className="loginInput loginBtn button">Войти</Button>
          </Form>
        </div>
        <div className="loginImg w-50">
          {/* <img src={loginImg} /> */}
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
