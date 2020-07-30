import React, { useState, useEffect } from "react";
import { getData } from "../../functions/requests";
import { projectType, projectStatus } from "./../../constants/status";
import Title from "./../../components/title/title";
import pmIcon from "./../../assets/icons/pmIcon.svg";
import truckIcon from "./../../assets/icons/truck.svg";
import AddBtn from "./../../components/buttons/add-btn";


import "./projects.css";
import Loading from "../../components/loading/loading";
// import { Table } from "reactstrap";
const ProjectsPage = () => {
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        getProjects();
    }, []);

    const getProjects = () => {
        getData("project/").then((res) => {
            console.log(res);
            setProjects(res);
            setLoading(true);
        });
    };

    return (
        <div className="wrapper">
            <Title>Проекты</Title>
            <AddBtn url="add-project" />
            {
                loading ? <div className="grid">
                    {
                        projects.map(project =>
                            <div className="project" key={project.id}>
                                <div className="flex-start project-block">
                                    <img src={truckIcon} alt="Cargo truck" className="projectIcon" />
                                    <div className="project-description text-left">
                                        <h5 className="project-name">{project.name}</h5>
                                        <span className="project-span">{projectType[project.project_type]}</span>
                                        <span className="pmIcon" >
                                            <img src={pmIcon} alt="pm department icon" />
                                        </span>
                                        <span className="project-span">Проектный менеджер</span>
                                        <p className="project-pm">{project.pm.name} {project.pm.surname} </p>
                                    </div>
                                    <span className={`project-status ${project.status ? project.status : "a"}`} >
                                        {project.status ? projectStatus[project.status] : "Активный"}
                                    </span>
                                </div>
                                <div className="line-status"></div>
                            </div>
                        )
                    }
                </div> : <Loading />
            }

        </div>
    );
};
export default ProjectsPage;
