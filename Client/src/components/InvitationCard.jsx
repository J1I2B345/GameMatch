import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, Alert, Modal } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link } from "react-router-native";
import { useDispatch, useSelector } from "react-redux";
import Constants from "expo-constants";
import { removeOneNotification } from "../redux/actions";
import axios from "axios";

const InvitationCard = ({
	_id,
	img,
	name,
	elo,
	position,
	rating,
	socketid,
	invitationSentUser,
}) => {
	const [view, setView] = useState(false);
	const user = useSelector((state) => state.games.user);
	const darkMood = useSelector((state) => state.games.darkMood);
	const socket = useSelector((state) => state.games.socketIo);
	const dispatch = useDispatch();

	function acceptInvitation() {
		let users = { users: [user._id, invitationSentUser._id] };
		//chat connection
		axios
			.post("https://backend-gamematch.herokuapp.com/chats/addUserToChat/", users)
			.then((data) => Alert.alert(`Now you can chat with ${invitationSentUser.username}`))
			.catch((error) => console.log(error.message));

		//remove the notification from the client
		dispatch(removeOneNotification(invitationSentUser));

		// sent to socket to notify the other client that the invitation was accepted
		let invitationAccepted = {
			userThatAccepted: user,
			userThatInvited: invitationSentUser,
		};
		socket.emit("client: invitationAccepted", invitationAccepted);
	}

	function declineInvitation() {
		dispatch(removeOneNotification(invitationSentUser));
		let invitationDeclined = {
			userThatDeclined: user,
			userThatInvited: invitationSentUser,
		};
		socket.emit("client: invitationDeclined", invitationDeclined);
	}
	return (
		<View key={_id} style={{ margin: 5 }}>
			<TouchableOpacity
				activeOpacity={0.5}
				underlayColor={""}
				onPress={() => setView(true)}
			>
				<Modal transparent visible={view} animationType="fade">
					<View
						style={{
							flex: 1,
							backgroundColor: "rgba(1,1,1, 0.5)",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<StatusBar backgroundColor="rgba(1,1,1, 0.5)" />
						<View
							style={{
								height: "60%",
								width: "90%",
								backgroundColor: "#5F0f99",
								borderRadius: 10,
								alignItems: "center",
							}}
						>
							<Image
								source={
									img
										? { uri: img }
										: {
												uri: "https://www.pngplay.com/wp-content/uploads/13/Gamer-Aesthetic-PNG-Photo-Image.png",
										  }
								}
								style={{
									marginTop: "1%",
									width: 150,
									height: 150,
									borderRadius: 150,
								}}
							/>

							<Text style={{ fontSize: 40, color: "#fff" }}>{name}</Text>
							<View
								style={{
									marginTop: "5%",
									width: "100%",
									flexDirection: "row",
									justifyContent: "space-around",
								}}
							>
								<Text style={{ fontSize: 25, color: "#fff" }}>{elo}</Text>
								<Text style={{ fontSize: 25, color: "#fff" }}>{position}</Text>
							</View>
							<Text style={{ fontSize: 33, marginTop: "5%", color: "#fff" }}>
								Rating: {Math.floor(rating.$numberDecimal)}
							</Text>
							<View
								style={{
									marginTop: "5%",
									width: "100%",
									flexDirection: "row",
									justifyContent: "space-around",
								}}
							>
								<TouchableOpacity
									onPress={() => {
										declineInvitation(), setView(false);
									}}
								>
									<Image
										source={require("../../assets/cancelar.png")}
										style={{ width: 45, height: 45 }}
									/>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => {
										acceptInvitation(), setView(false);
									}}
								>
									<Image
										source={require("../../assets/acceptChanges.png")}
										style={{ width: 50, height: 50 }}
									/>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
				<View
					style={
						darkMood == false
							? {
									width: 350,
									height: 80,
									borderRadius: 20,
									backgroundColor: "#3519B0",
									flexDirection: "row",
									alignItems: "center",
							  }
							: {
									width: 350,
									height: 80,
									borderRadius: 20,
									backgroundColor: "#4700A1",
									flexDirection: "row",
									alignItems: "center",
							  }
					}
				>
					<Image
						source={
							img
								? { uri: img }
								: {
										uri: "https://www.pngplay.com/wp-content/uploads/13/Gamer-Aesthetic-PNG-Photo-Image.png",
								  }
						}
						style={{
							marginLeft: 20,
							width: 60,
							height: 60,
							borderRadius: 50,
						}}
					/>
					<View
						style={{
							marginLeft: 10,
							width: "75%",
							flexDirection: "row",
						}}
					>
						<Text
							style={{
								paddingRight: 10,
								width: "50%",
								fontSize: 20,
								color: "#fff",
								textAlign: "center",
							}}
						>
							{name}
						</Text>

						<View style={{ width: "50%" }}>
							{elo && (
								<Text
									style={{
										fontSize: 13,
										color: "#fff",
									}}
								>
									Elo: {elo}
								</Text>
							)}
							{position && (
								<Text
									style={{
										fontSize: 13,
										color: "#fff",
									}}
								>
									Position: {position}
								</Text>
							)}
							{rating && rating.$numberDecimal ? (
								<Text
									style={{
										fontSize: 13,
										color: "#fff",
									}}
								>
									Calification: {rating.$numberDecimal}
								</Text>
							) : (
								<Text
									style={{
										fontSize: 13,
										color: "#fff",
									}}
								>
									Calification: {rating}
								</Text>
							)}
						</View>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default InvitationCard;
