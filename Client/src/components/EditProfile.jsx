import { useDispatch, useSelector } from "react-redux";
import { allUser, editProfile } from "../redux/actions/index.js";
import { useNavigate } from "react-router-native";
import { connect } from "react-redux";
import {
	StyleSheet,
	TextInput,
	View,
	Text,
	TouchableWithoutFeedback,
	Keyboard,
	SafeAreaView,
	ScrollView,
	Image,
	TouchableOpacity,
	Modal,
	Alert,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const reviewSchema = yup.object({
	img: yup.string(),
	username: yup.string().required().min(4),
});

const EditProfile = () => {
	// const dispatch = useDispatch();
	const navigate = useNavigate();

	const { _id, username, img, description, socialNetworks } = useSelector(
		(state) => state.games.userProfile
	);
	const User = {
		_id,
		username,
		img,
		description,
		socialNetworks,
	};

	const handleCancel = (values) => {
		if (
			User.img === values.img &&
			User.username === values.username &&
			User.description === values.description &&
			User.socialNetworks.discord === values.socialNetworks.discord &&
			User.socialNetworks.ig === values.socialNetworks.ig &&
			User.socialNetworks.riot === values.socialNetworks.riot &&
			User.socialNetworks.steam === values.socialNetworks.steam &&
			User.socialNetworks.twitter === values.socialNetworks.twitter
		) {
			navigate("/profile");
		} else {
			setView(true);
		}
	};

	const submit = async (values, actions) => {
		try {
			await axios.put(`https://backend-gamematch.herokuapp.com/users/${_id}`, values);
			navigate("/profile");
		} catch (error) {
			let message;
			if (error.response.data.codeName && error.response.data.keyValue) {
				message = `Error: ${error.response.data.codeName}: ${
					Object.keys(error.response.data.keyValue)[0]
				}`;
			} else {
				message = error.message;
			}
			Alert.alert(message);
			return;
		}
	};

	const [view, setView] = useState(false);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View style={styles.portada}>
					<Formik
						initialValues={{
							_id: User._id,
							username: User.username,
							img: User.img
								? User.img
								: "https://www.pngplay.com/wp-content/uploads/13/Gamer-Aesthetic-PNG-Photo-Image.png",
							description: User.description ? User.description : "",
							socialNetworks: {
								steam:
									User.socialNetworks && User.socialNetworks.steam
										? User.socialNetworks.steam
										: "",
								riot:
									User.socialNetworks && User.socialNetworks.riot
										? User.socialNetworks.riot
										: "",
								discord:
									User.socialNetworks && User.socialNetworks.discord
										? User.socialNetworks.discord
										: "",
								ig:
									User.socialNetworks && User.socialNetworks.ig
										? User.socialNetworks.ig
										: "",
								twitter:
									User.socialNetworks && User.socialNetworks.twitter
										? User.socialNetworks.twitter
										: "",
							},
						}}
						validationSchema={reviewSchema}
						onSubmit={submit}
					>
						{(formikProps) => (
							<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
								<View style={styles.form_container}>
									<Text style={styles.portada_text}>Edit Profile</Text>
									<View
										style={{
											height: 2,
											width: "90%",
											backgroundColor: "#98228C",
										}}
									></View>
									<Image
										source={{
											uri: formikProps.values.img
												? formikProps.values.img
												: "https://www.pngplay.com/wp-content/uploads/13/Gamer-Aesthetic-PNG-Photo-Image.png",
										}}
										style={styles.img_perfil}
									/>
									<Text style={{ ...styles.title_input, marginTop: 30 }}>
										Profile Picture
									</Text>
									<TextInput
										style={styles.input}
										placeholder="Url"
										onChangeText={formikProps.handleChange("img")}
										value={formikProps.values.img}
										onBlur={formikProps.handleBlur("img")}
									/>
									<View style={styles.relleno}></View>
									<Text style={styles.title_input}>Username</Text>
									<TextInput
										style={styles.input}
										placeholder="Nick"
										onChangeText={formikProps.handleChange("username")}
										value={formikProps.values.username}
										onBlur={formikProps.handleBlur("username")}
									/>
									<Text style={styles.errorText}>
										{formikProps.touched.username && formikProps.errors.username}
									</Text>
									<Text style={styles.title_input}>Description</Text>
									<TextInput
										multiline={true}
										placeholder="Something About You"
										onChangeText={formikProps.handleChange("description")}
										value={formikProps.values.description}
										onBlur={formikProps.handleBlur("description")}
										style={{ ...styles.input, height: "auto" }}
									/>
									<View style={styles.relleno}></View>
									<Text
										style={{
											...styles.title_input,
											marginTop: -10,
											marginBottom: 0,
											textAlign: "center",
											fontSize: 20,
										}}
									>
										Users:
									</Text>
									<Text style={styles.title_input}>Steam</Text>
									<TextInput
										style={styles.input}
										placeholder="User Steam"
										onChangeText={formikProps.handleChange("socialNetworks.steam")}
										value={formikProps.values.socialNetworks.steam}
										onBlur={formikProps.handleBlur("steam")}
									/>
									<View style={styles.relleno}></View>
									<Text style={styles.title_input}>Riot</Text>
									<TextInput
										style={styles.input}
										placeholder="User Riot"
										onChangeText={formikProps.handleChange("socialNetworks.riot")}
										value={formikProps.values.socialNetworks.riot}
										onBlur={formikProps.handleBlur("riot")}
									/>
									<View style={styles.relleno}></View>
									<Text style={styles.title_input}>Discord</Text>
									<TextInput
										style={styles.input}
										placeholder="User Discord"
										onChangeText={formikProps.handleChange("socialNetworks.discord")}
										value={formikProps.values.socialNetworks.discord}
										onBlur={formikProps.handleBlur("discord")}
									/>
									<View style={styles.relleno}></View>
									<Text style={styles.title_input}>Instagram</Text>
									<TextInput
										style={styles.input}
										placeholder="User Instagram"
										onChangeText={formikProps.handleChange("socialNetworks.ig")}
										value={formikProps.values.socialNetworks.ig}
										onBlur={formikProps.handleBlur("ig")}
									/>
									<View style={styles.relleno}></View>
									<Text style={styles.title_input}>Twitter</Text>
									<TextInput
										style={styles.input}
										placeholder="User Twitter"
										onChangeText={formikProps.handleChange("socialNetworks.twitter")}
										value={formikProps.values.socialNetworks.twitter}
										onBlur={formikProps.handleBlur("twitter")}
									/>
									<View style={styles.relleno}></View>
									<View
										style={{
											height: 45,
											width: "100%",
											alignItems: "center",
											flexDirection: "row",
											justifyContent: "space-around",
										}}
									>
										<TouchableOpacity
											activeOpacity={0.5}
											onPress={() => handleCancel(formikProps.values)}
										>
											<Image
												source={require("../../assets/cancelar.png")}
												style={{ width: 45, height: 45 }}
											/>
										</TouchableOpacity>
										<Modal transparent={true} visible={view} animationType="fade">
											<StatusBar backgroundColor="rgba(1,1,1, 0.5)" />
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
														Unsaved Changes
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
														¿Are you sure you want to cancel? Your changes will be lost
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
															onPress={() => setView(false)}
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
															onPress={() => navigate("/profile")}
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
										<TouchableOpacity
											activeOpacity={0.5}
											onPress={formikProps.handleSubmit}
										>
											<Image
												source={require("../../assets/acceptChanges.png")}
												style={{ width: 50, height: 50 }}
											/>
										</TouchableOpacity>
									</View>
								</View>
							</TouchableWithoutFeedback>
						)}
					</Formik>
				</View>
			</ScrollView>
			<StatusBar style="auto" />
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	container: {
		height: "100%",
		width: "100%",
		alignItems: "center",
	},
	portada: {
		marginTop: Constants.statusBarHeight + 20,
		marginBottom: 50,
		flexDirection: "row",
	},
	portada_text: {
		marginBottom: 30,
		width: "80%",
		color: "white",
		textAlign: "center",
		fontSize: 45,
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
		marginTop: 20,
		width: 130,
		height: 130,
		borderRadius: 100,
	},
	form_container: {
		width: "100%",
		alignItems: "center",
	},
	title_input: {
		width: "52%",
		color: "white",
		textAlign: "left",
		fontSize: 16,
	},
	input: {
		borderWidth: 1,
		backgroundColor: "#fff",
		height: 38,
		width: "60%",
		fontSize: 15,
		borderRadius: 20,
		textAlign: "center",
		padding: 4,
	},
	errorText: {
		color: "crimson",
		fontWeight: "bold",
		marginBottom: 10,
		marginTop: 6,
	},
	relleno: {
		color: "crimson",
		fontWeight: "bold",
		marginBottom: 14,
		marginTop: 22,
	},
});

export default EditProfile;
