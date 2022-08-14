import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editGame, getGame } from "../../redux/actions";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as yup from "yup";

import { useNavigate, useParams } from "react-router-dom";

const validate = yup.object({
  name: yup.string().required().min(3),
  gender: yup.string().required().min(3),
  elo: yup.string().required().min(3),
  position: yup.string().required().min(3),
  image: yup.string().required().url(),
});

export default function EditGame() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const game = useSelector((state) => state.gameSelect);
  const userActive = useSelector((state) => state.userProfile);

  console.log(game);

  useEffect(() => {
    dispatch(getGame(params.id));
  }, []);

  const submit = (values) => {
    dispatch(editGame(values));
    navigate("/gamehome");
  };

  if (!game) return <h2>Cargando</h2>;
  // {!userActive.rol === "superdmin" ? :<h2>Debes ser super admin</h2>;}

  return (
    <div className="container">
      {" "}
      <div className="portada">
        {
          <Formik
            initialValues={{
              name: game.name,
              image: game.image,
              elo: game.elo,
              position: game.position,
            }}
            validationSchema={validate}
            onSubmit={submit}
          >
            {(formik) => (
              <div>
                <h1 className="my-4 font-weight-bold .display-4">
                  Modificar Juego
                </h1>

                <h2>Juego a modificar: {game.name} </h2>
                <img src={game.image} alt="" />
                <Form>
                  <TextField
                    className="input"
                    label="Nombre del Juego"
                    name="name"
                    type="text"
                    placeholder={game.name}
                  />
                  <TextField
                    className="input"
                    label="Genero de juego"
                    name="gender"
                    type="text"
                    placeholder={game.gender}
                  />
                  <TextField
                    className="input"
                    label="Niveles"
                    name="elo"
                    type="text"
                    placeholder={game.elo}
                  />
                  <TextField
                    className="input"
                    label="Posiciones"
                    name="position"
                    type="text"
                    placeholder={game.position}
                  />
                  <TextField
                    className="input"
                    label="Imagen"
                    name="image"
                    type="text"
                    placeholder={game.image}
                  />

                  <button className="btn btn-dark mt-3" type="submit">
                    Modificar
                  </button>
                </Form>
              </div>
            )}
          </Formik>
        }
      </div>
    </div>
  );
}
