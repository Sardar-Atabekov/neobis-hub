import React from "react";
import Title from "./../../components/title/title";
import Alert, { confirmAlert } from "../../functions/alert";
import { postData } from "../../functions/requests";

const EditPersonalAreaPage = (props) => {
  const postUserData = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target),
      data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    data.user_id = props.match.params.id;
    postData(`user/change_password/`, data)
      .then((response) => {
        if (response.id) {
          Alert("Данные обновлены");
          setTimeout(
            () => props.history.push(`/personal/${props.match.params.id.id}/`),
            1000
          );
        } else {
          Alert(response.Message, "error");
        }
      })
      .catch(() =>
        confirmAlert("Ошибка сервера. Напишите нам, мы всё починим.")
      );
  };

  return (
    <div className="wrapper">
      <Title>Изменить пароль</Title>
      <form className="flex-block" onSubmit={postUserData}>
        <div className="input-blocks">
          <div className="form-group">
            <label htmlFor="past_password">Старый пароль</label>
            <input
              type="text"
              required
              name="past_password"
              className="form-control"
              id="past_password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="text"
              required
              name="password"
              className="form-control"
              id="password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="repeat_password">Повторите пароль</label>
            <input
              type="text"
              required
              name="repeat_password"
              className="form-control"
              id="repeat_password"
            />
          </div>
          <div className="button-block">
            <input type="submit" className="btn add-btn" value="Сохранить" />
          </div>
        </div>
      </form>
    </div>
  );
};
export default EditPersonalAreaPage;
