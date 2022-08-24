import { useDispatch, useSelector } from "react-redux";
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
	Alert,
	TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { register, allUser } from "../redux/actions";
import { Formik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import axios from "axios";

//*----------------
const reviewSchema = yup.object({
	email: yup.string().required().email(),
	username: yup.string().required().min(4),
	password: yup.string().required().min(8),
});
//-----
// console.log('allUser');
// console.log(allUser());
//*---------------------------------
const Register = () => {
	const dispatch = useDispatch();
	const navigation = useNavigate();
	useEffect(() => {
		dispatch(allUser());
	}, []);

	const user = useSelector((state) => state.games.aux);
	// console.log(user[0])
	const setpassword = (value) => {
		setConfirm(value);
	};
	const [confirm, setConfirm] = useState("");
	const submit = async (values, actions) => {
		//console.log(values);
		try {
			if (values) {
				if (user.map((d) => d.email).includes(values.email)) {
					Alert.alert("The email already exists");
					return;
				}
				if (user.map((d) => d.username).includes(values.username)) {
					Alert.alert("The username already exists, try again");
					return;
				}

				if (confirm !== values.password) {
					Alert.alert("The password dont match, try again");
					return;
				}
				dispatch(register(values));
				await axios.post(
					"https://backend-gamematch.herokuapp.com/users/register",
					values
				);
				navigation("/");
				Alert.alert("💖Welcome to GameMatch!!🎮");
			}
		} catch (error) {
			Alert.alert(error.message);
			console.log({ message: error.message });
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={{ width: "100%" }}>
				<View style={{ alignItems: "center" }}>
					<View style={styles.portada}>
						<Image
							source={require("../../assets/GameMatch.png")}
							style={{ width: 130, height: 100 }}
						/>
						<View style={styles.portada_text}></View>
					</View>
					<View style={styles.form_container}>
						<Formik
							initialValues={{
								email: "",
								username: "",
								password: "",
							}}
							validationSchema={reviewSchema}
							onSubmit={submit}
						>
							{(formikProps) => (
								<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
									<View style={styles.form_container}>
										<TextInput
											placeholder="Nick name"
											onChangeText={formikProps.handleChange("username")}
											value={formikProps.values.username}
											onBlur={formikProps.handleBlur("username")}
											style={styles.input}
										/>
										<Text style={{ color: "red", fontSize: 15, marginBottom: -10 }}>
											{formikProps.touched.username && formikProps.errors.username}
										</Text>
										<TextInput
											placeholder="Email Address"
											onChangeText={formikProps.handleChange("email")}
											value={formikProps.values.email}
											onBlur={formikProps.handleBlur("email")}
											style={styles.input}
										/>
										{/* {console.log(formikProps)} */}
										<View style={styles.relleno}></View>
										<Text style={{ color: "red", fontSize: 15, marginBottom: -10 }}>
											{formikProps.touched.email && formikProps.errors.email}
											{/* {console.log(formikProps.values.email) } */}
										</Text>

										<TextInput
											placeholder="Password"
											type="password"
											style={styles.input}
											onChangeText={formikProps.handleChange("password")}
											value={formikProps.values.password}
											secureTextEntry={true}
										/>
										<Text style={{ color: "red", fontSize: 15, marginBottom: -10 }}>
											{formikProps.touched.password && formikProps.errors.password}
										</Text>
										<TextInput
											placeholder="Repeat Password"
											style={styles.input}
											secureTextEntry={true}
											onChangeText={(text) => setpassword(text)}
											value={confirm}
										/>
										<View
											style={{
												flexDirection: "row",
												width: "100%",
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											<Text
												style={styles.button}
												title="LOGIN"
												onPress={formikProps.handleSubmit}
											>
												<Text style={styles.button_text}>Register</Text>
											</Text>
										</View>
									</View>
								</TouchableWithoutFeedback>
							)}
						</Formik>
					</View>
					<View
						style={{
							marginTop: 30,
							flexDirection: "row",
							fontSize: 15,
							height: "auto",
						}}
					>
						<Text
							style={{
								color: "white",
								fontSize: 18,
							}}
						>
							Alredy have an account?
						</Text>
						<TouchableOpacity
							onPress={() => navigation("/")}
							activeOpacity={0.5}
							underlayColor={"none"}
						>
							<Text
								style={{
									color: "violet",
									fontSize: 18,
								}}
							>
								{" "}
								◉ Login!
							</Text>
						</TouchableOpacity>
					</View>
					<View
						style={{
							marginTop: 4,
							marginBottom: 30,
							width: "74%",
							height: 0.3,
							backgroundColor: "white",
						}}
					></View>
				</View>
				<StatusBar style="auto" />
			</ScrollView>
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
		marginTop: Constants.statusBarHeight + 30,
		alignItems: "center",
		marginBottom: 20,
	},
	portada_text: {
		marginLeft: 20,
	},
	form_container: {
		width: "100%",
		alignItems: "center",
	},
	input: {
		marginTop: 35,
		marginBottom: 20,
		padding: 4,
		color: "white",
		borderWidth: 1,
		backgroundColor: "#5F0f99",
		height: 38,
		width: "65%",
		fontSize: 25,
		borderRadius: 20,
		textAlign: "center",
		borderColor: "violet",
	},
	button: {
		margin: "auto",
		marginTop: 25,
		height: 30,
		width: "60%",
		alignItems: "center",
		borderRadius: 10,
		borderColor: "violet",
		backgroundColor: "#6F0f99",
		textAlign: "center",
		color: "#fff",
	},
	button_text: {
		marginTop: 20,
		fontSize: 20,
		width: "100%",
		textAlign: "center",
		color: "white",
	},
});

export default Register;
