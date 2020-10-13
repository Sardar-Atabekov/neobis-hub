import React from "react";

const ProjectBlock = ({ id, name, logo, type, status, user_role_logo }) => {
  return (
    <Link key={id} to={`/project/${id}`} className="project">
      <div className="flex-start project-block">
        <img
          src={logo ? `http://46.101.236.211:8477${logo}` : downloadIcon}
          alt={name}
          className="projectIcon"
        />
        <div className="project-description text-left">
          <h5 className="project-name">{name}</h5>
          <span className="project-span">{projectType[type ? type : 1]}</span>
        </div>
        <span className={`project-status ${status ? status : "a"}`}>
          {status ? projectStatus[status] : "Активный"}
        </span>
      </div>
      <div className="user-role">
        <span className="userRole-icon">
          <img
            src={
              user_role_logo
                ? `http://46.101.236.211:8477${user_role_logo}`
                : downloadIcon
            }
            alt="pm department icon"
          />
        </span>
        <span className="project-span">{userRole(user_role)}</span>
      </div>

      <div className="line-status">
        <span className="percentage">100%</span>
      </div>
    </Link>
  );
};
export default ProjectBlock;
