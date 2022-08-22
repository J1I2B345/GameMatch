import { View, Text, Image, SafeAreaView, ScrollView } from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { Link } from "react-router-native";
import Nav from "./Nav";
import Game from "./Game";
import Spinner from "./Spinner";
import { updateUser, getGames } from "../redux/actions";

export default function SelectGame() {
	const dispatch = useDispatch();
	const games = useSelector((state) => state.games.games);

	const userGlobal = useSelector((state) => state.games.user);

	useEffect(() => {
		if (!games) {
			dispatch(getGames());
		}
	}, []);

	function onPress(game) {
		let user = {
			username: userGlobal.username,
			_id: userGlobal._id,
			img: userGlobal.img,
			rating: userGlobal.rating,
			game,
		};
		dispatch(updateUser(user));
	}

	return (
		<View>
			{games && games.length >= 1 ? (
				<SafeAreaView
					style={{
						alignItems: "center",
						justifyContent: "center",
						height: "100%",
					}}
				>
					<ScrollView
						style={
							userGlobal?.roles?.map((role) => role.name).includes("Admin")
								? {
										marginBottom: 45,
										width: "100%",
								  }
								: {
										marginBottom: 25,
										width: "100%",
								  }
						}
					>
						<View style={{ alignItems: "center", justifyContent: "center" }}>
							<View
								style={{
									width: "100%",
									alignItems: "center",
								}}
							>
								<Text
									style={{
										marginTop: 5,
										color: "white",
										fontSize: 45,
									}}
								></Text>
								<Text
									style={{
										marginTop: 5,
										color: "white",
										fontSize: 35,
										fontWeight: "bold",
									}}
								>
									⭐ Select your
								</Text>
								<Text
									style={{
										marginTop: -5,
										marginBottom: 5,
										color: "white",
										fontSize: 35,
										fontStyle: "italic",
									}}
								>
									Favourite Game!
								</Text>
								<Text
									style={{
										marginTop: -5,
										marginBottom: 10,
										color: "white",
										fontSize: 25,
										fontWeight: "bold",
									}}
								></Text>
							</View>
							{games &&
								games.length > 0 &&
								games.map((game) => {
									return (
										<Game
											key={game._id}
											id={game._id}
											image={game.image}
											name={game.name}
											gender={game.gender}
											positions={game.position}
											rank={game.elo}
											onPress={onPress}
										/>
									);
								})}
						</View>
					</ScrollView>
					{/* {console.log(userGlobal.roles.map(role => role.name).includes('Admin'))} */}
					{userGlobal?.roles?.map((role) => role.name).includes("Admin") ? (
						<Link
							to="/createGame"
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
								source={require("../../assets/addGame.png")}
								style={{ width: 50, height: 50 }}
							/>
						</Link>
					) : (
						<Text></Text>
					)}
					<StatusBar style="auto" />
				</SafeAreaView>
			) : (
				<Spinner />
			)}
			<Nav />
		</View>
	);
}

{
	/* <Link
  to="/formlol"
  activeOpacity={1}
  underlayColor={''}
  style={{ margin: 5 }}
>
<Image
     source={{ uri: games[0].image }}
     style={{ width: 340, height: 180, borderRadius: 20 }}
/>
</Link>
<Link
to="/formcs"
activeOpacity={1}
underlayColor={''}
style={{ margin: 5 }}
>
<Image
     source={{ uri: games[1].image }}
     style={{ width: 340, height: 180, borderRadius: 20 }}
/>
</Link>
<Link
to="/formrainbow"
 
style={{ margin: 5 }}
>
<Image
     source={{ uri: games[2].image }}
     style={{ width: 340, height: 180, borderRadius: 20 }}
/>
</Link> */
}
