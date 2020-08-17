import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import neobisLogo from "./../../assets/logo/logo.svg";
import peopleImg from "./../../assets/img/people.png";
import userIcon from "./../../assets/navbar-icon/user.svg";
import newsIcon from "./../../assets/navbar-icon/news 2.svg";
import usersIcon from "./../../assets/navbar-icon/users 1.svg";
import projectIcon from "./../../assets/navbar-icon/layers 1.svg";
import departmentIcon from "./../../assets/navbar-icon/graduation 1.svg";
import Swal from "sweetalert2";
import "./navbar.css";

const NavBar = () => {
  // const [active, setActive] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const confirmMessage = () => {
    Swal.fire({
      title: "Вы уверены?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#32b482",
      cancelButtonColor: "#d33",
      cancelButtonText: "Нет",
      confirmButtonText: "Да, выйти",
    }).then((result) => {
      if (result.value) {
        localStorage.removeItem("neobisHUBDate");
        window.location.href = "/";
      }
    });
  };

  let id = JSON.parse(localStorage.getItem("neobisHUBDate")).user_id -1;
  return (
    <nav className="navigationComponent text-left">
      <Link to={"/departments/"}>
        <img src={neobisLogo} className="neobis_logo" alt="neobisLogo" />
      </Link>
      <Link to={"/news/"} className="categories">
        <img src={newsIcon} alt="newsIcon" />
        Новости
      </Link>
      <Link to={`/personal/${id}`} className="categories">
        <img src={userIcon} alt="newsIcon" />
        Личный кабинет
      </Link>
      <Link to={"/users/"} className="categories">
        <img src={usersIcon} alt="usersIcon" />
        Пользователи
      </Link>
      <Link to={"/departments/"} className="categories">
        <img src={departmentIcon} alt="departmentIcon" />
        Департаменты
      </Link>
      <Link to={"/projects/"} className="categories">
        <img src={projectIcon} alt="projectIcon" />
        Проекты
      </Link>
      <div className="categories" onClick={confirmMessage}>
        Выйти
      </div>

      <div className="quote-block">
        <span>
          «Чтобы понять код мидла, нужно быть мидлом. Чтобы понять код сеньора,
          достаточно быть джуном».
        </span>
        <img src={peopleImg} alt="peopleImg" />
      </div>
    </nav>
  );
};

// const Category = ({ children }) => {
//   return (
//     <Link to={"/projects/"} className="categories">
//       Проекты
//     </Link>
//   );
// };
export default NavBar;
