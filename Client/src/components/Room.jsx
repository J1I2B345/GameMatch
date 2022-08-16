import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from "react-native";
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
import { io } from "socket.io-client";
import { higherRating, lowerRating, selectPosition, selectElo } from "../utils/utils";
import Spinner from "../components/Spinner";
import { orderByElo, orderByPosition, orderByRating } from "../redux/actions";

export default function Room() {
	const games = useSelector((state) => state.games.games);
	const [players, setPlayers] = useState([]);
	const [playersInOrder, setPlayersInOrder] = useState([]);
	const user = useSelector((state) => state.games.user);
	const elo = useSelector((state) => state.games.elo);
	const position = useSelector((state) => state.games.position);
	const order = useSelector((state) => state.games.order);
	const socket = useRef();
	const { id } = useParams();
	let game = games.find((e) => e._id === id);
	const dispatch = useDispatch();

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
		socket.current = io("https://backend-gamematch.herokuapp.com/");
		socket.current.emit("joinRoom", user);
		return () => {
			socket.current.off("gameUsers");
			socket.current.emit("leaveRoom", user);
			console.log("se desmontó el componente en el socket.on gameusers");
			dispatch(orderByRating("Any"));
			dispatch(orderByElo("All"));
			dispatch(orderByPosition("All"));
		};
	}, []);

	useEffect(() => {
		socket.current.on("gameUsers", (data) => {
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
	}, [socket.current, players]);

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
								<Players players={playersInOrder} />
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
