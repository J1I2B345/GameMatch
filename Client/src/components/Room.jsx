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
import FilterElo from "./Filters/FilterElo";
import FilterPosition from "./Filters/FilterPosition";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Spinner from "../components/Spinner";

import { higherRating, lowerRating, selectPosition, selectElo } from "../utils";

export default function Room() {
	const games = useSelector((state) => state.games.games);
	const [players, setPlayers] = useState([]);
	const [order, setOrder] = useState("any");
	const [position, setPosition] = useState("any");
	const [elo, setElo] = useState("any");
	const user = useSelector((state) => state.games.user);
	const socket = useRef();
	const { id } = useParams();
	let game = games.find((e) => e._id === id);
	let playersOrder;

	function setStateOrder(order) {
		// setOrder(() => {order})
		console.log(order);
	}

	function setStatePosition(position) {
		// setPosition(()=> {position})
		console.log(position);
	}

	function setStateElo(elo) {
		// setElo(() => elo)
		console.log(elo);
	}

	// function orderPlayers(){
	//     if(players.length){
	//     playersOrder = players
	//     if( order && order !== 'any'){
	//         order === 'max-min'?  higherRating(playersOrder) : lowerRating(playersOrder)
	//     }
	//     if(position && position !== 'any' && position!=='--' && position!=='all') selectPosition(playersOrder, position)
	//     if(elo && elo!=='any' && elo!=='--' && elo!=='all')  selectElo(playersOrder, elo)}
	// }

	// useEffect(()=>{
	//     console.log('pre order', players[0])
	//     orderPlayers(playersOrder)
	//     console.log('post order', players[0])
	// },[order, position, elo])

	useEffect(() => {
		console.log("se conectó al io");
		socket.current = io("https://backend-gamematch.herokuapp.com/");
		socket.current.emit("joinRoom", user);
	}, []);

	useEffect(() => {
		socket.current.on("gameUsers", (data) => {
			if (data) {
				let playersList = data.filter((e) => e._id !== user._id);
				setPlayers(playersList);
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
							{players && players.length > 1 && (
								<Players players={playersOrder} />
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
