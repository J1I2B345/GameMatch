import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from "react-native";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-native";
import Constants from "expo-constants";
import Nav from "./Nav";

const WhyPremium = () => {
	return (
		<View style={styles.container}>
			<SafeAreaView style={{ marginTop: Constants.statusBarHeight + 10 }}>
				<ScrollView>
					<View style={styles.all_info_container}>
						<View style={styles.info_container}>
							<Text style={styles.title}>☀¿Why Be Premium?</Text>
							<Text style={styles.subTitle}>😎 Hi!, Gamer 🎮 </Text>

							<Text style={styles.text}></Text>
							<Text style={styles.text}>🌟 Do you want a special profile?</Text>
							<Text style={styles.text}>
								🌟 Do you want to be a collaborator to support us and continue to provide
								you with more games and services?
							</Text>
							<Text style={styles.text}>🌟and....🌟</Text>
							<Text style={styles.text}></Text>
							<Text style={styles.text}>🌌Match infinite times?</Text>
							<Text style={styles.text}></Text>
							<Text style={styles.text}>
								Can you imagine your profile glorified like the sky with the stars?
							</Text>

							<Text style={styles.text}>⭐VIP⭐ + Your name 😎</Text>
						</View>
					</View>
					<View style={{ width: "100%", alignItems: "center" }}>
						<Link
							to="/checkout"
							activeOpacity={1}
							underlayColor={"#9A01E2"}
							style={styles.button}
						>
							<View>
								<Text style={styles.button_text}>
									<Image
										source={require("../../assets/starPremium.png")}
										style={{
											width: 20,
											height: 20,
										}}
									/>
									GET PREMIUM RIGHT NOW
									<Image
										source={require("../../assets/starPremium.png")}
										style={{
											width: 20,
											height: 20,
										}}
									/>
								</Text>
								<Text style={styles.button_text}>FOR $499.99</Text>
							</View>
						</Link>
					</View>
				</ScrollView>
			</SafeAreaView>
			<Link
				to="/profile"
				activeOpacity={1}
				underlayColor={""}
				style={{
					position: "absolute",
					bottom: 80,
					left: 20,
					height: 45,
				}}
			>
				<Image
					source={require("../../assets/iconBack.png")}
					style={{ width: 50, height: 50 }}
				/>
			</Link>
			<Nav />
			<StatusBar style="auto" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: "100%",
		alignItems: "center",
	},
	all_info_container: {
		width: "100%",
		alignItems: "center",
	},
	info_container: {
		width: "100%",
		backgroundColor: "#443ABB",
		borderRadius: 20,
		padding: 20,
	},
	title: {
		textAlign: "center",
		fontSize: 30,
		color: "#fff",
	},
	subTitle: {
		fontSize: 25,
		color: "#fff",
	},
	text: {
		width: "60%",
		fontSize: 15,
		color: "#fff",
	},
	button: {
		margin: 20,
		marginTop: 20,
		marginBottom: 10,
		height: 86,
		width: "80%",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
		border: "none",
		backgroundColor: "#98228C",
	},
	button_text: {
		fontSize: 17,
		textAlign: "center",
		alignItems: "center",
		color: "white",
	},
});

export default WhyPremium;
