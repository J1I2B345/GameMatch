import { StyleSheet, ImageBackground, View } from "react-native";
import Home from "./Home.jsx";
import Fondo from "../../assets/Fondo.png";
import { useSelector } from "react-redux";

export default function AppContainer() {
	const darkMood = useSelector((state) => state.games.darkMood);

	return (
		<View>
			{darkMood == false ? (
				<ImageBackground source={Fondo} resizeMode="cover" style={styles.fondo_light}>
					<Home />
				</ImageBackground>
			) : (
				<ImageBackground resizeMode="cover" style={styles.fondo_dark}>
					<Home />
				</ImageBackground>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	fondo_light: {
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		backgroundSize: "cover",
	},
	fondo_dark: {
		backgroundColor: "#200021",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		backgroundSize: "cover",
	},
});
