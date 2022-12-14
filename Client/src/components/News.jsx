import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	Text,
	View,
	Image,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { getAllNews, sendStateNewsInfo } from "../redux/actions/index.js";
import { Link, useNavigate } from "react-router-native";
import Constants from "expo-constants";
import Nav from "./Nav";
import Spinner from "./Spinner";
// import EditNews from './EditNews.jsx';

const News = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const news = useSelector((state) => state.games.news);
	const user = useSelector((state) => state.games.user);
	const darkMood = useSelector((state) => state.games.darkMood);

	useEffect(() => {
		dispatch(getAllNews());
	}, []);

	function handlePost(news) {
		navigate("/news/add");
	}

	function handleEdit(news) {
		dispatch(sendStateNewsInfo(news));
		navigate("/news/edit");
	}

	const imgDefecto = (
		<Image
			source={require("../../assets/iconMenssage.png")}
			style={{
				width: 30,
				height: 30,
			}}
		/>
	);

	return (
		<View>
			{news.length > 0 ? (
				<View style={styles.container}>
					<View style={styles.portada_container}>
						<Text
							style={{
								marginTop: Constants.statusBarHeight + 10,
								marginBottom: 20,
								width: "80%",
								color: "white",
								textAlign: "center",
								fontSize: 45,
							}}
						>
							📰 N e w s
						</Text>
					</View>

					<View
						style={
							darkMood == false
								? {
										marginBottom: 5,
										height: 2,
										width: "90%",
										backgroundColor: "#98228C",
								  }
								: {
										marginBottom: 5,
										height: 2,
										width: "90%",
										backgroundColor: "#4D0F73",
								  }
						}
					></View>

					<SafeAreaView style={{ width: "100%", marginBottom: 170 }}>
						<ScrollView>
							<View style={{ alignItems: "center" }}>
								{news.map((data) => (
									<View
										key={data._id}
										style={
											darkMood == false
												? styles.card_container
												: {
														...styles.card_container,
														backgroundColor: "#200021",
														borderColor: "#4700A1",
														borderWidth: 2,
												  }
										}
									>
										{data.author.length > 0 && user._id == data.author[0]._id ? (
											<TouchableOpacity
												style={{
													position: "absolute",
													top: 15,
													right: 12,
												}}
												onPress={(e) => handleEdit(data)}
											>
												<Image
													source={require("../../assets/editNews.png")}
													style={{
														width: 17,
														height: 17,
													}}
												/>
											</TouchableOpacity>
										) : (
											<View></View>
										)}
										<View
											style={{
												flexDirection: "row",
											}}
										>
											<View
												style={
													darkMood == false
														? {
																backgroundColor: "#9d0e9c",
																borderRadius: 50,
																padding: 5,
																justifyContent: "center",
																alignItems: "center",
																width: 45,
																height: 45,
														  }
														: {
																backgroundColor: "#4D0F73",
																borderRadius: 50,
																padding: 5,
																justifyContent: "center",
																alignItems: "center",
																width: 45,
																height: 45,
														  }
												}
											>
												{data.author && data.author.length > 0 && data.author[0].img ? (
													<Image
														source={{
															uri: data.author[0].img,
														}}
														style={{
															width: 45,
															height: 45,
															borderRadius: 50,
														}}
													/>
												) : (
													imgDefecto
												)}
											</View>
											<View style={{ marginLeft: 10 }}>
												<Text style={styles.user}>
													{data.author.length > 0
														? data.author[0].username
														: "Developers"}
												</Text>
												<Text style={styles.date}>
													{moment(data.createdAt).format("MMMM d")} at{" "}
													{moment(data.createdAt).format("h:mm A")}
												</Text>
											</View>
										</View>
										<Text style={data.title ? styles.card_title : { display: "none" }}>
											{data.title}
										</Text>
										<Text
											style={
												data.title
													? styles.description
													: {
															...styles.description,
															marginTop: 5,
													  }
											}
										>
											{data.description}
										</Text>
									</View>
								))}
							</View>
						</ScrollView>
					</SafeAreaView>
					<TouchableOpacity
						style={{
							position: "absolute",
							bottom: 80,
							left: 20,
							height: 45,
						}}
						activeOpacity={0.7}
						onPress={() => handlePost()}
					>
						{user?.roles?.map((role) => role.name).includes("Admin") ? (
							<Image
								source={require("../../assets/addGame.png")}
								style={{ width: 50, height: 50 }}
							/>
						) : (
							<Text></Text>
						)}
					</TouchableOpacity>
					<StatusBar style="auto" />
				</View>
			) : (
				<Spinner />
			)}
			<Nav />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: "100%",
		width: "100%",
		alignItems: "center",
	},
	card_container: {
		margin: 10,
		marginBottom: 5,
		padding: 20,
		paddingTop: 10,
		paddingBottom: 10,
		width: "95%",
		borderRadius: 10,
		backgroundColor: "#443ABB",
	},
	user: {
		fontSize: 20,
		color: "#fff",
	},
	date: {
		fontSize: 11,
		color: "#bbb",
	},
	card_title: {
		margin: 3,
		marginLeft: 0,
		fontSize: 18,
		color: "#fff",
	},
	description: {
		marginLeft: 15,
		fontSize: 16,
		color: "#fff",
	},
});

export default News;
