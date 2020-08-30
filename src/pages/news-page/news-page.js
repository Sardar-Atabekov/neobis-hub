import React, { useEffect, useState } from "react";
import { getData } from "../../functions/requests";
import Title from "./../../components/title/title";
import arrow from "./../../assets/icons/arrow.svg";
import Loading from "../../components/loading/loading";
import AddBtn from "./../../components/buttons/add-btn";
import { Link } from "react-router-dom";
import "./news-page.css";
const NewsPage = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [firstArticle, setFirstArticle] = useState("");
  const userRights = JSON.parse(localStorage.getItem("neobisHUBDate"));

  useEffect(() => {
    getData("news/").then((res) => {
      setFirstArticle(res[0]);
      let data = res;
      delete data[0];
      setNewsData(data);
      setLoading(true);
    });
  }, []);

  return (
    <div className="wrapper">
      <Title>Новости</Title>
      {userRights.add_news ? <AddBtn url="add-news" text="Добавить" /> : null}

      {loading ? (
        <>
          <Link
            style={{
              background: `url(${firstArticle.picture}) no-repeat`,
              backgroundSize: "cover",
            }}
            to={`/article/${firstArticle.id}/`}
            className="firstArticle"
          >
            <h1 className="firstArticle-title">{firstArticle.name}</h1>
            <div className="news-flex">
              <span className="news-time">14.02.2020 </span>
              <span className="news-read">прочитать</span>
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.8"
                  d="M27.2215 11.133L33.1774 17.0889M33.1774 17.0889L27.2215 23.0448M33.1774 17.0889H1"
                  stroke="white"
                />
              </svg>
            </div>
          </Link>
          <div className="news-grid-block">
            {newsData.map((news) => (
              <Link
                className="news-block"
                to={`/article/${news.id}/`}
                key={news.id}
              >
                <img
                  src={news.picture}
                  alt={news.name}
                  className="news-background"
                />
                <div className="news-title">{news.name}</div>
                <div className="news-flex">
                  <span className="news-time">14.02.2020 </span>
                  <span className="news-read">прочитать</span>
                  <img src={arrow} alt="Arrow Img" />
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default NewsPage;
