import React, { useEffect, useState } from "react";
import { getData } from "../../functions/requests";
import phoneIcon from "./../../assets/icons/phone.svg";
import Loading from "../../components/loading/loading";
import EditIcon from "./../../assets/icons/bxs-edit 3.svg";
import downloadIcon from "./../../assets/img/Group 115.png";
import summaryIcon from "./../../assets/icons//summary.svg";
import telegramIcon from "./../../assets/icons/telegram.svg";
import mailSendIcon from "./../../assets/icons/bx-mail-send.svg";
import TestBlock from "./../../components/test-block/test-block";
import StudyPlan from "./../../components/study-plan/study-plan";
import {
  userStatus,
  projectType,
  projectStatus,
} from "./../../constants/status";
import { Link } from "react-router-dom";
import "./personal-area.css";

const PersonalAreaPage = (props) => {
  const [tests, setTests] = useState([]);
  const [roles, setRoles] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [roleLoading, setRolesLoading] = useState(false);
  const [activeProjectTab, setActiveProjectTab] = useState(true);

  useEffect(() => {
    getData(`user/${props.match.params.id}/`).then((res) => {
      res.telegram = res.telegram.replace("@", "");
      setUserData(res);
      setLoading(true);
      setTests(res.progress);
    });
    getData("project/role/").then((res) => {
      setRoles(res);
      setRolesLoading(true);
    });
  }, [props.match.params.id]);

  const userRole = (roleId) => {
    return roles.filter((role) => role.id === roleId)[0]
      ? roles.filter((role) => role.id === roleId)[0].name
      : "Роль удален";
  };

  console.log("userData", userData, roles);
  return (
    <div className="wrapper personal-area ">
      {loading && roleLoading ? (
        <div className="personal-block">
          <div className="w-60">
            <div className="tab-block">
              <span
                onClick={() => setActiveProjectTab(true)}
                className={`${activeProjectTab ? "active-tab" : ""}`}
              >
                Проекты
              </span>
              <span
                onClick={() => setActiveProjectTab(false)}
                className={`${activeProjectTab ? "" : "active-tab"}`}
              >
                Прогресс
              </span>
            </div>
            <div>
              {activeProjectTab ? (
                <>
                  {userData.projects.length > 0 ? (
                    <div className="user-projects">
                      {userData.projects.map((project) => (
                        <Link
                          key={project.project}
                          to={`/project/${project.project}`}
                          className="project"
                        >
                          <div className="flex-start project-block">
                            <img
                              src={
                                project.project_logo
                                  ? `${project.project_logo}`
                                  : downloadIcon
                              }
                              alt={project.name}
                              className="projectIcon"
                            />
                            <div className="project-description text-left">
                              <h5 className="project-name">{project.name}</h5>
                              <span className="project-span">
                                {
                                  projectType[
                                    project.project_type
                                      ? project.project_type
                                      : 1
                                  ]
                                }
                              </span>
                            </div>
                            <span
                              className={`project-status ${
                                project.status ? project.status : "a"
                              }`}
                            >
                              {project.status
                                ? projectStatus[project.status]
                                : "Активный"}
                            </span>
                          </div>
                          <div className="user-role">
                            <span className="userRole-icon">
                              <img
                                src={
                                  project.user_role_logo
                                    ? project.user_role_logo
                                    : downloadIcon
                                }
                                alt="role"
                              />
                            </span>
                            <span className="project-span">
                              {userRole(project.user_role)}
                            </span>
                          </div>

                          <div className="line-status">
                            <span className="percentage">100%</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="noProject-text mt-3">
                      <h1>
                        Привет, {userData.name ? userData.name : userData.email}
                        !
                      </h1>
                      У вас пока нет активных или завершенных проектов. После
                      успешного прохождения стадиплана вас добавят в новый
                      проект. Продолжайте идти к своей цели!
                    </div>
                  )}
                </>
              ) : (
                <div className="mt-4">
                  <div className="d-flex">
                    <StudyPlan
                      icon={userData.department_logo}
                      department={userData.department_name}
                    />
                    {tests.length > 0 ? (
                      <TestBlock
                        tests={tests}
                        className="box-shadow w-50 ml-5"
                      />
                    ) : null}
                  </div>
                </div>
              )}
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
              <div className="user-picture">
                <img
                  src={userData.photo ? userData.photo : downloadIcon}
                  alt="user-img"
                  className="userPhoto"
                />
                <span className="user-department">
                  <img
                    src={
                      userData.photo ? userData.department_logo : downloadIcon
                    }
                    alt={userData.department_name}
                  />
                </span>
              </div>
              <h4 className="user-name">
                {userData.name} {userData.surname}
              </h4>
              <div className="user-departmentName mt-3 mb-2">
                {userData.department_name}
              </div>
              <span className="user-status">{userStatus[userData.status]}</span>
            </div>
            <div className="contacts-block">
              <a className="contact-block" href={`mailto:${userData.email}`}>
                <img src={mailSendIcon} alt="mailSendIcon" />
                <span> {userData.email}</span>
              </a>
              {userData.phone ? (
                <a className="contact-block" href={`tel:${userData.phone}`}>
                  <img src={phoneIcon} alt="phoneIcon" />{" "}
                  <span>{userData.phone}</span>
                </a>
              ) : null}
              {userData.telegram ? (
                <a
                  className="contact-block"
                  href={`https://t.me/${userData.telegram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={telegramIcon} alt="telegramIcon" />
                  <span>@{userData.telegram}</span>
                </a>
              ) : null}
            </div>
            <div className="pt-2">
              {userData.summary ? (
                <a
                  className="contact-block"
                  href={userData.summary}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={summaryIcon} alt="summaryIcon" />
                  <span>Резюме</span>
                </a>
              ) : null}
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
