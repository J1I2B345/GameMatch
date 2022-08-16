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
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
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
	const submit = async (values, actions) => {
		//console.log(values);
		if (!user.map((d) => d.email).includes(values.email)) {
			Alert.alert("The email not found");
			return;
		}
		if (values.email) {
			try {
				let res = await axios.post(
					"https://backend-gamematch.herokuapp.com/users/login",
					values
				);

				console.log(res.data);
				dispatch(login(values));
				navigation("/selectgame");
			} catch (error) {
				Alert.alert("password  incorrect");
				console.log({ message: error.message });
			}
		}
		// if (!user.map((d)=>console.log(d.password)))  {
		//  Alert.alert('The password are incorrect')
		//  return;}

		//  dispatch(login(values));
		// navigation("/selectgame");
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
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
									<View style={styles.relleno}></View>
									<Text style={{ color: "red", fontSize: 10 }}>
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
									<Text style={{ color: "red", fontSize: 10 }}>
										{formikProps.touched.password && formikProps.errors.password}
									</Text>
									<View style={styles.relleno}></View>
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
						marginTop: 120,
						fontSize: 15,
						height: "auto",
					}}
				>
					<Text
						style={{
							color: "white",
							fontSize: 20,
						}}
					>
						Don't have account?
						<Link to="/register" activeOpacity={1} underlayColor={""}>
							<Text
								style={{
									color: "violet",
									fontSize: 20,
								}}
							>
								{"  "} ✔ Register
							</Text>
						</Link>
					</Text>
				</View>
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
		marginTop: 120,
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
		color: "white",
		borderWidth: 1,
		backgroundColor: "#5F0f99",
		height: 38,
		width: "70%",
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

export default Login;
