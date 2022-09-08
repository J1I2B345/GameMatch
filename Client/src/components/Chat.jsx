import {
	TextInput,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableWithoutFeedback,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import Spinner from "./Spinner";
import { setEmptyUserName } from "../redux/actions/index.js";

const Chat = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [chatMessage, setChatMessage] = useState("");
	const [chatMessages, setChatMessages] = useState([]);
	const user = useSelector((state) => state.games.user);
	const userName = useSelector((state) => state.games.userNameChat);
	const { id } = useParams();
	const socket = useSelector((state) => state.games.socketIo);
	const darkMood = useSelector((state) => state.games.darkMood);

	useEffect(() => {
		try {
			const getMessages = async () => {
				const response = await axios
					.get(
						`https://backend-gamematch.herokuapp.com/chats/?sender=${user._id}&receiver=${id}`
					)
					.catch((err) => console.log(err.message));
				setChatMessages(response.data);
			};
			getMessages();
		} catch (e) {
			console.log(e.message);
		}
	}, []);

	useEffect(() => {
		socket.emit("joinChat", user);
	}, []);

	useEffect(() => {
		socket.on("server: received message", (msg) => {
			let newMessage = {
				fromSelf: msg.sender.toString() === user._id.toString(),
				message: msg.message,
			};

			setChatMessages([...chatMessages, newMessage]);
		});
		return () => {
			socket.off("server: received message");
		};
	}, [socket, chatMessages]);

	async function submitChatMessage(e) {
		if (chatMessage.trim() !== "") {
			//formatea el mensaje
			let msg = {
				message: chatMessage.trim(),
				users: [user._id, id],
				sender: user._id,
			};
			//envía mensaje a la DB
			let msgInDb = await axios
				.post("https://backend-gamematch.herokuapp.com/chats", msg)
				.catch((error) => console.log(error.message));
			//si se mandó el mensaje a la DB envía al otro usuario
			socket.emit("client: send message", msg);
			let msgSent = {
				fromSelf: msg.sender.toString() === user._id.toString(),
				message: msg.message,
			};
			setChatMessages([...chatMessages, msgSent]);
			setChatMessage("");
		}
	}

	function handleChange(e) {
		setChatMessage(e);
	}

	function backToSelectChat() {
		dispatch(setEmptyUserName());
		navigate("/selectchat");
	}

	function seeProfile() {
		navigate("/chat/profile");
	}

	const scrollViewRef = useRef();

	return (
		<View>
			{userName && userName.username ? (
				<View style={{ height: "100%" }}>
					<View
						style={
							darkMood == false
								? {
										height: Constants.statusBarHeight,
										backgroundColor: "#281883",
								  }
								: {
										height: Constants.statusBarHeight,
										backgroundColor: "#4D0F73",
								  }
						}
					></View>
					<View
						style={
							darkMood == false
								? {
										backgroundColor: "#281883",
										alignItems: "center",
										flexDirection: "row",
								  }
								: {
										backgroundColor: "#4D0F73",
										alignItems: "center",
										flexDirection: "row",
								  }
						}
					>
						<TouchableOpacity
							onPress={() => backToSelectChat()}
							style={{ marginTop: 0, marginLeft: 10 }}
						>
							<View style={{ flexDirection: "row" }}>
								<Text style={{ marginTop: 7, color: "white", fontSize: 20 }}>❮❮</Text>
								<Image
									source={{
										uri: userName.img
											? userName.img
											: "https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg",
									}}
									style={{ marginLeft: 10, width: 45, height: 45, borderRadius: 50 }}
								/>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => seeProfile()}
							style={{
								marginLeft: 15,
								height: 70,
								width: "100%",
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							<Text style={{ color: "#fff", fontSize: 25 }}>{userName.username}</Text>
						</TouchableOpacity>
					</View>
					<ScrollView
						ref={scrollViewRef}
						onContentSizeChange={() =>
							scrollViewRef.current.scrollToEnd({ animated: true })
						}
					>
						<View style={{ margin: 5, marginTop: 0, marginBottom: 0 }}>
							{chatMessages &&
								chatMessages.map((chatMessage, i) => (
									<View
										key={i}
										style={
											chatMessage.fromSelf === true
												? {
														alignItems: "flex-end",
												  }
												: {
														alignItems: "flex-start",
												  }
										}
									>
										<View
											style={
												chatMessage.fromSelf === true
													? darkMood == false
														? {
																margin: 5,
																marginLeft: "20%",
																padding: 13,
																width: "auto",
																borderRadius: 15,
																color: "#fff",
																textAlign: "left",
																backgroundColor: "#443abb",
														  }
														: {
																margin: 5,
																marginLeft: "20%",
																padding: 13,
																width: "auto",
																borderRadius: 15,
																color: "#fff",
																textAlign: "left",
																backgroundColor: "#640F8C",
														  }
													: darkMood == false
													? {
															margin: 5,
															marginRight: "20%",
															padding: 13,
															width: "auto",
															borderRadius: 15,
															color: "#fff",
															backgroundColor: "#655ebe",
													  }
													: {
															margin: 5,
															marginRight: "20%",
															padding: 13,
															width: "auto",
															borderRadius: 15,
															color: "#fff",
															backgroundColor: "#503276",
													  }
											}
										>
											<Text key={i} style={{ color: "#fff" }}>
												{/* tiene una propiedad que es fromSelf => si es true, es del mismo que envía y debería estar a la derecha el mensaje, si es false es del otro y debería estar a la izquierda. no se como hacerlo */}
												{chatMessage.message}
											</Text>
										</View>
									</View>
								))}
						</View>
					</ScrollView>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							margin: 5,
							backgroundColor: "none",
						}}
					>
						<TextInput
							placeholder="Message"
							autoCorrect={false}
							value={chatMessage}
							onChangeText={(e) => handleChange(e)}
							multiline={true}
							style={{
								padding: 4,
								height: 45,
								width: "87%",
								borderWidth: 1,
								borderRadius: 50,
								textAlign: "center",
								backgroundColor: "#fff",
							}}
						/>
						<TouchableWithoutFeedback
							onPress={(e) => {
								submitChatMessage(e);
								console.log(chatMessages);
								console.log(user);
								setChatMessage("");
							}}
						>
							<Image
								source={require("../../assets/iconSend.png")}
								style={{
									marginLeft: 10,
									width: 30,
									height: 30,
								}}
							/>
						</TouchableWithoutFeedback>
					</View>
				</View>
			) : (
				<Spinner />
			)}
			<StatusBar style="auto" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: "100%",
	},
});

// antiguo style chat
// style={{
//     margin: 5,
//     padding: 13,
//     borderRadius: 15,
//     width: 65,
//     color: "#fff",
//     textAlign: "center",
//     backgroundColor: "#655EBE",
// }}

export default Chat;
