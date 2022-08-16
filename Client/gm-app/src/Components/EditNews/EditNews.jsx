import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editNews, getNew } from "../../redux/actions";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as yup from "yup";
import styled from "styled-components";
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
  // const userActive = useSelector((state) => state.userProfile);

  // console.log(review);

  useEffect(() => {
    dispatch(getNew(params.id));
  }, []);

  const submit = (values, actions) => {
    dispatch(editNews(values));
    // navigate("/news");
  };

  if (!review) return <h2>Cargando</h2>;
  // {!userActive.rol === "superdmin" ? :<h2>Debes ser super admin</h2>;}

  return (
    <Container>
      <div className="portada">
        {
          <Formik
            initialValues={{
              title: review.title,
              description: review.description,
              author: review.author,
              editedBy: review.author,
              _id: review._id,
            }}
            validationSchema={validate}
            onSubmit={submit}
          >
            {(formik) => (
              <div>
                <h1>Modificar noticia</h1>

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
                    className="input"
                    label="Descripcion"
                    name="description"
                    type="text"
                    placeholder={review.description}
                  />
                  <TextField
                    className="input"
                    label="Autor"
                    name="author"
                    type="text"
                    placeholder={review.author}
                  />
                  <TextField
                    className="input"
                    label="Editado por"
                    name="editedBy"
                    type="text"
                    placeholder={review.author}
                  />
                  <TextField
                    className="input"
                    label="id"
                    name="_id"
                    type="text"
                    placeholder={review._id}
                  />

                  <button className="button" type="submit">
                    Modificar
                  </button>
                </Form>
              </div>
            )}
          </Formik>
        }
        <button onClick={(e) => navigate("/panel")}>Ir a Panel</button>
        <button onClick={(e) => navigate("/news")}>Ir a noticias</button>
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
