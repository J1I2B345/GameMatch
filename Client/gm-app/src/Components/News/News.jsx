import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNews } from "../../redux/actions";
import iconMenssage from "../../assets/iconMenssage.png";
import axios from "axios";

const News = () => {
  const dispatch = useDispatch();
  let [newsDB, setNews] = useState([]);

  const news = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(getAllNews());
  }, [dispatch]);

  if (!news) return <h2>Buscando news...</h2>;

  const deleteButton = async (news) => {
    try {
      console.log({ news });
      await axios
        .delete(
          `https://backend-gamematch.herokuapp.com/News/delete/${news._id}`
        )
        .then(() => {
          let newData = news.filter((el) => el.news._id !== news._id);

          setNews(newData);
        });
    } catch (error) {
      console.error(error.message);
    }
  };

  console.log({ news });
  return (
    <div>
      <div className="Container">
        <div className="portada">
          <h1>News</h1>
        </div>

        <div>
          {news.map((data) => (
            <div key={data._id} className="container">
              <div>
                <div>
                  <img alt="" src={iconMenssage} />
                </div>
                <div>
                  <h2 className="user">Developers</h2>
                  <div className="date">
                    {moment(data.createdAt).format("MMMM d")} at{" "}
                    {moment(data.createdAt).format("h:mm A")}
                  </div>
                </div>
              </div>
              <div className="title">{data.title}</div>
              <div className="description">{data.description}</div>
              <button
                className="delete-btn"
                onClick={(e) => deleteButton(data._id)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
