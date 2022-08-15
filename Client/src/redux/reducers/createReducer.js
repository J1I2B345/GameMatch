import {
	CREATE_GAME,
	GET_USERNAME,
	UPDATE_USER,
	GET_GAMES,
	ELO,
	POSITION,
	ORDER,
} from "../constants";

const initialState = {
	games: false,
	news: [],
	user: [],
	userProfile: [],
	aux: [],
	order: "any",
	position: "all",
	elo: "all",
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

		default:
			return state;
	}
};

export default createReducer;
