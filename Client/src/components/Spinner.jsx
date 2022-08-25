import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { useSelector } from "react-redux";

const Spinner = () => {
	const darkMood = useSelector((state) => state.games.darkMood);

	return (
		<View style={styles.container}>
			{darkMood == false ? (
				<Image
					source={require("../../assets/iconApp.png")}
					style={{
						marginTop: 30,
						width: 150,
						height: 150,
					}}
				/>
			) : (
				<Image
					source={require("../../assets/iconAppChange.png")}
					style={{
						marginTop: 30,
						width: 150,
						height: 150,
					}}
				/>
			)}
			<Text
				style={{
					marginTop: 30,
					width: "80%",
					color: "white",
					textAlign: "center",
					fontSize: 20,
				}}
			>
				loading...
			</Text>

			<StatusBar style="auto" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default Spinner;
