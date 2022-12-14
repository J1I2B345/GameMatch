import { useDispatch, useSelector } from "react-redux";
import { addNews } from "../redux/actions/index.js";
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
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

const reviewSchema = yup.object({
	title: yup.string().required().min(1),
	description: yup.string().required().min(1),
});

const CreateNews = () => {
	const dispatch = useDispatch();
	const navigation = useNavigate();
	const user = useSelector((state) => state.games.user);

	const submit = (values, actions) => {
		dispatch(addNews(values));
		navigation("/news");
	};

	function handleCancel() {
		navigation("/news");
	}

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<View style={styles.portada}>
				<Formik
					initialValues={{
						author: user._id,
						title: "",
						description: "",
					}}
					validationSchema={reviewSchema}
					onSubmit={submit}
				>
					{(formikProps) => (
						<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
							<View style={styles.form_container}>
								<Text style={styles.portada_text}>New Post</Text>
								<TextInput
									placeholder="Title"
									onChangeText={formikProps.handleChange("title")}
									value={formikProps.values.title}
									onBlur={formikProps.handleBlur("title")}
									style={styles.input}
								/>
								<Text style={{ color: "red", fontSize: 15, marginBottom: -10 }}>
									{formikProps.touched.title && formikProps.errors.title}
								</Text>
								<View style={styles.relleno}></View>
								<TextInput
									placeholder="Description"
									multiline={true}
									onChangeText={formikProps.handleChange("description")}
									value={formikProps.values.description}
									onBlur={formikProps.handleBlur("description")}
									style={{
										...styles.input,
										height: 90,
									}}
								/>
								<Text style={{ color: "red", fontSize: 15, marginBottom: -10 }}>
									{formikProps.touched.description && formikProps.errors.description}
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
	portada_text: {
		marginBottom: 15,
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

export default CreateNews;
