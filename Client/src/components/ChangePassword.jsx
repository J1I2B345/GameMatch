import { useDispatch, useSelector } from "react-redux";
import { addNews, editProfile } from "../redux/actions/index.js";
import { Link, useNavigate } from "react-router-native";
import { connect } from "react-redux";
import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	TextInput,
	View,
	Text,
	TouchableWithoutFeedback,
	Keyboard,
	TouchableOpacity,
	Alert,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

const reviewSchema = yup.object({
	password: yup.string().required().min(8),
});

const ChangePassword = () => {
	const dispatch = useDispatch();
	const navigation = useNavigate();
	const user = useSelector((state) => state.games.user);

	const submit = (values, actions) => {
		let data = { _id: values._id, password: values.password };
		if (values.password !== values.confirmPassword) {
			Alert.alert("The password dont match, try again");
			return;
		}
		dispatch(editProfile(data));
		Alert.alert("Password Changed Successfully");
		navigation("/profile");
	};

	function handleCancel() {
		navigation("/profile");
	}

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<View style={styles.portada}>
				<Formik
					initialValues={{
						_id: user._id,
						password: "",
						confirmPassword: "",
					}}
					validationSchema={reviewSchema}
					onSubmit={submit}
				>
					{(formikProps) => (
						<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
							<View style={styles.form_container}>
								<Text style={styles.portada_text}>Change Password</Text>
								<Text
									style={{
										...styles.portada_text,
										marginLeft: 30,
										marginBottom: 5,
										textAlign: "left",
										fontSize: 20,
									}}
								>
									New Password
								</Text>
								<TextInput
									placeholder="New Password"
									secureTextEntry={true}
									onChangeText={formikProps.handleChange("password")}
									value={formikProps.values.password}
									onBlur={formikProps.handleBlur("password")}
									style={styles.input}
								/>
								<Text style={{ color: "red", fontSize: 15, marginBottom: -10 }}>
									{formikProps.touched.password && formikProps.errors.password}
								</Text>
								<View style={styles.relleno}></View>
								<Text
									style={{
										...styles.portada_text,
										marginLeft: 30,
										marginBottom: 5,
										textAlign: "left",
										fontSize: 20,
									}}
								>
									Confirm Password
								</Text>
								<TextInput
									placeholder="Repeat Password"
									secureTextEntry={true}
									onChangeText={formikProps.handleChange("confirmPassword")}
									value={formikProps.values.confirmPassword}
									onBlur={formikProps.handleBlur("confirmPassword")}
									style={styles.input}
								/>
								<Text style={{ color: "red", fontSize: 15, marginBottom: -10 }}></Text>
								<View style={styles.relleno}></View>

								<View
									style={{
										flexDirection: "row",
										width: "100%",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<TouchableOpacity
										underlayColor={""}
										style={{
											marginRight: "50%",
											padding: 10,
											width: "auto",
											height: "auto",
											alignItems: "center",
											backgroundColor: "#cf1500",
											borderRadius: 15,
										}}
										onPress={() => handleCancel()}
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
										style={{
											padding: 10,
											width: "auto",
											height: "auto",
											alignItems: "center",
											backgroundColor: "#2089DC",
											borderRadius: 15,
										}}
										onPress={formikProps.handleSubmit}
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
						</TouchableWithoutFeedback>
					)}
				</Formik>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	portada: {
		padding: 20,
		width: "90%",
		alignItems: "center",
		backgroundColor: "#3019bf",
		borderRadius: 20,
	},
	portada_text: {
		marginBottom: 10,
		width: "100%",
		color: "white",
		textAlign: "center",
		fontSize: 35,
	},
	form_container: {
		width: "100%",
		alignItems: "center",
	},
	input: {
		borderWidth: 1,
		backgroundColor: "#fff",
		height: 38,
		width: "100%",
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
		marginTop: 15,
	},
});

export default ChangePassword;
