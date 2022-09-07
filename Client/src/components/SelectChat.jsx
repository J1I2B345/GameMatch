import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
	Image,
	SafeAreaView,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Constants from "expo-constants";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-native";
import Spinner from "./Spinner";
import Nav from "./Nav";
import { getNameUserChat } from "../redux/actions";

export default function SelectChat() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	let [contacts, setContacts] = useState("");
	const [error, setError] = useState("");
	let user = useSelector((state) => state.games.user);
	let darkMood = useSelector((state) => state.games.darkMood);
	let id = user._id;

	async function getChats() {
		try {
			let respuesta = await axios.get(
				`https://backend-gamematch.herokuapp.com/chats/getUsersToChat/${id}`
			);
			let contactsResponse = respuesta.data;
			setContacts(contactsResponse);
		} catch (e) {
			setError(e.message);
		}
	}

	useEffect(() => {
		getChats();
	}, []);

	function handleClick(idContact) {
		dispatch(getNameUserChat(idContact));
		navigate(`/chat/${idContact}`);
	}

	return (
		<View style={{ height: "100%", alignItems: "center" }}>
			{contacts || error ? (
				contacts.length > 0 ? (
					<View style={{ width: "100%", alignItems: "center" }}>
						<Text
							style={{
								marginTop: Constants.statusBarHeight,
								marginBottom: 5,
								color: "white",
								fontSize: 40,
							}}
						>
							Chats
						</Text>
						{darkMood == false ? (
							<View
								style={{
									marginBottom: 5,
									height: 2,
									width: "90%",
									backgroundColor: "#98228C",
								}}
							></View>
						) : (
							<View
								style={{
									marginBottom: 5,
									height: 2,
									width: "90%",
									backgroundColor: "#4D0F73",
								}}
							></View>
						)}

						<ScrollView style={{ width: "100%", height: "80%" }}>
							<View
								style={{
									width: "100%",
									height: "80%",
									paddingBottom: 12,
									alignItems: "center",
								}}
							>
								{contacts.map((contact) => {
									return (
										<TouchableOpacity
											key={contact._id}
											onPress={() => handleClick(contact._id)}
											style={
												darkMood == false
													? {
															margin: 6,
															padding: 10,
															width: "94%",
															borderRadius: 10,
															flexDirection: "row",
															alignItems: "center",
															backgroundColor: "#3519B0",
													  }
													: {
															margin: 6,
															padding: 10,
															width: "94%",
															borderRadius: 10,
															flexDirection: "row",
															alignItems: "center",
															backgroundColor: "#4D0F73",
													  }
											}
											activeOpacity={0.7}
											underlayColor={""}
										>
											<View
												style={{
													flexDirection: "row",
													alignItems: "center",
												}}
												key={contact._id}
											>
												<Image
													style={{
														width: 50,
														height: 50,
														borderRadius: 50,
													}}
													source={{
														uri: contact.img
															? contact.img
															: "https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg",
													}}
												/>
												<Text
													style={{
														color: "white",
														fontSize: 25,
														marginLeft: 20,
													}}
												>
													{contact.username}
												</Text>
											</View>
										</TouchableOpacity>
									);
								})}
							</View>
						</ScrollView>
					</View>
				) : (
					<View style={{ height: "100%" }}>
						<Text
							style={{
								marginTop: Constants.statusBarHeight,
								marginBottom: 5,
								color: "white",
								fontSize: 40,
							}}
						>
							Chats
						</Text>

						{darkMood == false ? (
							<View
								style={{
									marginBottom: 5,
									height: 2,
									width: "90%",
									backgroundColor: "#98228C",
								}}
							></View>
						) : (
							<View
								style={{
									marginBottom: 5,
									height: 2,
									width: "90%",
									backgroundColor: "#4D0F73",
								}}
							></View>
						)}

						<View style={{ height: "80%", justifyContent: "center" }}>
							<Text
								style={{
									textAlign: "center",
									color: "white",
									fontSize: 25,
									marginLeft: 10,
								}}
							>
								No friends to chat
							</Text>
						</View>
					</View>
				)
			) : (
				<Spinner />
			)}

			<StatusBar style="auto" />
			<Nav />
		</View>
	);
}
