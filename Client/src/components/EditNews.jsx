import { useDispatch, useSelector } from "react-redux";
import { deleteNews, editNews } from "../redux/actions/index.js";
import { Link, useNavigate } from "react-router-native";
import { connect } from "react-redux";
import {
	StyleSheet,
	TextInput,
	View,
	Text,
	TouchableWithoutFeedback,
	Keyboard,
	TouchableOpacity,
	Image,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

const reviewSchema = yup.object({
	description: yup.string().required().min(1),
});

const EditNews = () =>
	// { _id, title, description }
	{
		const dispatch = useDispatch();
		const navigation = useNavigate();
		const user = useSelector((state) => state.games.userProfile);
		const New = useSelector((state) => state.games.newsInfo);
		console.log(New);

		function handleDelete(idNew) {
			dispatch(deleteNews(idNew));
			navigation("/news");
		}

		const submit = (values, actions) => {
			dispatch(editNews(values));
			navigation("/news");
		};

		return (
			<View style={styles.container}>
				<View style={styles.portada}>
					<Formik
						initialValues={{
							_id: New._id,
							editedBy: user._id,
							title: New.title,
							description: New.description,
						}}
						validationSchema={reviewSchema}
						onSubmit={submit}
					>
						{(formikProps) => (
							<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
								<View style={styles.form_container}>
									<Text style={styles.portada_text}>Edit Post</Text>
									<TextInput
										style={styles.input}
										placeholder="Title"
										onChangeText={formikProps.handleChange("title")}
										value={formikProps.values.title}
										onBlur={formikProps.handleBlur("title")}
									/>
									<View style={styles.relleno}></View>
									<TextInput
										style={{
											...styles.input,
											height: 90,
										}}
										placeholder="Description"
										onChangeText={formikProps.handleChange("description")}
										value={formikProps.values.description}
										onBlur={formikProps.handleBlur("description")}
									/>
									<View style={styles.relleno}></View>
									<View
										style={{
											flexDirection: "row",
											width: "100%",
											alignItems: "center",
											justifyContent: "space-around",
										}}
									>
										<Link
											to="/news"
											activeOpacity={1}
											underlayColor={""}
											style={{
												padding: 10,
												width: "auto",
												height: "auto",
												alignItems: "center",
												backgroundColor: "#cf1500",
												borderRadius: 15,
											}}
										>
											<Text
												style={{
													fontSize: 16,
													color: "#fff",
												}}
											>
												cancel
											</Text>
										</Link>
										<TouchableOpacity
											style={{
												marginRight: -4.5,
												width: "auto",
												height: "auto",
												alignItems: "center",
												borderRadius: 15,
											}}
											onPress={() => handleDelete(New._id)}
										>
											<Image
												source={require("../../assets/iconTrash.png")}
												style={{
													width: 22,
													height: 22,
												}}
											/>
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

export default EditNews;
