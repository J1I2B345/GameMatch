import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGame } from "./actions/create";
import { connect } from "react-redux";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Formik } from "formik";

const initialValues = {
  name: "",
  gender: "",
  elo: "",
  position: "",
  image: "",
};

export default function CreateGame() {
  const dispatch = useDispatch();
  const [data, setData] = useState(initialValues);

  const submit = (values) => {
    console.log({ values });
    dispatch(createGame(data));
    alert("Juego creado");
    setData(initialValues);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          name: "",
          gender: "",
          elo: "",
          position: "",
          image: "",
        }}
        onSubmit={submit}
      >
        {(formikProps) => (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.form_container}>
              <TextInput
                style={styles.input}
                placeholder="Nombre del juego"
                onChangeText={formikProps.handleChange("name")}
                value={formikProps.values.name}
              />
              <TextInput
                style={styles.input}
                placeholder="Genero del juego"
                onChangeText={formikProps.handleChange("gender")}
                value={formikProps.values.gender}
              />
              <TextInput
                style={styles.input}
                placeholder="Niveles de jugadores"
                onChangeText={formikProps.handleChange("elo")}
                value={formikProps.values.elo}
              />
              <TextInput
                style={styles.input}
                placeholder="Posiciones de jugadores"
                onChangeText={formikProps.handleChange("position")}
                value={formikProps.values.position}
              />
              <TextInput
                style={styles.input}
                placeholder="Imagen en url"
                onChangeText={formikProps.handleChange("image")}
                value={formikProps.values.image}
              />

              <Button
                style={styles.button}
                title="submit"
                color="maroon"
                onPress={formikProps.handleSubmit}
              />
            </View>
          </TouchableWithoutFeedback>
        )}
      </Formik>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  portada: {
    marginTop: 120,
    flexDirection: "row",
  },
  portada_text: {
    marginRight: 30,
  },
  form_container: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    marginTop: 70,
    borderWidth: 1,
    backgroundColor: "#fff",
    height: 38,
    width: "60%",
    fontSize: 15,
    borderRadius: 20,
    textAlign: "center",
  },
  button: {
    margin: "auto",
    marginTop: 60,
    height: 40,
    width: "60%",
    alignItems: "center",
    borderRadius: 10,
    border: "none",
    backgroundColor: "#98228C",
  },
  button_text: {
    marginTop: 6,
    fontSize: 20,
    width: "100%",
    textAlign: "center",
    color: "white",
  },
});
