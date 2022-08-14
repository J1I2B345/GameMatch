import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUser } from "../../redux/actions";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ProfileCard() {
  const dispatch = useDispatch();
  let [usersDB, setUserDB] = useState([]);

  const user = useSelector((state) => state.aux);

  useEffect(() => {
    dispatch(allUser());
  }, []);

  const deleteButton = async (id) => {
    try {
      await axios
        .delete(`https://backend-gamematch.herokuapp.com/User/${id}`)
        .then(() => {
          let newData = usersDB.filter((el) => el.id !== id);

          setUserDB(newData);
        });
    } catch (error) {
      console.error(error.message);
    }
  };

  if (!user) return <h2>Buscando usuarios...</h2>;
  return (
    <div>
      {user.map((data) => (
        <div>
          <Link to={`/Users/username/${data.username}`}>
            <div key={data.name}>
              <img className="img-game" src={data.img} alt="" key={data._id} />
              <h1>{data.username}</h1>
              <p>{data.rol}</p>
              <p>{data.password}</p>
            </div>
          </Link>
          <button
            className="delete-btn"
            onClick={(e) => deleteButton(data._id)}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}
