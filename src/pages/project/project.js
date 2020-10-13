import React, { useState, useEffect } from "react";
import { getData } from "../../functions/requests";
import Title from "./../../components/title/title";
import pmIcon from "./../../assets/icons/pmIcon.svg";
import Loading from "../../components/loading/loading";
import TrelloIcon from "./../../assets/icons/trello 1.svg";
import downloadIcon from "./../../assets/img/Group 115.png";
import ImgBlock from "./../../components/img-block/img-block";
import DocsIcon from "./../../assets/icons/communication 2.svg";
import Alert from "../../functions/alert";
import { API } from "./../../constants/API";
import { Link } from "react-router-dom";

// import {
//   projectType,
//   projectStatus,
// } from "./../../constants/status";
import "./project.css";

const ProjectPage = (props) => {
  const [roles, setRoles] = useState([]);
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(false);
  const [roleLoading, setRolesLoading] = useState(false);

  const userRights = JSON.parse(localStorage.getItem("neobisHUBDate"));

  useEffect(() => {
    getData(`project/${props.match.params.id}`)
      .then((res) => {
        let data = res;
        data.project_type_name = res.project_type_name.replace(/проект/i, "");
        setProject(data);
        setLoading(true);
      })
      .catch(() => {
        Alert(
          "У вас нет прав для просмотра этой страницы",
          "error",
          "#32b482",
          3000
        ).then((res) => props.history.push(`/projects/1/`));
      });
    getData("project/role/").then((res) => {
      setRoles(res);
      setRolesLoading(true);
    });
  }, [props.match.params.id]);

  const userRole = (roleId) => {
    return roles.filter((role) => role.id === roleId)[0]
      ? roles.filter((role) => role.id === roleId)[0].name
      : "Удаленный роль";
  };

  console.log(project);
  console.log("roles", roles);
  return (
    <div className="wrapper">
      <Title
        link={
          userRights.change_project
            ? `/edit-project/${props.match.params.id}/`
            : null
        }
      >
        Проект
      </Title>
      {loading && roleLoading ? (
        <div>
          <div className="project-info mt-4">
            <div className="w-50 mr-5">
              <div className="project-title-block">
                <ImgBlock
                  src={project.logo ? project.logo : downloadIcon}
                  alt="icon project"
                />
                <h3 className="project-name">{project.name}</h3>
                <span
                  className={`project-status ${
                    project.status === "Активный"
                      ? "a"
                      : project.status === "Заморожен"
                      ? "f"
                      : "c"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <div className="p-2 mr-1 description-project">
                  {project.description}
                </div>
                <div className="more-info pt-2">
                  {project.season_name && (
                    <span
                      className={`project-status ${
                        project.status === "Активный"
                          ? "a"
                          : project.status === "Заморожен"
                          ? "f"
                          : "c"
                      }`}
                    >
                      {project.season_name}
                    </span>
                  )}
                  {project.project_type && (
                    <span
                      className={`project-status mt-2 ${
                        project.status === "Активный"
                          ? "a"
                          : project.status === "Заморожен"
                          ? "f"
                          : "c"
                      }`}
                    >
                      {project.project_type_name}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="project-time-block ml-5">
              <div className="line-status">
                <span className="percentage">100%</span>
              </div>
              <div className="project-times">
                <div>
                  <b>Дата начала:</b>
                  <span>{project.date_of_start}</span>
                </div>
                <span className="red-point"></span>
                <div>
                  <b>Дата завершения:</b>
                  <span>{project.date_of_finish}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h4 className="bold-p">Команда</h4>
            <div className="team-block">
              <Link className="team-people" to={`/user/${project.pm}/`}>
                <span className="userRole-icon icon-block">
                  <img src={pmIcon} alt="pm department icon" />
                </span>
                <span className="mt-1 developer-role">Проект Менеджер</span>
                <b className="mt-1 developer-name">{project.pm_name}</b>
              </Link>
              {project.team.map((developer) => (
                <Link
                  className="team-people"
                  key={developer.id}
                  to={`/user/${developer.user}/`}
                >
                  <span className="userRole-icon">
                    <img
                      src={
                        developer.user_role_logo
                          ? developer.user_role_logo
                          : downloadIcon
                      }
                      alt="user role icon"
                    />
                  </span>
                  <span className="mt-1 developer-role">
                    {userRole(developer.user_role)}
                  </span>
                  <b className="mt-1 developer-name">{developer.name}</b>
                </Link>
              ))}
            </div>
          </div>
          <div className="d-flex mt-5">
            <div className="product-owner w-25">
              <h4 className="mt-1 bold-p">Заказчик</h4>
              <span className="mt-1">{project.product_owner}</span>
            </div>
            {project.links.length > 0 ? (
              <div className="product-owner">
                <h4 className="mt-1 bold-p">Документы</h4>
                <div className="project-links">
                  {project.links.map((link) => (
                    <a href={link.link}>
                      <img
                        alt={link.name}
                        src={link.name === "trello" ? TrelloIcon : DocsIcon}
                      />
                      <span>{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          {project.screenshots.length > 0 ? (
            <div className="mt-4">
              <h4 className="bold-p">Скриншоты</h4>
              <div className="project-screenshots">
                {project.screenshots.map((screenshot) => (
                  <div key={screenshot.id}>
                    <ImgBlock
                      src={screenshot.image}
                      alt={screenshot.id}
                      className="screenshot"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default ProjectPage;
