import { Link } from "react-router-native";
import { StyleSheet, View, Image } from "react-native";
import { useSelector } from "react-redux";

const Nav = () => {
	const darkMood = useSelector((state) => state.games.darkMood);

	return (
		<View
			style={
				darkMood == false
					? styles.container
					: { ...styles.container, backgroundColor: "#4D0F73" }
			}
		>
			<View style={styles.icon_container}>
				<Link to="/selectchat" underlayColor={"#9A01E2"} style={styles.icon}>
					<Image
						source={require("../../assets/iconMenssage.png")}
						style={{ marginTop: 1, width: 28.5, height: 28.5 }}
					/>
				</Link>
				<Link to="/selectgame" underlayColor={"#9A01E2"} style={styles.icon}>
					<Image
						source={require("../../assets/iconHomeGames.png")}
						style={{ width: 30, height: 30 }}
					/>
				</Link>
				<Link to="/invitations" underlayColor={"#9A01E2"} style={styles.icon}>
					<Image
						source={require("../../assets/iconNotification.png")}
						style={{ width: 30, height: 30 }}
					/>
				</Link>
				<Link to="/news" underlayColor={"#9A01E2"} style={styles.icon}>
					<Image
						source={require("../../assets/iconForo.png")}
						style={{ marginTop: 2, width: 26, height: 26 }}
					/>
				</Link>
				<Link to="/profile" underlayColor={"#9A01E2"} style={styles.icon}>
					<Image
						source={require("../../assets/iconProfile.png")}
						style={{ marginTop: 2, width: 27, height: 27 }}
					/>
				</Link>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 0,
		height: 45,
		width: "100%",
		alignItems: "center",
		backgroundColor: "#5B146C",
	},

	icon_container: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 7,
	},

	icon: {
		marginRight: "4.2%",
		marginLeft: "4.2%",
		width: 40,
		height: 32,
		borderRadius: 50,
		alignItems: "center",
	},
});

export default Nav;
