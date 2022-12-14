import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUser, register } from "../../redux/actions";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import GameMatch from "../../assets/GameMatch.png";
import iconApp from "../../assets/iconApp.png";

const validate = yup.object({
  email: yup.string().required().min(3).email(),
  username: yup.string().required().min(3),
  password: yup.string().required().min(3),
});

export default function Register() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const user = useSelector((state) => state.aux);

  // console.log({ user });

  useEffect(() => {
    dispatch(allUser());
  }, []);

  const submit = (values) => {
    if (values) {
      if (user.map((d) => d.email).includes(values.email)) {
        alert("The email already exists");
        return;
      }
      if (user.map((d) => d.username).includes(values.username)) {
        alert("The username already exists, try again");
        return;
      }

      dispatch(register(values));
      navigation("/");
    }
  };

  return (
    <Container>
      <div className="container-img-game">
        <div className="portada_text">
          <img src={GameMatch} className="image-game" alt="" />
        </div>
        <div className="container-img-icon">
          <img src={iconApp} className="image-icon" alt="" />
        </div>
      </div>
      <div className="portada">
        {
          <Formik
            initialValues={{
              email: "",
              username: "",
              password: "",
            }}
            validationSchema={validate}
            onSubmit={submit}
          >
            {(formik) => (
              <div>
                <h1 className="my-4 font-weight-bold .display-4">Registrate</h1>
                <Form>
                  <TextField
                    className="input"
                    label="Nick name"
                    name="username"
                    type="text"
                    placeholder="Nick name"
                  />
                  <TextField
                    className="input"
                    label="Email Address"
                    name="email"
                    type="text"
                    placeholder="Email Address"
                  />
                  <TextField
                    className="input"
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Password"
                  />

                  <button className="button" type="submit">
                    Registrarse
                  </button>
                </Form>
              </div>
            )}
          </Formik>
        }
      </div>
      <div
        className={{
          color: "white",
          fontSize: 20,
        }}
      >
        Alredy have account?
        <Link to="/">
          <div className="login-link">???? Login!</div>
        </Link>
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
  .image-icon {
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
