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
	darkMood: false,
	userNameChat: {},
	aux: [],
	order: "Any",
	position: "All",
	elo: "All",
	socketIo: io("https://backend-gamematch.herokuapp.com/"),
	notifications: [],
};

const createReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case "DARK_MOOD":
			return { ...state, darkMood: payload };

		case CREATE_GAME:
			return { ...state, games: [...state.games, payload] };

		case "ADD_NEWS":
			return { ...state, news: [payload, ...state.news] };

		case "GET_USER_BY_ID":
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

		case "ALL_USERS":
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
				notifications: state.notifications
					.filter((e) => e._id !== payload._id)
					.concat(payload),
			};
		case REMOVE_ALL_NOTIFICATIONS:
			return {
				...state,
				notifications: [],
			};
		case REMOVE_ONE_NOTIFICATION:
			console.log("remove", payload);
			console.log("notification", state.notifications);
			return {
				...state,
				notifications: state.notifications.filter(
					(notification) => notification._id !== payload
				),
			};
		default:
			return state;
	}
};

export default createReducer;
