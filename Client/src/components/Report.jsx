import { useDispatch, useSelector } from "react-redux";
import { addReport } from "../redux/actions/index.js";
import { useNavigate } from "react-router-native";
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
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

const reportSchema = yup.object({
	reason: yup.string().required().min(10),
});

const Reports = () => {
	const dispatch = useDispatch();
	const navigation = useNavigate();
	const user = useSelector((state) => state.games.user);
	const reportedUsers = useSelector((state) => state.games.userNameChat);

	const submits = async (values, actions) => {
		// console.log(values)
		dispatch(addReport(values));
		navigation("/selectchat");
	};

	function handleCancel() {
		navigation("/chat/profile");
	}

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<View style={styles.portada}>
				<Formik
					initialValues={{
						author: user._id,
						reason: "",
						reportedUser: reportedUsers._id,
					}}
					validationSchema={reportSchema}
					onSubmit={submits}
				>
					{(formikProps) => (
						<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
							<View style={styles.form_container}>
								<Text style={styles.portada_title}>Report User</Text>
								<Text style={styles.portada_text}>
									When the report is sent the chat will be deleted so... the user can no
									longer bother you
								</Text>
								<TextInput
									placeholder="Reason"
									multiline={true}
									onChangeText={formikProps.handleChange("reason")}
									value={formikProps.values.reason}
									onBlur={formikProps.handleBlur("reason")}
									style={{
										...styles.input,
										height: 90,
									}}
								/>
								<Text style={{ color: "red", fontSize: 15, marginBottom: -10 }}>
									{formikProps.touched.reason && formikProps.errors.reason}
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
	portada_title: {
		width: "100%",
		color: "white",
		textAlign: "center",
		fontSize: 35,
	},
	portada_text: {
		marginBottom: 10,
		width: "100%",
		color: "white",
		textAlign: "center",
		fontSize: 15,
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

export default Reports;
