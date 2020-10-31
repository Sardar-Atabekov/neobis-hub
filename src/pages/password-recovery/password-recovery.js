import React, { useState } from "react";
import neobisLogo from "./../../assets/logo/neobisHub.svg";
import { postDataNoToken } from "../../functions/requests";
import { Button, FormGroup, Form, Input } from "reactstrap";
import forgetPassword from "./../../assets/img/forget-password.png";

const ForgetPasswordPage = (props) => {
  const [error, setError] = useState(false);

  const postPasswordData = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target),
      data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log(data);
    data.user_id = props.match.params.id;
    postDataNoToken("user/password_recovery/", data)
      .then((response) => {
        if (response.Message) {
          props.history.push(`/`);
        }
      })
      .catch(() => setError(true));
  };
  // if (localStorage.getItem("neobisHUBDate")) {
  //   props.history.push(`/news/`);
  // }
  return (
    <div className="loginWrapper">
      <div className="d-flex">
        <div className="login w-50 text-left">
          <img src={neobisLogo} alt="neobis logo" />
          <h1 className="forget-password">Восстановление пароля</h1>
          <div className="forget-password-subTitle">
            Введите код, который был отправлен вам на почту
          </div>
          <Form className="loginForm" onSubmit={postPasswordData}>
            <FormGroup>
              <Input
                className="loginInput"
                type="text"
                placeholder="Код"
                name="code"
                defaultValue=""
                required
              />
              <Input
                className="loginInput"
                type="text"
                placeholder="Новый пароль"
                name="password"
                required
              />
              <Input
                className="loginInput"
                type="password_repeat"
                placeholder="Повторите пароль"
                name="password_repeat"
                required
              />
            </FormGroup>
            {error ? (
              <div className="errorMessage">Неправильный email или пароль</div>
            ) : null}
            <Button className="loginInput loginBtn button">Сохранить</Button>
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
