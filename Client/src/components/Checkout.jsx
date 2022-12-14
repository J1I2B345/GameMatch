import { WebView } from "react-native-webview";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, View, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import axios from "axios";
import { editProfile } from "../redux/actions";

const Checkout = () => {
	const redirect = useNavigate();
	const dispatch = useDispatch();
	const [url, setUrl] = useState(null);
	const User = useSelector((state) => state.games.userProfile);

	const initialValues = {
		_id: User._id,
		premium: true,
		matchs: 200,
	};
	const comprador = { email: User.email };
	const urlpago = "https://backend-gamematch.herokuapp.com/pago";

	useEffect(() => {
		function sendServer() {
			axios
				.post(urlpago, comprador)
				.then((res) => {
					console.log(res.data.init_point);
					setUrl(res.data.init_point);
				})
				.catch((e) => console.log(e));
		}
		sendServer();
	}, []);

	//Mudança de estado de navegação
	async function stateChange(state) {
		let url = state.url;
		if (state.canGoBack == true && !url.includes("mercadopago")) {
			if (url.includes("approved")) {
				dispatch(editProfile(initialValues));
				redirect("/profile");
			} else {
				redirect("/profile");
			}
		}
		if (url.includes("failure")) {
			redirect("/profile");
		}
	}

	return (
		<View style={styles.container}>
			{url && (
				<WebView
					style={{
						width: 400,
					}}
					originWhitelist={["*"]}
					source={{ uri: url }}
					startInLoadingState={true}
					onNavigationStateChange={(state) => stateChange(state)}
				/>
			)}
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		height: "100%",
		width: "100%",
		alignItems: "center",
	},
	tittle: {
		fontSize: 40,
		color: "#fff",
	},
	container2: {
		flex: 1,
		height: 1000,
		width: 400,
	},
	text: {
		fontSize: 20,
		color: "#fff",
		marginTop: 50,
	},
	button: {
		fontSize: 20,
		color: "#fff",
		marginTop: 50,
	},
});

export default Checkout;
