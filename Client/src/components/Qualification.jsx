import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rateUser } from "../redux/actions/index.js";
import { Link, useNavigate } from "react-router-native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

const Qualification = () => {
	const dispatch = useDispatch();
	const navigation = useNavigate();
	const user = useSelector((state) => state.games.user);
	const contact = useSelector((state) => state.games.userNameChat);

	const [defaultRating, setDefaultRating] = useState(0);
	const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

	const starImgFilled = "../../assets/starCalification.png";
	const starImgCorner = "../../assets/Star.png";

	const handleSubmit = (values, actions) => {
		let data = { userRated: contact._id, reviewer: user._id, qualification: values };
		dispatch(rateUser(data));
		navigation("/chat/profile");
	};

	function handleCancel() {
		navigation("/chat/profile");
	}

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<View style={styles.portada}>
				<View style={styles.form_container}>
					<View style={{ flexDirection: "row" }}>
						<Text
							style={{
								marginBottom: 15,
								width: "auto",
								color: "white",
								textAlign: "center",
								fontSize: 30,
							}}
						>
							Rate User
						</Text>
					</View>

					<View style={{ flexDirection: "row" }}>
						{maxRating.map((item, key) => {
							return (
								<TouchableOpacity
									activeOpacity={0.7}
									key={item}
									onPress={() => setDefaultRating(item)}
								>
									<Image
										source={
											item <= defaultRating
												? require(starImgCorner)
												: require(starImgFilled)
										}
										style={{
											marginLeft: 5,
											width: 28,
											height: 28,
											marginBottom: 15,
											marginTop: "4%",
										}}
									/>
								</TouchableOpacity>
							);
						})}
					</View>

					<Text
						style={{
							width: "auto",
							color: "white",
							textAlign: "center",
							fontSize: 20,
						}}
					>
						{defaultRating + "/" + maxRating.length}
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
							onPress={() => handleSubmit(defaultRating)}
							style={{
								padding: 10,
								width: "auto",
								height: "auto",
								alignItems: "center",
								backgroundColor: "#2089DC",
								borderRadius: 15,
							}}
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

export default Qualification;
