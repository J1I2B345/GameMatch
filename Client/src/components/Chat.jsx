import {
	TextInput,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableWithoutFeedback,
	ScrollView,
} from "react-native";
import Constants from "expo-constants";
import io from "socket.io-client";
import Nav from "./Nav";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";

const Chat = () => {
	const [chatMessage, setChatMessage] = useState("");
	const [chatMessages, setChatMessages] = useState([]);
	const user = useSelector((state) => state.games.user);
	const socket = useRef();
	const { id } = useParams();

	useEffect(() => {
		try {
			const getMessages = async () => {
				const response = await axios.get(
					`https://backend-gamematch.herokuapp.com/chats/?sender=${user._id}&receiver=${id}`
				);
				setChatMessages(response.data);
			};
			getMessages();
		} catch (e) {
			console.log(e.message);
		}
	}, []);

	useEffect(() => {
		socket.current = io("https://backend-gamematch.herokuapp.com");
		socket.current.emit("joinChat", user);
	}, []);

	useEffect(() => {
		socket.current.on("server: received message", (msg) => {
			let newMessage = {
				fromSelf: msg.sender.toString() === user._id.toString(),
				message: msg.message,
			};

			setChatMessages([...chatMessages, newMessage]);
		});
		return () => {
			socket.current.off("server: received message");
		};
	}, [socket.current, chatMessages]);

	async function submitChatMessage(e) {
		//formatea el mensaje
		let msg = {
			message: chatMessage,
			users: [user._id, id],
			sender: user._id,
		};
		//envía mensaje a la DB
		let msgInDb = await axios.post(
			"https://backend-gamematch.herokuapp.com/chats",
			msg
		);
		//si se mandó el mensaje a la DB envía al otro usuario
		socket.current.emit("client: send message", msg);
		let msgSent = {
			fromSelf: msg.sender.toString() === user._id.toString(),
			message: msg.message,
		};
		setChatMessages([...chatMessages, msgSent]);
		setChatMessage("");
	}

	function handleChange(e) {
		setChatMessage(e);
	}

	const scrollViewRef = useRef();

	return (
		<View style={{ height: "100%" }}>
			<StatusBar style="auto" />
			<View
				style={{
					marginTop: Constants.statusBarHeight,
					alignItems: "center",
				}}
			>
				<Text style={{ color: "white", fontSize: 40 }}> Chat</Text>
			</View>
			<ScrollView
				ref={scrollViewRef}
				onContentSizeChange={() =>
					scrollViewRef.current.scrollToEnd({ animated: true })
				}
			>
				<View style={{ margin: 10 }}>
					{chatMessages &&
						chatMessages.map((chatMessage, i) => (
							<Text
								key={i}
								style={{
									margin: 5,
									padding: 13,
									borderRadius: 15,
									width: 65,
									color: "#fff",
									textAlign: "center",
									backgroundColor: "#655EBE",
								}}
							>
								{/* tiene una propiedad que es fromSelf => si es true, es del mismo que envía y debería estar a la derecha el mensaje, si es false es del otro y debería estar a la izquierda. no se como hacerlo */}
								{chatMessage.message}
							</Text>
						))}
				</View>
			</ScrollView>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<TextInput
					style={{
						height: 45,
						width: "90%",
						borderWidth: 1,
						borderRadius: 50,
						textAlign: "center",
						backgroundColor: "#fff",
					}}
					placeholder="Message"
					autoCorrect={false}
					value={chatMessage}
					onChangeText={(e) => handleChange(e)}
				/>
				<TouchableWithoutFeedback
					onPress={(e) => {
						submitChatMessage(e);
						setChatMessage("");
					}}
				>
					<Image
						source={require("../../assets/iconSend.png")}
						style={{
							width: 30,
							height: 30,
						}}
					/>
				</TouchableWithoutFeedback>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: "100%",
	},
});

export default Chat;
