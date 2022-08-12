import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNews } from "../../redux/actions";
import { Link } from "react-router-dom";
import iconMenssage from "../../assets/iconMenssage.png";
import editProfile from "../../assets/editProfile.png";
import axios from "axios";

const News = () => {
  const dispatch = useDispatch();

  const news = useSelector((state) => state.news);
  // let [newsDB, setNews] = useState([]);

  // useEffect(() => {
  //   dispatch(getAllNews());
  // }, [dispatch]);

  // const deleteButton = async (review) => {
  //   try {
  //     console.log({ review });
  //     await axios
  //       .delete(`https://backend-gamematch.herokuapp.com/News/${review}`)
  //       .then(() => {
  //         let newData = newsDB.filter((el) => el.review !== review);

  //         setNews(newData);
  //       });
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  console.log({ news });
  return (
    <div>
      {
        (news.length = null ? (
          <div className="Container">
            <div className="portada">
              <h1>News</h1>
            </div>

            <div style={{ alignItems: "center" }}>
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
                </div>
              ))}
            </div>

            <Link
              to="/news"
              activeOpacity={1}
              underlayColor={""}
              style={{
                position: "absolute",
                bottom: 80,
                left: 20,
                height: 45,
              }}
            >
              <img src={editProfile} alt="" />
            </Link>
          </div>
        ) : (
          <div>loading</div>
        ))
      }
    </div>
  );
};

export default News;
