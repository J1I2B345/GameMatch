import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGame } from "../../redux/actions";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as yup from "yup";
import "./CreateGame.css";

const validate = yup.object({
  name: yup.string().required().min(3),
  gender: yup.string().required().min(3),
  elo: yup.string().required().min(3),
  position: yup.string().required().min(3),
  image: yup.string().required().url(),
});

export default function CreateGame() {
  const dispatch = useDispatch();

  const submit = (values, actions) => {
    dispatch(createGame(values));
    alert("Juego creado");
    actions.resetForm();
  };

  return (
    <div className="container">
      <div className="portada">
        {
          <Formik
            initialValues={{
              name: "",
              gender: "",
              elo: "",
              position: "",
              image: "",
            }}
            validationSchema={validate}
            onSubmit={submit}
          >
            {(formik) => (
              <div>
                <h1 className="my-4 font-weight-bold .display-4">
                  Crea tu juego
                </h1>
                <Form>
                  <TextField
                    className="input"
                    label="Nombre del Juego"
                    name="name"
                    type="text"
                    placeholder="Nombre del juego"
                  />
                  <TextField
                    className="input"
                    label="Genero de juego"
                    name="gender"
                    type="text"
                    placeholder="Genero del juego"
                  />
                  <TextField
                    className="input"
                    label="Niveles"
                    name="elo"
                    type="text"
                    placeholder="Niveles de jugadores"
                  />
                  <TextField
                    className="input"
                    label="Posiciones"
                    name="position"
                    type="text"
                    placeholder="Posiciones de jugadores"
                  />
                  <TextField
                    className="input"
                    label="Imagen"
                    name="image"
                    type="text"
                    placeholder="Imagen en url"
                  />
                  <button className="btn btn-dark mt-3" type="submit">
                    Crear Juego
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
