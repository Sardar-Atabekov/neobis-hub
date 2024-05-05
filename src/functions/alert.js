import Swal from "sweetalert2";
import { deleteData } from "./../functions/requests";
function Alert(
  title,
  icon = "success",
  confirmBtnColor = "#32b482",
  time = 2000
) {
  return Swal.fire({
    showConfirmButton: true,
    icon: icon,
    width: 500,
    title: title,
    timer: time,
    confirmButtonColor: confirmBtnColor,
    // confirmButtonText: "ок",
  });
}

function confirmAlert(title) {
  Swal.fire({
    width: 500,
    height: 500,
    showConfirmButton: true,
    icon: "error",
    showCancelButton: true,
    confirmButtonColor: "#32b482",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Написать в поддержку",
    cancelButtonText: "ОК",
    title: title,
  }).then((result) => {
    if (result.value) {
      setTimeout(() => {
        window.location.href = "https://neobis.kg/";
      }, 1000);
    }
  });
}

const deleteAlert = (title, subTitle, url, toUrl, props) => {
  Swal.fire({
    title: title,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#32b482",
    cancelButtonText: "Отмена",
    confirmButtonText: "Удалить",
  }).then((result) => {
    if (result.value) {
      deleteData(url).then((res) => {
        if (res.ok) {
          Alert(subTitle);
          console.log("props", props);
          setTimeout(() => props.history.push(toUrl), 1000);
        } else if (res.status === 403) {
          Alert("У вас нет прав для выполнения этой операции", "error");
        } else {
          confirmAlert("Ошибка сервера. Напишите нам, мы всё починим.");
        }
      });
    }
  });
};
export { deleteAlert, confirmAlert };
export default Alert;
