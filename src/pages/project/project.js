import React, { useState, useEffect } from "react";
import { getData } from "../../functions/requests";
import Title from "./../../components/title/title";
import pmIcon from "./../../assets/icons/pmIcon.svg";
import truckIcon from "./../../assets/icons/truck.svg";
import Loading from "../../components/loading/loading";
import AddBtn from "./../../components/buttons/add-btn";
import {
  projectType,
  projectStatus,
  projectUserRole,
} from "./../../constants/status";
import "./project.css";
// import { Table } from "reactstrap";
const ProjectsPage = (props) => {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState([]);

  useEffect(() => {
    getData(`project/${props.match.params.id}`).then((res) => {
      console.log(res);
      setProject(res);
      setLoading(true);
    });
  }, [props.match.params.id]);

  console.log(project);
  return (
    <div className="wrapper">
      <Title link={`/edit-project/${props.match.params.id}`}>Проект</Title>
      {loading ? (
        <div>
          <div className="project-info mt-4">
            <div className="w-50 mr-5">
              <div className="project-title-block">
                <img src={truckIcon} alt="icon project" />
                <h3>{project.name}</h3>
                <span className={`project-status a`}>{project.status}</span>
              </div>
              <div className="mt-3 p-3">{project.description}</div>
            </div>
            <div className="d-flex mt-5 ml-5">
              <div className="mr-5">
                <b>Дата начала:</b>
                <br />
                <span>{project.date_of_start}</span>
              </div>
              <div>
                <b>Дата завершения:</b>
                <br />
                <span>{project.date_of_finish}</span>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h5>Команда</h5>
            <div className="d-flex">
              {project.team.map((developer) => (
                <div className="team-people">
                  <span className="pmIcon">
                    <img src={pmIcon} alt="pm department icon" />
                  </span>
                  <span className="mt-1">
                    {projectUserRole[developer.user_role]}
                  </span>
                  <b className="mt-1">{developer.name}</b>
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex mt-5">
            <div className="product-owner">
              <b className="mt-1">Заказчик</b>
              <span className="mt-1">{project.product_owner}</span>
            </div>
            <div></div>
          </div>
          {/* <div className="mt-4">
            <h5>Скриншоты</h5>
            <div></div>
          </div> */}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default ProjectsPage;
