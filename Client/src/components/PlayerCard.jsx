import React from "react";
import { View, Image, Text } from "react-native";
import { Link } from "react-router-native";

const PlayerCard = ({ id, img, name, elo, position, rating }) => {
	return (
		<View key={id} style={{ margin: 5 }}>
			<Link to="" activeOpacity={1} underlayColor={""}>
				<View
					style={{
						width: 340,
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
			</Link>
		</View>
	);
};

export default PlayerCard;
