import { StatusBar } from "expo-status-bar";
import { Image, Text, View, Alert, ScrollView } from "react-native";
import Constants from "expo-constants";
import { Link } from "react-router-native";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import InvitationCard from "./InvitationCard";
import Nav from "./Nav";

export default function InvitationsRoom() {
	const userGlobal = useSelector((state) => state.games.user);
	const games = useSelector((state) => state.games.games);
	let notificationsReceived = useSelector((state) => state.games.notifications);
	const game = userGlobal.game;
	var selectedGame;
	let _id;
	if (game) {
		selectedGame = games.find((el) => el.name === game);
		_id = selectedGame._id;
	}

	return (
		<View style={{ height: "100%" }}>
			<StatusBar style="auto" />
			<ScrollView>
				<View style={{ marginTop: Constants.statusBarHeight, alignItems: "center" }}>
					{notificationsReceived.length > 0 ? (
						notificationsReceived.map((e) => {
							return (
								<InvitationCard
									key={e._id}
									img={e.img}
									_id={e._id}
									name={e.username}
									elo={e.elo}
									position={e.position}
									rating={e.rating}
									socketid={e.socketid}
									invitationSentUser={e}
								/>
							);
						})
					) : (
						<View style={{ height: "100%", justifyContent: "center" }}>
							<Text
								style={{
									marginTop: "85%",
									textAlign: "center",
									color: "white",
									fontSize: 20,
								}}
							>
								{" "}
								No invitations received
							</Text>
						</View>
					)}
				</View>
			</ScrollView>
			{_id ? (
				<Link
					to={`/room/${_id}`}
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
			) : (
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
			)}
			<Nav />
		</View>
	);
}
