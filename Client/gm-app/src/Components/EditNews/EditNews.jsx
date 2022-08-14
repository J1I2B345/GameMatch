import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editNews, getNew } from "../../redux/actions";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as yup from "yup";

import { useNavigate, useParams } from "react-router-dom";

const validate = yup.object({
  title: yup.string().required().min(6),
  description: yup.string().required().min(10),
  author: yup.string().min(2),
});

export default function EditNews() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const review = useSelector((state) => state.newSelect);
  const userActive = useSelector((state) => state.userProfile);

  console.log(review);

  useEffect(() => {
    dispatch(getNew(params.id));
  }, []);

  const submit = (values) => {
    dispatch(editNews(values));
    navigate("/news");
  };

  if (!review) return <h2>Cargando</h2>;
  // {!userActive.rol === "superdmin" ? :<h2>Debes ser super admin</h2>;}

  return (
    <div className="container">
      {" "}
      <div className="portada">
        {
          <Formik
            initialValues={{
              title: review.title,
              description: review.description,
              author: review.author,
            }}
            validationSchema={validate}
            onSubmit={submit}
          >
            {(formik) => (
              <div>
                <h1 className="my-4 font-weight-bold .display-4">
                  Modificar noticia
                </h1>

                <h2>Noticia a modificar: {review.title} </h2>

                <Form>
                  <TextField
                    className="input"
                    label="Titulo"
                    name="title"
                    type="text"
                    placeholder={review.title}
                  />
                  <TextField
                    multiline
                    className="input"
                    label="Descripcion"
                    name="description"
                    type="text"
                    placeholder={review.description}
                  />
                  <TextField
                    className="input"
                    label="Niveles"
                    name="author"
                    type="text"
                    placeholder={review.author}
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
