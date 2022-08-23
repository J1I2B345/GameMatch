import { Routes, Route } from "react-router-native";
import { View, Alert } from "react-native";
import Login from "./Login.jsx";
import SelectGame from "./SelectGame.jsx";
import Room from "./Room.jsx";
import Form from "./Form.jsx";
import Chat from "./Chat.jsx";
import ChatProfile from "./ChatProfile.jsx";
import CreateGame from "./CreateGame.jsx";
import Profile from "./Profile.jsx";
import WhyPremium from "./WhyPremium.jsx";
import News from "./News.jsx";
import CreateNews from "./CreateNews.jsx";
import EditNews from "./EditNews.jsx";
import SelectChat from "./SelectChat.jsx";
import EditProfile from "./EditProfile.jsx";
import Register from "./Register.jsx";
import Checkout from "./Checkout.jsx";
import InvitationsRoom from "./InvitationsRoom.jsx";
import Report from "./Report.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addOneNotificacion } from "../redux/actions/index.js";

const Home = () => {
	const socketIo = useSelector((state) => state.games.socketIo);
	const dispatch = useDispatch();

	useEffect(() => {
		if (socketIo) {
			socketIo.on("server: invitation", (invitationUser) => {
				dispatch(addOneNotificacion(invitationUser));
				// setNotifications(invitationUser);
				Alert.alert("te llegó una notificación tilinn");
			});
			socketIo.on("server: invitationAccepted", (userThatAccepted) => {
				console.log("invitación aceptada", userThatAccepted);
			});
		}
	}, []);
	return (
		<View>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route exact path="/selectgame" element={<SelectGame />} />
				<Route path="form/:id" element={<Form />} />
				<Route path="/createGame" element={<CreateGame />} />
				<Route path="/room/:id" element={<Room />} />
				<Route path="selectchat" element={<SelectChat />} />
				<Route path="/chat/:id" element={<Chat />} />
				<Route path="/chat/profile" element={<ChatProfile />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/profile/edit" element={<EditProfile />} />
				<Route path="/whypremium" element={<WhyPremium />} />
				<Route path="/news" element={<News />} />
				<Route path="/news/add" element={<CreateNews />} />
				<Route path="/news/edit" element={<EditNews />} />
				<Route path="/checkout" element={<Checkout />} />
				<Route path="/register" element={<Register />} />
				<Route path="/invitations" element={<InvitationsRoom />} />
				<Route path="/report" element={<Report />} />
			</Routes>
		</View>
	);
};

export default Home;
