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
	Modal,
} from "react-native";
import { connect, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-native";
import Constants from "expo-constants";
import Nav from "./Nav";
import Spinner from "./Spinner";
import { useState } from "react";

const Profile = () => {
	const User = useSelector((state) => state.games.userProfile);
	const user = useSelector((state) => state.games.user);

	const navigate = useNavigate();

	let arrayStars = [];

	if (user.rating) {
		if (user.rating.$numberDecimal) {
			(() => {
				let ratingCont = user.rating.$numberDecimal;
				while (ratingCont > 0) {
					ratingCont = ratingCont - 1;
					arrayStars.push(arrayStars.length + 1);
				}
				return arrayStars;
			})();
		}
	}

	const [view, setView] = useState(false);

	const [confirmation, setConfirmation] = useState(false);

	return (
		<View>
			{User._id && User.username ? (
				<View style={styles.container}>
					<Modal transparent={true} visible={view} animationType="slide">
						<View style={{ height: "100%", backgroundColor: "#5B146C" }}>
							<StatusBar backgroundColor="#5B146C" />
							<View>
								<Text
									style={{
										marginBottom: 15,
										width: "100%",
										color: "white",
										textAlign: "center",
										fontSize: 35,
									}}
								>
									Settings
								</Text>
								<TouchableOpacity
									activeOpacity={0.5}
									style={{
										marginLeft: 18,
										paddingTop: 10,
										width: "100%",
										borderRadius: 15,
										flexDirection: "row",
									}}
								>
									<Image
										source={require("../../assets/theme.png")}
										style={{ width: 30, height: 30 }}
									/>
									<Text
										style={{
											marginLeft: 10,
											marginBottom: 10,
											width: "100%",
											color: "white",
											fontSize: 20,
										}}
									>
										Theme
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => navigate("/profile/changepassword")}
									activeOpacity={0.5}
									style={{
										marginLeft: 18,
										paddingTop: 20,
										paddingBottom: 10,
										width: "100%",
										borderRadius: 15,
										flexDirection: "row",
									}}
								>
									<Image
										source={require("../../assets/password.png")}
										style={{ width: 30, height: 30 }}
									/>
									<Text
										style={{
											marginLeft: 10,
											marginBottom: 10,
											width: "100%",
											color: "white",
											fontSize: 20,
										}}
									>
										Change Password
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									activeOpacity={0.5}
									underlayColor={" "}
									style={{
										marginLeft: 20,
										paddingTop: 10,
										width: "100%",
										alignItems: "center",
										borderRadius: 15,
										backgroundColor: "#5B146C",
										flexDirection: "row",
									}}
									onPress={() => setConfirmation(true)}
								>
									<Image
										source={require("../../assets/singOff.png")}
										style={{ width: 30, height: 30 }}
									/>
									<Text
										style={{
											marginLeft: 10,
											marginBottom: 10,
											width: "100%",
											color: "white",
											fontSize: 20,
										}}
									>
										Sign Out
									</Text>
								</TouchableOpacity>
								<Modal transparent={true} visible={confirmation} animationType="fade">
									<StatusBar backgroundColor="rgb(46,12,52)" />
									<View
										style={{
											...styles.modal_container,
											backgroundColor: "rgba(1,1,1, 0.5)",
										}}
									>
										<View style={styles.modal}>
											<Text
												style={{
													marginBottom: 15,
													width: "100%",
													color: "white",
													textAlign: "center",
													fontSize: 35,
												}}
											>
												Sing Out
											</Text>
											<Text
												style={{
													marginBottom: 15,
													width: "100%",
													color: "white",
													textAlign: "center",
													fontSize: 20,
												}}
											>
												¿Are you sure you want to sing out?
											</Text>
											<View
												style={{
													flexDirection: "row",
													width: "100%",
													alignItems: "center",
													justifyContent: "space-around",
												}}
											>
												<TouchableOpacity
													activeOpacity={0.5}
													underlayColor={""}
													style={{
														padding: 10,
														width: "auto",
														height: "auto",
														alignItems: "center",
														backgroundColor: "#cf1500",
														borderRadius: 15,
													}}
													onPress={() => setConfirmation(false)}
												>
													<Text
														style={{
															fontSize: 16,
															color: "#fff",
														}}
													>
														cancel
													</Text>
												</TouchableOpacity>
												<TouchableOpacity
													activeOpacity={0.5}
													style={{
														padding: 10,
														width: "auto",
														height: "auto",
														alignItems: "center",
														backgroundColor: "#2089DC",
														borderRadius: 15,
													}}
													onPress={() => navigate("/")}
												>
													<Text
														style={{
															fontSize: 16,
															color: "#fff",
														}}
													>
														accept
													</Text>
												</TouchableOpacity>
											</View>
										</View>
									</View>
								</Modal>
							</View>
							<TouchableOpacity
								activeOpacity={0.5}
								underlayColor={""}
								style={{
									position: "absolute",
									bottom: 80,
									left: 20,
									height: 45,
								}}
								onPress={() => setView(false)}
							>
								<Image
									source={require("../../assets/iconBack.png")}
									style={{ width: 50, height: 50 }}
								/>
							</TouchableOpacity>
						</View>
					</Modal>
					<SafeAreaView
						style={
							User.premium == false
								? {
										width: "100%",
										marginBottom: 30,
										alignItems: "center",
										justifyContent: "center",
								  }
								: {
										width: "100%",
										marginBottom: 275,
										alignItems: "center",
										justifyContent: "center",
								  }
						}
					>
						<ScrollView style={{ width: "100%" }}>
							<View
								style={{
									width: "100%",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<View style={styles.portada_container}>
									<Image
										source={{
											uri: User.img
												? User.img
												: "https://www.pngplay.com/wp-content/uploads/13/Gamer-Aesthetic-PNG-Photo-Image.png",
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

								<View
									style={
										User.premium == false
											? { ...styles.separador, marginBottom: 10 }
											: styles.separador
									}
								></View>

								{User.premium == false ? (
									<View style={{ paddingBottom: 5 }}>
										<Link
											to="/whypremium"
											activeOpacity={1}
											underlayColor={"#f4b04d"}
											style={styles.button}
										>
											<View style={{ flexDirection: "row" }}>
												<Text style={styles.button_text}>
													<Image
														source={require("../../assets/starPremium.png")}
														style={{
															width: 20,
															height: 20,
														}}
													/>
													Become VIP!
													<Image
														source={require("../../assets/starPremium.png")}
														style={{
															width: 20,
															height: 20,
														}}
													/>
												</Text>
											</View>
										</Link>
									</View>
								) : (
									<View></View>
								)}
								{User.description ? (
									<View
										style={{
											...styles.info_container,
											paddingBottom: 20,
											marginTop: 0,
											alignItems: "center",
											justifyContent: "center",
										}}
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
												? {
														...styles.info_container,
														marginTop: -5,
												  }
												: styles.info_container
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
					<TouchableOpacity
						style={{ position: "absolute", zIndex: 10, top: 35, right: 10 }}
						activeOpacity={0.5}
						onPress={() => setView(true)}
					>
						<Image
							source={require("../../assets/settings.png")}
							style={{ width: 30, height: 30 }}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.7}
						underlayColor={""}
						style={{
							position: "absolute",
							bottom: 80,
							left: 20,
							height: 45,
						}}
						onPress={() => navigate("/profile/edit")}
					>
						<Image
							source={require("../../assets/editProfile.png")}
							style={{ width: 50, height: 50 }}
						/>
					</TouchableOpacity>
					<StatusBar style="auto" />
				</View>
			) : (
				<Spinner />
			)}
			<Nav />
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
	modal_container: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	modal: {
		padding: 20,
		width: "90%",
		alignItems: "center",
		backgroundColor: "#3019bf",
		borderRadius: 20,
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
		width: "90%",
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

export default Profile;
