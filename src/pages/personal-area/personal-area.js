import React, { useEffect, useState } from "react";
import { getData } from "../../functions/requests";
import pmIcon from "./../../assets/icons/pmIcon.svg";
import phoneIcon from "./../../assets/icons/phone.svg";
import Loading from "../../components/loading/loading";
import EditIcon from "./../../assets/icons/bxs-edit 3.svg";
import downloadIcon from "./../../assets/img/Group 115.png";
import summaryIcon from "./../../assets/icons//summary.svg";
import telegramIcon from "./../../assets/icons/telegram.svg";
import mailSendIcon from "./../../assets/icons/bx-mail-send.svg";
import { userRole, projectUserRole } from "./../../constants/status";
import { Link } from "react-router-dom";
import "./personal-area.css";

const PersonalAreaPage = (props) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData(`user/${props.match.params.id}`).then((res) => {
      setUserData(res);
      setLoading(true);
    });
  }, [props.match.params.id]);

  console.log("userData", userData);
  return (
    <div className="wrapper personal-area ">
      {loading ? (
        <div className="personal-block">
          <div className="w-60">
            <div className="tab-block">
              <span className="active-tab">Проекты</span>
              <span>Прогресс</span>
            </div>
            <div>
              <div className="user-projects">
                {userData.projects.map((project) => (
                  <Link
                    key={project.project}
                    to={`/project/${project.project}`}
                    className="project"
                  >
                    <div className="flex-start project-block">
                      <img
                        src={project.project_logo}
                        alt="Cargo truck"
                        className="projectIcon"
                      />
                      <div className="project-description text-left">
                        <h5 className="project-name">{project.name}</h5>
                        <span className="project-span">
                          Мобильное приложение
                        </span>
                      </div>
                      <span className={`project-status a`}>Активный</span>
                    </div>
                    <div className="user-role">
                      <span className="pmIcon">
                        <img src={pmIcon} alt="pm department icon" />
                      </span>
                      <span className="project-span">
                        {projectUserRole[project.user_role]}
                      </span>
                    </div>

                    <div className="line-status">
                      <span className="percentage">100%</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="w-30 personalInfo-block">
            <div className="personalTitle-block">
              <span>Личные данные </span>
              <div>
                <Link to={`/personal-edit/${props.match.params.id}/`}>
                  <img alt={"EditIcon"} src={EditIcon} />
                </Link>
              </div>
            </div>
            <div className="photo-block">
              <img
                src={userData.photo ? userData.photo : downloadIcon}
                alt="user-img"
                className="userPhoto"
              />
              <h4>
                {userData.name} {userData.surname}
              </h4>
              <b>{userData.department_name}</b>
              <br />
              <span>{userRole[userData.status]}</span>
            </div>
            <div className="contacts-block">
              <span>
                <img src={mailSendIcon} alt="mailSendIcon" /> {userData.email}
              </span>
              <span>
                <img src={phoneIcon} alt="phoneIcon" /> {userData.phone}
              </span>
              <span>
                <img src={telegramIcon} alt="telegramIcon" />
                {userData.telegram}
              </span>
            </div>
            <div className="pt-4">
              <span>
                <img src={summaryIcon} alt="phoneIcon" /> Резюме
              </span>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default PersonalAreaPage;
