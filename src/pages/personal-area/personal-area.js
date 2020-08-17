import React, { useEffect, useState } from "react";
import Title from "./../../components/title/title";
import { getData } from "../../functions/requests";
import Loading from "../../components/loading/loading";

import "./personal-area.css";
const UsersPage = (props) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getData(`user/${props.match.params.id}`).then((res) => {
      setUserData(res);
      setLoading(true);
    });
  }, [props.match.params.id]);
  return (
    <div className="wrapper">
      {loading ? (
        <>
          <Title link={`/edit-user/${userData.id}`}>Личный кабинет</Title>
          <div className="w-25">d</div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default UsersPage;
