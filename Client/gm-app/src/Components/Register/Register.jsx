import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUser, register } from "../../redux/actions";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as yup from "yup";
import "./Register.css";
import { useNavigate, Link } from "react-router-dom";

const validate = yup.object({
  email: yup.string().required().min(3).email(),
  username: yup.string().required().min(3),
  password: yup.string().required().min(3),
});

export default function Register() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const user = useSelector((state) => state.aux);

  console.log({ user });

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
    <div className="container">
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

                  <button className="btn btn-dark mt-3" type="submit">
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
        <Link to="/login">
          <div
            className={{
              color: "violet",
              fontSize: 20,
            }}
          >
            🟢 Login!
          </div>
        </Link>
      </div>
    </div>
  );
}
