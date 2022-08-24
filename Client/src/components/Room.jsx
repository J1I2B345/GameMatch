import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ScrollView, Alert } from "react-native";
import { Link, useParams } from "react-router-native";
import Constants from "expo-constants";
import Nav from "./Nav";
import Players from "./Players.jsx";
import OrderRating from "./Filters/OrderRating";
import FilterElo from "./Filters/FilterElo";
import FilterPosition from "./Filters/FilterPosition";
import { useSelector } from "react-redux";
import { connect, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { higherRating, lowerRating, selectPosition, selectElo } from "../utils/utils";
import Spinner from "../components/Spinner";
// import { orderByElo, orderByPosition, orderByRating } from "../redux/actions";
import axios from "axios";

export default function Room() {
	const games = useSelector((state) => state.games.games);
	const [players, setPlayers] = useState([]);
	const [playersInOrder, setPlayersInOrder] = useState([]);
	const user = useSelector((state) => state.games.user);
	const premium = useSelector((state) => state.games.userProfile.premium);
	const elo = useSelector((state) => state.games.elo);
	const position = useSelector((state) => state.games.position);
	const order = useSelector((state) => state.games.order);
	const socket = useSelector((state) => state.games.socketIo);
	const { id } = useParams();
	let game = games.find((e) => e._id === id);

	function sendInvitation(socketid) {
		// check if matchs available
		axios
			.get(`https://backend-gamematch.herokuapp.com/users/${user._id}`)
			.then((data) => {
				if (data.data.matchs > 0) {
					let invitation = { to: socketid, user };
					socket.emit("client: invitation", invitation);
					let newMatchs = { matchs: data.data.matchs - 1 };
					axios
						.put(`https://backend-gamematch.herokuapp.com/users/${user._id}`, newMatchs)
						.catch((err) => Alert.alert(err.message));
				} else throw new Error("No more matchs today");
			})
			.catch((err) => Alert.alert(err.message));
	}

	useEffect(() => {
		if (players.length) {
			let playersOrder = players;
			if (order.toLowerCase() === "max-min") {
				playersOrder = higherRating(playersOrder);
			}
			if (order.toLowerCase() === "min-max") {
				playersOrder = lowerRating(playersOrder);
			}
			if (
				position &&
				position.toLowerCase() !== "any" &&
				position.toLowerCase() !== "--" &&
				position.toLowerCase() !== "all"
			) {
				playersOrder = selectPosition(playersOrder, position);
			}
			if (
				elo &&
				elo.toLowerCase() !== "any" &&
				elo !== "--" &&
				elo.toLowerCase() !== "all"
			) {
				playersOrder = selectElo(playersOrder, elo);
			}
			setPlayersInOrder(playersOrder);
		}
	}, [elo, order, position, players]);

	useEffect(() => {
		socket.emit("getGameUsers", user);
		console.log("estoy emitiendo getGameUsers");
	}, []);

	useEffect(() => {
		socket.on("gameUsers", (data) => {
			console.log("recibí gameUsers", data);
			if (data) {
				let playersList = data.filter((e) => e._id !== user._id);
				setPlayers(playersList);

				let playersOrder = playersList;
				if (order.toLowerCase() === "max-min") {
					playersOrder = higherRating(playersOrder);
				}
				if (order.toLowerCase() === "min-max") {
					playersOrder = lowerRating(playersOrder);
				}
				if (
					position &&
					position.toLowerCase() !== "any" &&
					position.toLowerCase() !== "--" &&
					position.toLowerCase() !== "all"
				) {
					playersOrder = selectPosition(playersOrder, position);
				}
				if (
					elo &&
					elo.toLowerCase() !== "any" &&
					elo !== "--" &&
					elo.toLowerCase() !== "all"
				) {
					playersOrder = selectElo(playersOrder, elo);
				}
				setPlayersInOrder(playersOrder);
			}
		});
	}, [socket, players]);

	return (
		<View style={styles.container}>
			{game.name ? (
				<View style={{ height: "93%", alignItems: "center" }}>
					<Text
						style={{
							marginTop: Constants.statusBarHeight + 10,
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
							alignItems: "center",
						}}
					></View>
					<ScrollView>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "center",
							}}
						>
							<OrderRating />
							{game.position.length > 1 && <FilterPosition position={game.position} />}
						</View>

						{game.elo && (
							<View
								style={{
									flexDirection: "row",
									justifyContent: "center",
								}}
							>
								{game.elo && <FilterElo elo={game.elo} />}
							</View>
						)}
						{/* componente presentacional 
                    
                           ||
                           \/
                           \/ 
                    	*/}
						{/* { players && <Players players={players} />} */}
						{players.length ? (
							playersInOrder.length > 0 ? (
								<Players players={playersInOrder} sendInvitation={sendInvitation} />
							) : (
								<Text
									style={{
										marginTop: 5,
										color: "white",
										fontSize: 35,
										fontWeight: "bold",
									}}
								>
									No players with those characteristics
								</Text>
							)
						) : (
							<Text
								style={{
									marginTop: 5,
									color: "white",
									fontSize: 35,
									fontWeight: "bold",
								}}
							>
								Waiting for players..
							</Text>
						)}
					</ScrollView>
				</View>
			) : (
				<Spinner />
			)}
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
			<Nav />
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: "100%",
		alignItems: "center",
	},
});
