import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../redux/actions/index.js";
import { Link, useNavigate } from "react-router-native";
import { connect } from "react-redux";
import {
	StyleSheet,
	Button,
	TextInput,
	View,
	Text,
	TouchableWithoutFeedback,
	Keyboard,
	SafeAreaView,
	ScrollView,
	Image,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

const reviewSchema = yup.object({
	img: yup.string(),
	username: yup.string().required().min(4),
});

const EditProfile = () => {
	const dispatch = useDispatch();
	const navigation = useNavigate();
	const User = useSelector((state) => state.games.userProfile);

	const submit = (values, actions) => {
		dispatch(editProfile(values));
		navigation("/profile");
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View style={styles.portada}>
					<Formik
						initialValues={{
							_id: User._id,
							email: User.email,
							premium: User.premium,
							rol: User.rol,
							chats: User.chats,
							reviews: User.reviews,
							givenReviews: User.givenReviews,
							rating: User.rating,
							ban: User.ban,
							// MODIFICANDO
							username: User.username,
							img: User.img
								? User.img
								: "https://www.pinpng.com/pngs/m/402-4020060_random-image-from-user-smash-ball-pixel-art.png",
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
												: "https://www.pinpng.com/pngs/m/402-4020060_random-image-from-user-smash-ball-pixel-art.png",
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
										style={styles.input}
										placeholder="Something About You"
										onChangeText={formikProps.handleChange("description")}
										value={formikProps.values.description}
										onBlur={formikProps.handleBlur("description")}
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
											bottom: 0,
											height: 45,
											width: "100%",
											alignItems: "center",
											backgroundColor: "#5B146C",
										}}
									>
										<Button
											style={styles.button}
											title="✔"
											onPress={formikProps.handleSubmit}
										/>
									</View>
								</View>
							</TouchableWithoutFeedback>
						)}
					</Formik>
				</View>
			</ScrollView>
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

export default EditProfile;
