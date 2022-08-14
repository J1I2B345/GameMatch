import { useDispatch } from "react-redux";
import { Image } from "react-native";
import { createGame } from "../redux/actions";
import { Link } from "react-router-native";
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
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

const reviewSchema = yup.object({
	name: yup.string().required().min(3),
	gender: yup.string().required().min(3),
	elo: yup.string().required().min(3),
	position: yup.string().required().min(3),
	image: yup.string().required().url(),
});

export default function CreateGame() {
	const dispatch = useDispatch();

	const submit = (values, actions) => {
		console.log({ values });
		dispatch(createGame(values));
		alert("Juego creado");
		actions.resetForm();
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View style={styles.portada}>
					<Formik
						initialValues={{
							name: "",
							gender: "",
							elo: "",
							position: "",
							image: "",
						}}
						validationSchema={reviewSchema}
						onSubmit={submit}
					>
						{(formikProps) => (
							<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
								<View style={styles.form_container}>
									<Text
										style={{
											marginTop: -80,
											marginBottom: 30,
											width: "80%",
											color: "white",
											textAlign: "center",
											fontSize: 45,
										}}
									>
										Create Your Game
									</Text>
									<View
										style={{
											height: 2,
											width: "90%",
											backgroundColor: "#98228C",
										}}
									></View>
									<TextInput
										style={{ ...styles.input, marginTop: 50 }}
										placeholder="Nombre del juego"
										onChangeText={formikProps.handleChange("name")}
										value={formikProps.values.name}
										onBlur={formikProps.handleBlur("name")}
									/>
									<Text style={styles.errorText}>
										{formikProps.touched.name && formikProps.errors.name}
									</Text>
									<TextInput
										style={styles.input}
										placeholder="Genero del juego"
										onChangeText={formikProps.handleChange("gender")}
										value={formikProps.values.gender}
										onBlur={formikProps.handleBlur("gender")}
									/>
									<Text style={styles.errorText}>
										{formikProps.touched.gender && formikProps.errors.gender}
									</Text>
									<TextInput
										multiline
										style={styles.input}
										placeholder="Niveles de jugadores"
										onChangeText={formikProps.handleChange("elo")}
										value={formikProps.values.elo}
										onBlur={formikProps.handleBlur("elo")}
									/>
									<Text style={styles.errorText}>
										{formikProps.touched.elo && formikProps.errors.elo}
									</Text>

									<TextInput
										multiline
										style={styles.input}
										placeholder="Posiciones de jugadores"
										onChangeText={formikProps.handleChange("position")}
										value={formikProps.values.position}
										onBlur={formikProps.handleBlur("position")}
									/>
									<Text style={styles.errorText}>
										{formikProps.touched.position &&
											formikProps.errors.position}
									</Text>
									<TextInput
										style={{ ...styles.input, marginBottom: 15 }}
										placeholder="Imagen en url"
										onChangeText={formikProps.handleChange("image")}
										value={formikProps.values.image}
										onBlur={formikProps.handleBlur("image")}
									/>
									<Text style={styles.errorText}>
										{formikProps.touched.image && formikProps.errors.image}
									</Text>

									<Button
										style={styles.button}
										title="Crear Juego"
										onPress={formikProps.handleSubmit}
									/>
								</View>
							</TouchableWithoutFeedback>
						)}
					</Formik>
				</View>
			</ScrollView>
			<Link
				to="/selectgame"
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
}
const styles = StyleSheet.create({
	container: {
		height: "100%",
		width: "100%",
		alignItems: "center",
	},
	portada: {
		marginTop: 120,
		marginBottom: 50,
		flexDirection: "row",
	},
	portada_text: {
		marginRight: 30,
	},
	form_container: {
		width: "100%",
		alignItems: "center",
	},
	input: {
		marginTop: 20,
		borderWidth: 1,
		backgroundColor: "#fff",
		height: 38,
		width: "60%",
		fontSize: 15,
		borderRadius: 20,
		textAlign: "center",
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
	errorText: {
		color: "crimson",
		fontWeight: "bold",
		marginBottom: 10,
		marginTop: 6,
	},
});
