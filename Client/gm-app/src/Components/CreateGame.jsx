import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGame } from "../redux/actions";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required().min(3),
  gender: yup.string().required().min(3),
  elo: yup.string().required().min(3),
  position: yup.string().required().min(3),
  image: yup.string().required().url(),
});

export default function CreateGame() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      gender: "",
      elo: "",
      position: "",
      image: "",
    },
    validationSchema,
  });

  const submit = (e) => {
    e.preventDefault();
    dispatch(createGame(formik.values));
    alert("Juego creado");
  };
  console.log({ e: formik.values });
  return (
    <div>
      <div>
        <form onSubmit={submit}>
          <label>Nombre del Juego</label>
          <input
            id="name"
            placeholder="Nombre del juego"
            onChange={formik.handleChange("name")}
            value={formik.values.name}
            onBlur={formik.handleBlur("name")}
          />
          <div>{formik.touched.name && formik.errors.name}</div>
          <label>Genero de juego</label>
          <input
            id="gender"
            placeholder="Genero del juego"
            onChange={formik.handleChange("gender")}
            value={formik.values.gender}
            onBlur={formik.handleBlur("gender")}
          />
          <div>{formik.touched.gender && formik.errors.gender}</div>
          <label>Niveles de jugadores</label>
          <input
            placeholder="Niveles de jugadores"
            onChange={formik.handleChange("elo")}
            value={formik.values.elo}
            onBlur={formik.handleBlur("elo")}
          />
          <div>{formik.touched.elo && formik.errors.elo}</div>
          <label>Posiciones de jugadores</label>
          <input
            placeholder="Posiciones de jugadores"
            onChange={formik.handleChange("position")}
            value={formik.values.position}
            onBlur={formik.handleBlur("position")}
          />
          <div>{formik.touched.position && formik.errors.position}</div>
          <label>Imagen</label>
          <input
            placeholder="Imagen en url"
            onChange={formik.handleChange("image")}
            value={formik.values.image}
            onBlur={formik.handleBlur("image")}
          />
          <div>{formik.touched.image && formik.errors.image}</div>

          <button className="button" type="submit">
            submit
          </button>
        </form>
      </div>
    </div>
  );
}
