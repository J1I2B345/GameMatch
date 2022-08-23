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
						<Text
							style={{
								textAlign: "center",
								color: "white",
								fontSize: 20,
							}}
						>
							{" "}
							No invitations received
						</Text>
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
