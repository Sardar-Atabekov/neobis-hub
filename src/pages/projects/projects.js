import React, { useState, useEffect } from "react";
import { getData } from "../../functions/requests";
import Title from "./../../components/title/title";
import pmIcon from "./../../assets/icons/pmIcon.svg";
import Loading from "../../components/loading/loading";
import downloadIcon from "./../../assets/img/Group 115.png";
import { projectType, projectStatus } from "./../../constants/status";
import { Link } from "react-router-dom";
import "./projects.css";

const ProjectsPage = (props) => {
  const [total, setTotal] = useState("");
  const [type, setType] = useState("false");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("false");
  const [season, setSeason] = useState("false");
  const [searchText, setSearchText] = useState("");
  const [seasonData, setSeasonData] = useState([]);
  const [page, setPage] = useState(props.match.params.page);
  const userRights = JSON.parse(localStorage.getItem("neobisHUBDate"));

  useEffect(() => {
    setLoading(false);
    setPage(props.match.params.page);
    getData(
      `project/?${status !== "false" ? `status=${status}&&` : ""}page=${page}${
        type !== "false" ? `&&project_type=${type}` : ""
      }${season !== "false" ? `&&season=${season}` : ""}${
        searchText && `&&search=${searchText}`
      }&page_size=9`
    ).then((res) => {
      setProjects(res);
      setTotal(res.count);
      setLoading(true);
    });
    getData(`project/season`).then((res) => {
      setSeasonData(res);
    });
  }, [type, season, status, searchText, page]);

  const createPage = () => {
    let buttons = [],
      pages = Math.ceil(total / 9);
    for (let i = 1; i <= pages; i++) {
      buttons.push(
        <Link
          to={`/projects/${i}/`}
          key={i}
          className={i === +page ? "btn pg-btn active-btn " : "btn pg-btn"}
          onClick={() => {
            setPage(i);
            setLoading(false);
          }}
        >
          {i}
        </Link>
      );
    }
    return buttons;
  };

  console.log("projects", projects);
  return (
    <div className="wrapper">
      <Title search={true} setSearchText={setSearchText}>
        Проекты
      </Title>
      <div className="add-btn-block">
        <div className="form-group mr-2 mb-0">
          <select
            className="select form-control"
            defaultValue={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="false">Статусы</option>
            <option value="a">Активный</option>
            <option value="f">Заморожен</option>
            <option value="c">Завершенный</option>
          </select>
        </div>
        <div className="form-group mr-2 mb-0">
          <select
            className="select form-control"
            defaultValue={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="false">Типы проектов</option>
            {Object.entries(projectType).map((item) => (
              <option value={item[0]} key={item[0]}>
                {item[1]}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mr-2 mb-0">
          <select
            className="select form-control"
            defaultValue={status}
            onChange={(e) => setSeason(e.target.value)}
          >
            <option value="false">Сезоны</option>
            {seasonData.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        {userRights.add_project ? (
          <Link to={`/add-project/`} className="add-btn">
            Создать
          </Link>
        ) : null}
      </div>
      {loading ? (
        <>
          <div className="grid">
            {projects.length > 0
              ? projects.map((project) => (
                  <Link
                    to={`/project/${project.id}/`}
                    key={project.id}
                    className="project"
                  >
                    <div className="flex-start project-block mb-1">
                      <img
                        src={project.logo ? project.logo : downloadIcon}
                        alt="Cargo truck"
                        className="projectIcon"
                      />
                      <div className="project-description text-left">
                        <h5 className="project-name">{project.name}</h5>
                        <span className="project-span">
                          {projectType[project.project_type]}
                        </span>
                        <span className="userRole-icon">
                          <img src={pmIcon} alt="pm department icon" />
                        </span>
                        <span className="project-span">Проектный менеджер</span>
                        <p className="project-pm">{project.pm}</p>
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
                    <div className="line-status">
                      <span className="percentage">
                        {/* {project.progress}  */}
                        100%
                      </span>
                    </div>
                  </Link>
                ))
              : "Нет данных по этим параметрам"}
          </div>
          {total > 9 ? (
            <div className="pagination-block">{createPage()}</div>
          ) : null}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default ProjectsPage;
