import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, Alert, Modal } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link } from "react-router-native";

const PlayerCard = ({
	id,
	img,
	name,
	elo,
	position,
	rating,
	socketid,
	sendInvitation,
}) => {
	const [view, setView] = useState(false);
	return (
		<View key={id} style={{ margin: 5 }}>
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
							{img && (
								<Image
									source={{ uri: img }}
									style={{
										marginTop: "5%",
										width: 150,
										height: 150,
										borderRadius: 150,
									}}
								/>
							)}
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
								Rating: {rating.$numberDecimal}
							</Text>
							<View
								style={{
									marginTop: "5%",
									width: "100%",
									flexDirection: "row",
									justifyContent: "space-around",
								}}
							>
								<TouchableOpacity onPress={() => setView(false)}>
									<Image
										source={require("../../assets/cancelar.png")}
										style={{ width: 45, height: 45 }}
									/>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => {
										sendInvitation(socketid), setView(false);
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
					style={{
						width: 350,
						height: 80,
						borderRadius: 20,
						backgroundColor: "#3519B0",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					{img && (
						<Image
							source={{ uri: img }}
							style={{
								marginLeft: 20,
								width: 60,
								height: 60,
								borderRadius: 50,
							}}
						/>
					)}
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

export default PlayerCard;
