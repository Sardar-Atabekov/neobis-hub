import React from "react";
import EditIcon from "./../../assets/icons/bxs-edit 3.svg";
import { Link } from "react-router-dom";
import "./title.css";
const Title = ({ link, children }) => {
  console.log('link', link);
  return (
    <div className={"title-block my-4 my-lg-3"}>
      <h5 className={"titleStyle"}><span>{children}</span>
        {link ? <Link to={link}><img alt={'EditIcon'} src={EditIcon} /></Link> : null}
      </h5>
      <div className="line"></div>
    </div>
  );
};
export default Title;
