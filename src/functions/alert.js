import Swal from "sweetalert2";
import { deleteData } from "./../functions/requests";
function Alert(title, icon = "success", confirmBtnColor = "#32b482") {
  Swal.fire({
    showConfirmButton: true,
    icon: icon,
    width: 500,
    title: title,
    timer: 2000,
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
        window.location.href = "https://tele.gg/ZigmundOnline_bot";
      }, 1000);
    }
  });
}

// async function confirmAlert(title) {
//   let result = await Swal.fire({
//     title: title,
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#d33",
//     cancelButtonColor: "#32b482",
//     cancelButtonText: "Отмена",
//     confirmButtonText: "Удалить",
//   });
//   console.log(result);
//   return result.value;
// }
// const deleteMessage = (id, name) => {
//   confirmAlert(`Вы уверены что хотите удалить ${name} департамент?`).then(
//     (result) => {
//       if (result) {
//         deleteData(`department/update_destroy/${id}/`).then((res) => {
//           if (res.ok) {
//             Alert("Департамент удалена");
//             getDepartments();
//           } else if (res.status === 403) {
//             Alert("У вас нет прав для выполнения этой операции");
//           } else {
//             Alert("Повторите попытку");
//           }
//         });
//       }
//     }
//   );
// };
const deleteAlert = (title, subTitle, url, okFunction) => {
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
          okFunction();
        } else if (res.status === 403) {
          Alert("У вас нет прав для выполнения этой операции", "error");
        } else {
          Alert("Повторите попытку", "error");
        }
      });
    }
  });
};
export { deleteAlert, confirmAlert };
export default Alert;
