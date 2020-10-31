import React, { useState, useEffect } from "react";
import Title from "../../components/title/title";
import { getData } from "../../functions/requests";
import { TimeFormat } from "./../../functions/time";
import Loading from "../../components/loading/loading";
import ImgBlock from "./../../components/img-block/img-block";
import Interweave from "interweave";

import "./article.css";
const ArticlePage = (props) => {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(false);
  const userRights = JSON.parse(localStorage.getItem("neobisHUBDate"));

  useEffect(() => {
    getData(`news/update_delete/${props.match.params.id}/`).then((res) => {
      setArticle(res);
      setLoading(true);
    });
  }, [props.match.params.id]);

  return (
    <div className="wrapper">
      <Title
        link={userRights.change_news ? `/edit-article/${article.id}/` : false}
      >
        Новости
      </Title>
      {loading ? (
        <div className="article">
          <span className="article-time">
            {TimeFormat(article.date_of_create)}
          </span>
          <h1 className="article-title mt-3">{article.name}</h1>
          <ImgBlock
            src={article.picture}
            className="article-BgImg"
            alt={article.name}
          />
          <div className="article-text">
            <Interweave content={article.text} />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default ArticlePage;
