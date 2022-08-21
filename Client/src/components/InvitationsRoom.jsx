import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";
import Constants from "expo-constants";
import { Link } from "react-router-native";
import { useSelector } from "react-redux";

export default function InvitationsRoom() {
	const userGlobal = useSelector((state) => state.games.user);
	let game = userGlobal.game;
	let games = useSelector((state) => state.games.games);
	let userGame = games.find((element) => element.name === game);
	let id = userGame._id;
	console.log(userGlobal);

	return (
		<View style={{ height: "100%" }}>
			<StatusBar style="auto" />
			<Text style={{ marginTop: Constants.statusBarHeight }}>soy invitations</Text>
			<Link
				to={`/room/${id}`}
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
