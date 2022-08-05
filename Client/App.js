import { NativeRouter } from "react-router-native";
import { StyleSheet, ImageBackground } from "react-native";
import Home from "./src/components/Home.jsx";
import Fondo from "./assets/Fondo.png";

import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

const store = configureStore();

export default function App() {
  return (
    <NativeRouter>
      <ImageBackground source={Fondo} resizeMode="cover" style={styles.fondo}>
        <Provider store={store}>
          <Home />
        </Provider>
      </ImageBackground>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  fondo: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
});
