import React from "react";
import { View, Text, TouchableWithoutFeedback, Alert } from "react-native";
import PlayerCard from "./PlayerCard";

export default function Players({ players, sendInvitation }) {
	return (
		<View>
			{players.length > 0 ? (
				players.map((player, i) => {
					return (
						<PlayerCard
							key={i}
							img={player.img}
							id={player._id}
							name={player.username}
							elo={player.elo}
							position={player.position}
							rating={player.rating}
							socketid={player.socketid}
							sendInvitation={sendInvitation}
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
					Waiting for players...
				</Text>
			)}
		</View>
	);
}
