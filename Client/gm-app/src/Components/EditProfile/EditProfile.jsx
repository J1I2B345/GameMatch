import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProfile, getUser } from "../../redux/actions";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as yup from "yup";

import { useNavigate, useParams } from "react-router-dom";

const validate = yup.object({
  username: yup.string().required().min(4),
  image: yup.string().required().url(),
});

export default function EditProfile() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSelect);
  const userActive = useSelector((state) => state.userProfile);

  console.log(userActive);

  useEffect(() => {
    dispatch(getUser(params.username));
  }, []);

  const submit = (values) => {
    dispatch(editProfile(values));
    navigate("/profilehome");
  };

  if (!user) return <h2>Cargando</h2>;
  // {!userActive.rol === "superdmin" ? :<h2>Debes ser super admin</h2>;}

  return (
    <div className="container">
      <div className="portada">
        {
          <Formik
            initialValues={{
              rol: user.rol,
              ban: user.ban,
            }}
            validationSchema={validate}
            onSubmit={submit}
          >
            {(formik) => (
              <div>
                <h1 className="my-4 font-weight-bold .display-4">
                  Modificar perfil
                </h1>

                <h2>Perfil a modificar: {user.username} </h2>
                <img src={user.img} alt="" />
                <Form>
                  <TextField
                    className="input"
                    label="Rol"
                    name="rol"
                    type="text"
                    placeholder={user.rol}
                  />
                  <TextField
                    className="input"
                    label="Status"
                    name="ban"
                    type="text"
                    placeholder={user.ban}
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
