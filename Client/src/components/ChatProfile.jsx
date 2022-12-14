import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	Text,
	View,
	Image,
	SafeAreaView,
	ScrollView,
	Linking,
	TouchableOpacity,
} from "react-native";
import { Link, Navigate, useNavigate } from "react-router-native";
import { connect, useSelector } from "react-redux";
import Constants from "expo-constants";
import Nav from "./Nav";
import Spinner from "./Spinner";

const ChatProfile = () => {
	const navigate = useNavigate();
	const User = useSelector((state) => state.games.userNameChat);
	const darkMood = useSelector((state) => state.games.darkMood);

	let arrayStars = [];

	if (User.rating) {
		if (User.rating.$numberDecimal) {
			(() => {
				let ratingCont = User.rating.$numberDecimal;
				while (ratingCont > 0) {
					ratingCont = ratingCont - 1;
					arrayStars.push(arrayStars.length + 1);
				}
				return arrayStars;
			})();
		}
	}

	function backToChat() {
		navigate(`/chat/${User._id}`);
	}

	return (
		<View>
			{User._id && User.username ? (
				<View style={styles.container}>
					<SafeAreaView
						style={{ width: "100%", alignItems: "center", justifyContent: "center" }}
					>
						<ScrollView>
							<View style={styles.portada_container}>
								<Image
									source={{
										uri: User.img
											? User.img
											: "https://www.pinpng.com/pngs/m/402-4020060_random-image-from-user-smash-ball-pixel-art.png",
									}}
									style={styles.img_perfil}
								/>
								<View style={styles.portada}>
									{User.premium == true ? (
										<View>
											<Text style={{ color: "gold", fontSize: 35, fontWeight: "bold" }}>
												⭐VIP⭐
											</Text>
										</View>
									) : (
										<View></View>
									)}
									<Text style={styles.text_name}>{User.username}</Text>

									<View style={styles.stars_container}>
										{arrayStars.map((item) => (
											<View key={item}>
												<Image
													source={require("../../assets/Star.png")}
													style={styles.stars}
												/>
											</View>
										))}
									</View>
								</View>
							</View>
							{darkMood == false ? (
								<View
									style={
										User.premium == false
											? { ...styles.separador, marginBottom: 10 }
											: styles.separador
									}
								></View>
							) : (
								<View
									style={
										User.premium == false
											? {
													...styles.separador,
													marginBottom: 10,
													backgroundColor: "#4D0F73",
											  }
											: styles.separador
									}
								></View>
							)}
							<View
								style={{
									width: "100%",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<View
									style={{
										alignItems: "center",
										flexDirection: "row",
									}}
								>
									<TouchableOpacity
										onPress={() => navigate("/chat/profile/qualification")}
										style={{ flexDirection: "row" }}
									>
										<Image
											source={require("../../assets/Star.png")}
											style={{
												marginRight: 5,
												width: 25,
												height: 25,
												marginBottom: 15,
												marginTop: "4%",
											}}
										/>
										<Text
											style={{
												...styles.text_name,
												width: "auto",
											}}
										>
											Rate User
										</Text>
										<Image
											source={require("../../assets/starCalification.png")}
											style={{
												marginLeft: 5,
												width: 28,
												height: 28,
												marginBottom: 15,
												marginTop: "4%",
											}}
										/>
									</TouchableOpacity>
									{/* <TouchableOpacity onPress={() => navigate("/report")}>
										<Image
											source={require("../../assets/report.png")}
											style={{ marginLeft: 35, width: 50, height: 50, marginBottom: 15 }}
										/>
									</TouchableOpacity> */}
								</View>
								{User.description ? (
									<View
										style={
											darkMood == false
												? {
														...styles.info_container,
														paddingBottom: 20,
														marginTop: 0,
														alignItems: "center",
														justifyContent: "center",
												  }
												: {
														...styles.info_container,
														paddingBottom: 20,
														marginTop: 0,
														alignItems: "center",
														justifyContent: "center",
														backgroundColor: "#200021",
														borderColor: "#4700A1",
														borderWidth: 2,
												  }
										}
									>
										<Text
											style={{
												color: "#fff",
												fontSize: 16,
											}}
										>
											{User.description}
										</Text>
									</View>
								) : (
									<View></View>
								)}
								{User.socialNetworks ? (
									<View
										style={
											User.socialNetworks.steam == "" &&
											User.socialNetworks.riot == "" &&
											User.socialNetworks.discord == "" &&
											User.socialNetworks.ig == "" &&
											User.socialNetworks.twitter == ""
												? { display: "none" }
												: User.description
												? darkMood == false
													? {
															...styles.info_container,
															marginTop: -5,
													  }
													: {
															...styles.info_container,
															marginTop: -5,
															backgroundColor: "#200021",
															borderColor: "#4700A1",
															borderWidth: 2,
													  }
												: darkMood == false
												? styles.info_container
												: {
														...styles.info_container,
														backgroundColor: "#200021",
														borderColor: "#4700A1",
														borderWidth: 2,
												  }
										}
									>
										<Text style={styles.users_title}>
											{(User.socialNetworks.steam !== "" &&
												User.socialNetworks.riot == "" &&
												User.socialNetworks.discord == "" &&
												User.socialNetworks.ig == "" &&
												User.socialNetworks.twitter == "") ||
											(User.socialNetworks.steam == "" &&
												User.socialNetworks.riot !== "" &&
												User.socialNetworks.discord == "" &&
												User.socialNetworks.ig == "" &&
												User.socialNetworks.twitter == "") ||
											(User.socialNetworks.steam == "" &&
												User.socialNetworks.riot == "" &&
												User.socialNetworks.discord !== "" &&
												User.socialNetworks.ig == "" &&
												User.socialNetworks.twitter == "") ||
											(User.socialNetworks.steam == "" &&
												User.socialNetworks.riot == "" &&
												User.socialNetworks.discord == "" &&
												User.socialNetworks.ig !== "" &&
												User.socialNetworks.twitter == "") ||
											(User.socialNetworks.steam == "" &&
												User.socialNetworks.riot == "" &&
												User.socialNetworks.discord == "" &&
												User.socialNetworks.ig == "" &&
												User.socialNetworks.twitter !== "") ||
											Object.keys(User.socialNetworks).length == 1
												? "User:"
												: "Users"}
										</Text>
										<Text
											style={
												User.socialNetworks.steam
													? styles.users_item
													: { display: "none" }
											}
										>
											֍ Steam: {User.socialNetworks.steam}
										</Text>
										<Text
											style={
												User.socialNetworks.riot ? styles.users_item : { display: "none" }
											}
										>
											֍ Riot: {User.socialNetworks.riot}
										</Text>
										<Text
											style={
												User.socialNetworks.discord
													? styles.users_item
													: { display: "none" }
											}
										>
											֍ Discord: {User.socialNetworks.discord}
										</Text>

										<Text
											style={
												User.socialNetworks.ig ? styles.users_item : { display: "none" }
											}
										>
											֍ Instagram: {User.socialNetworks.ig}
											{/* {Linking.openURL('https://www.instagram.com/new.affection_/')} */}
										</Text>

										<Text
											style={
												User.socialNetworks.twitter
													? styles.users_item
													: { display: "none" }
											}
										>
											֍ Twitter: {User.socialNetworks.twitter}
										</Text>
									</View>
								) : (
									<View></View>
								)}
							</View>
						</ScrollView>
					</SafeAreaView>
					<StatusBar style="auto" />
				</View>
			) : (
				<Spinner />
			)}
			<TouchableOpacity
				onPress={() => backToChat()}
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
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: "100%",
		alignItems: "center",
	},
	portada_container: {
		marginTop: Constants.statusBarHeight + 15,
		marginBottom: 15,
		flexDirection: "row",
		justifyContent: "center",
	},
	portada: {
		margin: 20,
		textAlign: "center",
		justifyContent: "center",
		alignItems: "center",
		width: 150,
	},
	img_perfil: {
		width: 150,
		height: 150,
		borderRadius: 100,
	},
	text_name: {
		width: "90%",
		color: "white",
		textAlign: "center",
		fontSize: 30,
	},
	stars_container: {
		marginTop: 10,
		flexDirection: "row",
		width: "100%",
		justifyContent: "center",
	},
	stars: {
		margin: 5,
		width: 20,
		height: 20,
		borderRadius: 100,
	},
	separador: {
		marginBottom: 15,
		height: 2,
		width: "100%",
		backgroundColor: "#98228C",
	},
	info_container: {
		margin: 20,
		marginTop: 0,
		padding: 20,
		paddingBottom: 10,
		borderRadius: 20,
		width: "90%",
		backgroundColor: "#443ABB",
		justifyContent: "center",
	},
	users_title: {
		width: "100%",
		color: "#fff",
		fontSize: 25,
		paddingBottom: 10,
	},
	users_item: {
		color: "#fff",
		fontSize: 16,
		padding: 20,
		paddingTop: 0,
		paddingLeft: 28,
	},
	button: {
		margin: 20,
		marginTop: 5,
		marginBottom: 10,
		height: 40,
		width: "55%",
		alignItems: "center",
		borderRadius: 10,
		border: "none",
		backgroundColor: "#fbcb1b",
	},
	button_text: {
		marginTop: 6,
		fontSize: 20,
		width: "100%",
		textAlign: "center",
		alignItems: "center",
		justifyContent: "center",
		color: "#fff",
	},
});

export default ChatProfile;
