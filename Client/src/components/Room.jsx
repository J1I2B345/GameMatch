import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	Text,
	View,
	Image,
	SafeAreaView,
	ScrollView,
} from "react-native";
import { Link, useParams } from "react-router-native";
import Constants from "expo-constants";
import Nav from "./Nav";
import Players from "./Players.jsx";
import OrderRating from "./Filters/OrderRating";
//filtros deberían ser para todos igual. pasar por props lo que tiene que presentar en el select
//y una función para ir sumando al array de filtrado
import FilterElo from "./Filters/FilterElo";
import FilterPosition from "./Filters/FilterPosition";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import {
	higherRating,
	lowerRating,
	selectPosition,
	selectElo,
} from "../utils/utils";
import { updateUser } from "../redux/actions";
import Spinner from "../components/Spinner";

export default function Room() {
	// const playersGlobal = useSelector((state) => state.games.playersLoL);
	const games = useSelector((state) => state.games.games);
	const [players, setPlayers] = useState([]);
	const [playersInOrder, setPlayersInOrder] = useState([]);
	const [filters, setFilters] = useState({
		order: "any",
		position: "all",
		elo: "all",
	});
	const user = useSelector((state) => state.games.user);
	const socket = useRef();
	const { id } = useParams();
	let game = games.find((e) => e._id === id);

	console.log("players", players, "playersInOrder", playersInOrder);

	function setStateOrder(order) {
		setFilters(() => {
			return { ...filters, order: order.toLowerCase() };
		});
	}

	function setStatePosition(position) {
		setFilters(() => {
			return { ...filters, position: position.toLowerCase() };
		});
	}

	function setStateElo(elo) {
		setFilters(() => {
			return { ...filters, elo: elo.toLowerCase() };
		});
	}

	useEffect(() => {
		if (players.length) {
			let playersOrder = players;
			if (filters.order === "max-min") {
				playersOrder = higherRating(playersOrder);
			}
			if (filters.order === "min-max") {
				playersOrder = lowerRating(playersOrder);
			}
			if (
				filters.position &&
				filters.position !== "any" &&
				filters.position !== "--" &&
				filters.position !== "all"
			) {
				playersOrder = selectPosition(playersOrder, filters.position);
			}
			if (
				filters.elo &&
				filters.elo !== "any" &&
				filters.elo !== "--" &&
				filters.elo !== "all"
			) {
				playersOrder = selectElo(playersOrder, filters.elo);
			}
			setPlayersInOrder(playersOrder);
		}
	}, [filters]);

	useEffect(() => {
		console.log("se conectó al io");
		socket.current = io("https://backend-gamematch.herokuapp.com/");
		socket.current.emit("joinRoom", user);
		//agregado para el user global con socketid
		socket.current.on("socketid", (socketid) => {
			dispatch(updateUser({ ...user, socketid }));
		});

		//agregado para el user global con socketid
		return () => {
			socket.current.off("socketid");
		};
	}, []);

	useEffect(() => {
		socket.current.on("gameUsers", (data) => {
			if (data) {
				let playersList = data.filter((e) => e._id !== user._id);
				setPlayers(playersList);

				let playersOrder = data;
				if (filters.order === "max-min") {
					// let playersOrder1 = higherRating(playersOrder);
					// playersOrder = playersOrder1;
					higherRating(playersOrder);
				}
				if (filters.order === "min-max") {
					// let playersOrder2 = lowerRating(playersOrder);
					// playersOrder = playersOrder2;
					lowerRating(playersOrder);
				}
				if (
					filters.position &&
					filters.position !== "any" &&
					filters.position !== "--" &&
					filters.position !== "all"
				) {
					playersOrder = selectPosition(playersOrder, filters.position);
				}
				if (
					filters.elo &&
					filters.elo !== "any" &&
					filters.elo !== "--" &&
					filters.elo !== "all"
				) {
					playersOrder = selectElo(playersOrder, filters.elo);
				}
				setPlayersInOrder(playersOrder);
			}
		});
		return () => {
			socket.current.off("gameUsers");
		};
	}, [socket.current, players]);

	return (
		<View style={styles.container}>
			{game.name ? (
				<View>
					<Text
						style={{
							marginTop: Constants.statusBarHeight + 10,
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
					<SafeAreaView style={{ marginBottom: 225 }}>
						<ScrollView>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "center",
								}}
							>
								<OrderRating handleOrder={setStateOrder} />
								{game.position.length > 1 && (
									<FilterPosition
										position={game.position}
										handlePosition={setStatePosition}
									/>
								)}
							</View>

							{game.elo && (
								<View
									style={{
										flexDirection: "row",
										justifyContent: "center",
									}}
								>
									{game.elo && (
										<FilterElo elo={game.elo} handleElo={setStateElo} />
									)}
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
					</SafeAreaView>
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
