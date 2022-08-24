import { Picker } from "@react-native-picker/picker";
import { useEffect, useState, useRef } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link, useParams } from "react-router-native";
import { useSelector, useDispatch } from "react-redux";
import {
	removeAllNotifications,
	updateUser,
	orderByElo,
	orderByPosition,
	orderByRating,
} from "../redux/actions";
import Constants from "expo-constants";
import Spinner from "./Spinner";
import Nav from "./Nav";

export default function Form() {
	let [game, setGame] = useState({ position: false });
	let [playerRank, setPlayerRank] = useState("--");
	let [playerPosition, setPlayerPosition] = useState("any");
	let { id } = useParams();
	let dispatch = useDispatch();
	let user = useSelector((state) => state.games.user);
	const games = useSelector((state) => state.games.games);
	const socket = useSelector((state) => state.games.socketIo);

	const fetchGame = () => {
		let respuesta = games.find((e) => e._id === id);
		setGame(respuesta);
	};

	useEffect(() => {
		if (!game.name) {
			fetchGame();
		}
	}, []);

	function handleClickPosition(valor) {
		setPlayerPosition(valor);
	}

	function handleClickRank(valor) {
		setPlayerRank(valor);
	}

	function handleSubmit() {
		dispatch(removeAllNotifications());
		socket.emit("leaveRoom", user);
		socket.emit("client: erasePreviousNotifications", user._id);
		playerRank ? (user = { ...user, elo: playerRank }) : "";
		playerPosition ? (user = { ...user, position: playerPosition }) : "";
		socket.emit("joinRoom", user);
		dispatch(orderByRating("Any"));
		dispatch(orderByElo("All"));
		dispatch(orderByPosition("All"));
		dispatch(updateUser(user));
	}

	return (
		<View>
			{game.name ? (
				<View
					style={{
						height: "100%",
						alignItems: "center",
					}}
				>
					<Text
						style={{
							marginTop: Constants.statusBarHeight + 30,
							marginBottom: 10,
							width: "80%",
							color: "white",
							textAlign: "center",
							fontSize: 45,
						}}
					>
						{game.name}
					</Text>
					<View
						style={{
							marginBottom: 20,
							height: 2,
							width: "90%",
							backgroundColor: "#98228C",
						}}
					></View>
					<View
						style={{
							marginTop: "10%",
							height: "40%",
							width: "100%",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<View>
							<Text style={{ fontSize: 30, color: "white", marginBottom: 10 }}>
								⭐ Choose Your Rank
							</Text>
							<Picker
								selectedValue={playerRank}
								onValueChange={(value) => handleClickRank(value)}
								style={{
									width: 300,
									backgroundColor: "white",
									marginBottom: 10,
								}}
							>
								<Picker.Item label={"--"} value={"--"}></Picker.Item>
								{game && game.elo ? (
									game.elo.map((rank) => {
										return <Picker.Item key={rank} label={rank} value={rank} />;
									})
								) : (
									<></>
								)}
							</Picker>
						</View>

						{game.position.length !== 0 ? (
							<View style={{ alignItems: "center" }}>
								<Text
									style={{
										marginTop: 50,
										fontSize: 30,
										color: "white",
										marginBottom: 10,
									}}
								>
									🕹️ Choose your position
								</Text>
								<Picker
									selectedValue={playerPosition}
									onValueChange={(value) => handleClickPosition(value)}
									style={{
										backgroundColor: "white",
										width: 300,
									}}
								>
									<Picker.Item label={"any"} value={"any"}></Picker.Item>
									{game && game.position ? (
										game.position.map((position) => {
											return (
												<Picker.Item key={position} label={position} value={position} />
											);
										})
									) : (
										<></>
									)}
								</Picker>
							</View>
						) : (
							<></>
						)}
						{playerRank !== "--" ? (
							<TouchableOpacity style={{ alignItems: "center" }}>
								<Link
									to={`/room/${id}`}
									underlayColor={"#702575"}
									onPress={handleSubmit}
									style={{
										margin: "auto",
										marginTop: 60,
										height: 40,
										width: 80,
										alignItems: "center",
										borderRadius: 10,
										border: "none",
										backgroundColor: "#98228C",
									}}
								>
									<Text
										style={{
											marginTop: 6,
											fontSize: 20,
											width: "100%",
											textAlign: "center",
											color: "white",
										}}
									>
										Start
									</Text>
								</Link>
							</TouchableOpacity>
						) : (
							<></>
						)}
					</View>

					<Link
						to="/selectgame"
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
					<StatusBar style="auto" />
					<Nav />
				</View>
			) : (
				<Spinner />
			)}
		</View>
	);
}
