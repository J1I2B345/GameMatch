import {
	CREATE_GAME,
	GET_USERNAME,
	UPDATE_USER,
	GET_GAMES,
	ELO,
	POSITION,
	ORDER,
	SOCKET,
	ADD_ONE_NOTIFICATION,
	REMOVE_ALL_NOTIFICATIONS,
	REMOVE_ONE_NOTIFICATION,
} from "../constants";
import { io } from "socket.io-client";

const initialState = {
	games: false,
	news: [],
	newsInfo: [],
	user: [],
	userProfile: [],
	userNameChat: {},
	aux: [],
	order: "Any",
	position: "All",
	elo: "All",
	socketIo: io("https://backend-gamematch.herokuapp.com/"),
	notifications: [
		{
			socketid: "O5peJn5NuAMyEIWZAAAD",
			_id: "62fd8e33777ddf170518b0a5",
			elo: "Silver",
			game: "League of Legends",
			img: "https://www.pngplay.com/wp-content/uploads/13/Gamer-Aesthetic-PNG-Photo-Image.png",
			position: "Top",
			rating: {
				$numberDecimal: "0",
			},
			username: "kevin1",
		},
	],
};

const createReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case CREATE_GAME:
			return { ...state, games: [...state.games, payload] };

		case "ADD_NEWS":
			return { ...state, news: [payload, ...state.news] };

		case "EDIT_PROFILE":
			return { ...state, userProfile: payload };

		case "GET_ALL_NEWS":
			return {
				...state,
				news: payload,
			};

		case "NEW_INFO":
			return {
				...state,
				newsInfo: payload,
			};

		case GET_USERNAME:
			return { ...state, user: payload, userProfile: payload };

		case UPDATE_USER:
			return { ...state, user: payload };

		case "LOGIN":
			return {
				...state,
				user: payload,
				userProfile: payload,
			};

		case "REGISTER":
			return { ...state };

		case "USER":
			return {
				...state,
				aux: payload,
			};

		case "USER_NAME_CHAT":
			return {
				...state,
				userNameChat: payload,
			};

		case "SET_EMPTY_USER_NAME_CHAT":
			return {
				...state,
				userNameChat: payload,
			};

		case GET_GAMES:
			return {
				...state,
				games: payload,
			};
		case ELO:
			return {
				...state,
				elo: payload,
			};
		case POSITION:
			return {
				...state,
				position: payload,
			};
		case ORDER:
			return {
				...state,
				order: payload,
			};
		case ADD_ONE_NOTIFICATION:
			return {
				...state,
				notifications: [...state.notifications, payload],
			};
		case REMOVE_ALL_NOTIFICATIONS:
			return {
				...state,
				notifications: [],
			};
		case REMOVE_ONE_NOTIFICATION:
			return {
				...state,
				notifications: [
					state.notifications.filter((notification) => notification.username !== payload),
				],
			};
		// case SOCKET:
		// 	return {
		// 		...state,
		// 		socketIo: payload,
		// 	};
		default:
			return state;
	}
};

export default createReducer;
