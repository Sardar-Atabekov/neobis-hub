import React, { useEffect, useState } from "react";
import { getData } from "../../functions/requests";
import Title from "./../../components/title/title";
import arrow from "./../../assets/icons/arrow.svg";
import { TimeFormat } from "./../../functions/time";
import { Pagination } from "@material-ui/lab";
import Loading from "../../components/loading/loading";
import AddBtn from "./../../components/buttons/add-btn";
import { Link } from "react-router-dom";
import "./news-page.css";
const NewsPage = (props) => {
  const [total, setTotal] = useState("");
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [firstArticle, setFirstArticle] = useState("");
  const [page, setPage] = useState(+props.match.params.page);
  const userRights = JSON.parse(localStorage.getItem("neobisHUBDate"));

  let countArticle = 5;
  useEffect(() => {
    // setPage(props.match.params.page);
    getData(
      `news/?page=${page}${searchText && `&&search=${searchText}`}&&page_size=5`
    ).then((res) => {
      setFirstArticle(res.results[0]);
      let data = res.results;
      delete data[0];
      setTotal(res.count);
      setNewsData(data);
      setLoading(true);
    });
  }, [page, searchText]);

  console.log("page", page);
  const createPage = () => {
    let buttons = [],
      pages = Math.ceil(total / countArticle);
    for (let i = 1; i <= pages; i++) {
      buttons.push(
        <Link
          to={`/news/${i}/`}
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

  console.log("newsData", newsData, firstArticle);
  return (
    <div className="wrapper">
      <Title
        mt={"mt-3"}
        search={true}
        setSearchText={setSearchText}
        component={
          userRights.add_news ? (
            <AddBtn url="add-news" text="Добавить" className="m-0" />
          ) : null
        }
      >
        Новости
      </Title>

      {loading ? (
        <>
          {firstArticle ? (
            <Link
              style={{
                background: `url(${firstArticle.picture}) no-repeat`,
                backgroundSize: "cover",
              }}
              to={`/article/${firstArticle.id}/`}
              className="firstArticle"
            >
              <div className="firstArticle-hover">
                <h1 className="firstArticle-title">{firstArticle.name}</h1>
              </div>

              <div className="news-flex firstArticle-hover">
                <span className="news-time">
                  {TimeFormat(firstArticle.date_of_create)}
                </span>
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
          ) : null}
          <div className="news-grid-block">
            {newsData.length > 0
              ? newsData.map((news) => (
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
                      <span className="news-time">
                        {TimeFormat(news.date_of_create)}
                      </span>
                      <span className="news-read">прочитать</span>
                      <img src={arrow} alt="Arrow Img" />
                    </div>
                  </Link>
                ))
              : "Нет данных по этим параметрам"}
          </div>
          {total > countArticle ? (
            <div className="pagination-block">
              {/* {createPage()} */}
              <Pagination
                count={Math.ceil(total / countArticle)}
                page={page}
                onChange={(e, number) => {
                  setPage(number);
                  setLoading(false);
                }}
              />
            </div>
          ) : null}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default NewsPage;
