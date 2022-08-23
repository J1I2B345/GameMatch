import { StatusBar } from "expo-status-bar";
import { Image, Text, View, Alert, ScrollView } from "react-native";
import Constants from "expo-constants";
import { Link } from "react-router-native";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import InvitationCard from "./InvitationCard";

export default function InvitationsRoom() {
	const userGlobal = useSelector((state) => state.games.user);

	let notificationsReceived = useSelector((state) => state.games.notifications);

	// let game = userGlobal.game;
	// let games = useSelector((state) => state.games.games);
	// let userGame = games.find((element) => element.name === game);
	// let id = userGame._id;

	let socketIo = useSelector((state) => state.games.socketIo);

	// console.log("notificaciones", notificationsReceived);
	// useEffect(() => {
	// 	if (socketIo) {
	// 		socketIo.on("server: invitation", (invitationUser) => {
	// 			setNotifications(invitationUser);
	// 			Alert.alert("te llegó una notificación tilinn");
	// 		});
	// 	}
	// }, []);

	return (
		<View style={{ height: "100%" }}>
			<StatusBar style="auto" />
			<ScrollView>
				<View style={{ marginTop: Constants.statusBarHeight, alignItems: "center" }}>
					{notificationsReceived.length > 0 ? (
						notificationsReceived.map((e) => {
							return (
								<InvitationCard
									key={e.user._id}
									img={e.user.img}
									_id={e.user._id}
									name={e.user.username}
									elo={e.user.elo}
									position={e.user.position}
									rating={e.user.rating}
									socketid={e.socketid}
									invitationSentUser={e}
								/>
							);
						})
					) : (
						<Text> ke ha pazao</Text>
					)}
				</View>
			</ScrollView>
			<Link
				to={`/selectgame`}
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
		</View>
	);
}
