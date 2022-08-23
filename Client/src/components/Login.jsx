import { addNews } from "../redux/actions/index.js";
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
import { useDispatch, useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { login } from "../redux/actions";
import { Formik } from "formik";
import * as yup from "yup";
import { allUser } from "../redux/actions";
import axios from "axios";

const reviewSchema = yup.object({
	email: yup.string().required().min(3).email(),
	password: yup.string().required().min(3),
});
//const userGlobal = useSelector((state) => state.games.user);
const Login = () => {
	const user = useSelector((state) => state.games.aux);

	const dispatch = useDispatch();
	const navigation = useNavigate();
	useEffect(() => {
		dispatch(allUser());
	}, []);
	const _id = "";
	const submit = async (values, actions) => {
		if (!user.map((d) => d.email).includes(values.email)) {
			Alert.alert("💌Email not found,try againヾ(≧▽≦*)o ");
			return;
		}
		const users = user.find((d) => d.email === values.email);
		if (users.ban == true) {
			Alert.alert(
				`💚Dear User we sorry 😔 your account is suspended.Do you Believe a Is an error?. contact the support`
			);
			return;
		}

		// if (
		// 	!user.map((d) => d.email && d.password).includes(values.email && values.password)
		// ) {
		// 	Alert.alert("❔Password invalid,try againヾ(≧▽≦*)o");
		// 	return;
		// }

		//  for(let i = 0; i < user.length; i++) {if( user[i].email ===values.email)
		// 	{return	_id=user.id}}

		try {
			let res = await axios.post(
				"https://backend-gamematch.herokuapp.com/users/login",
				values
			);
			dispatch(login(values));
			navigation("/selectgame");
		} catch (error) {
			Alert.alert("Error: " + error.message);
			console.log({ error });
			return;
		}
	};

	//  dispatch(login(values));
	// navigation("/selectgame");

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={{ width: "100%" }}>
				<View
					style={{
						marginTop: "25%",
						alignItems: "center",
					}}
				>
					<View style={styles.portada}>
						<View style={styles.portada_text}>
							<Image
								source={require("../../assets/GameMatch.png")}
								style={{ width: 130, height: 100 }}
							/>
						</View>
						<View style={styles.portada_img}>
							<Image
								source={require("../../assets/iconApp.png")}
								style={{ width: 110, height: 110 }}
							/>
						</View>
					</View>
					<View style={styles.form_container}>
						<Formik
							initialValues={{
								email: "",
								password: "",
							}}
							validationSchema={reviewSchema}
							onSubmit={submit}
						>
							{(formikProps) => (
								<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
									<View style={styles.form_container}>
										<TextInput
											placeholder="Email Address"
											onChangeText={formikProps.handleChange("email")}
											value={formikProps.values.email}
											onBlur={formikProps.handleBlur("email")}
											style={styles.input}
										/>
										{/* {console.log(formikProps)} */}
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
												<Text style={styles.button_text}>LOGIN</Text>
											</Text>
										</View>
									</View>
								</TouchableWithoutFeedback>
							)}
						</Formik>
					</View>
					<View
						style={{
							marginTop: 45,
							width: "80%",
							fontSize: 15,
							height: "auto",
							alignItems: "center",
							justifyContent: "center",
							flexDirection: "row",
						}}
					>
						<Text
							style={{
								color: "#fff",
								fontSize: 18,
							}}
						>
							Don't have an account?
						</Text>
						<TouchableOpacity
							onPress={() => navigation("/register")}
							activeOpacity={0.5}
							underlayColor={"none"}
						>
							<Text
								style={{
									color: "#f9ff",
									fontSize: 18,
								}}
							>
								{" "}
								○ Register
							</Text>
						</TouchableOpacity>
					</View>
					<View
						style={{
							marginTop: 1,
							width: "78%",
							height: 0.3,
							backgroundColor: "white",
							marginBottom: 45,
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
		justifyContent: "center",
	},
	portada: {
		// marginTop: 120,
		marginTop: 40,
		flexDirection: "row",
		marginBottom: 20,
	},
	portada_text: {
		marginRight: 30,
	},
	form_container: {
		width: "100%",
		alignItems: "center",
	},
	input: {
		marginTop: 35,
		marginBottom: 20,
		padding: 4,
		width: "65%",
		height: 38,
		color: "#fff",
		borderWidth: 1,
		fontSize: 25,
		textAlign: "center",
		borderRadius: 20,
		borderColor: "violet",
		backgroundColor: "#5F0f99",
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

export default Login;
