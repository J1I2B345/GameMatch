import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGame } from "../../redux/actions";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as yup from "yup";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const validate = yup.object({
  name: yup.string().required().min(3),
  gender: yup.string().required().min(3),
  elo: yup.string().required().min(3),
  position: yup.string().required().min(3),
  image: yup.string().required().url(),
});

export default function CreateGame() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (values, actions) => {
    console.log({ values });
    dispatch(createGame(values));
    alert("Juego creado");
    actions.resetForm();
  };
  return (
    <Container>
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
        <button onClick={(e) => navigate("/panel")}>Ir a Panel</button>
        <button onClick={(e) => navigate("/gamehome")}>Ir a Juegos</button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #5f0f99;
  .image-game {
    margin-top: 2rem;
    height: 12rem;
  }
  html,
  body {
    height: 100%;
    min-height: 100%;
    max-height: 100%;
  }
  .image {
    margin-top: 2rem;
    height: 3rem;
  }
  .login-link {
    color: #f0ebf2;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }
  h1 {
    color: #f0ebf2;
    text-transform: uppercase;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #9a01e2;
    color: #f2f0f1;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
