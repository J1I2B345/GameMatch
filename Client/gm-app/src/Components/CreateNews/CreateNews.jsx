import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNews } from "../../redux/actions";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as yup from "yup";
import "./CreateGame.css";

const validate = yup.object({
  title: yup.string().required().min(6),
  description: yup.string().required().min(10),
  author: yup.string().min(2),
});

export default function CreateNews() {
  const dispatch = useDispatch();

  const submit = (values, actions) => {
    dispatch(createNews(values));
    alert("Noticia creada");
    actions.resetForm();
  };

  return (
    <div className="container">
      <div className="portada">
        {
          <Formik
            initialValues={{
              title: "",
              description: "",
              author: "",
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
                    label="Titulo"
                    name="title"
                    type="text"
                    placeholder="Titulo de la noticia"
                  />
                  <TextField
                    multiline
                    className="input"
                    label="Descripcion"
                    name="description"
                    type="text"
                    placeholder="Narracion"
                  />
                  <TextField
                    className="input"
                    label="Autor"
                    name="author"
                    type="text"
                    placeholder="Nombre del autor"
                  />

                  <button className="button" type="submit">
                    Crear Noticia
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
