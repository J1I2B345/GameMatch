import {
	CREATE_GAME,
	GET_USERID,
	UPDATE_USER,
	CREATE_NEWS,
	GET_ALL_NEWS,
	EDIT_PROFILE,
	LOGIN,
	REGISTER,
	USER,
	GET_GAME,
	GET_NEW,
	EDIT_NEWS,
} from "../actions";

const initialState = {
	games: [],

	user: null,
	userSelect: [],
	news: [],
	userProfile: null,
	aux: null,
	gameSelect: null,
	newSelect: null,
};

const rootReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case CREATE_GAME:
			return { ...state, games: [...state.games, payload] };
		case GET_USERID:
			return { ...state, userSelect: action.payload };
		case GET_GAME:
			return { ...state, gameSelect: action.payload };
		case GET_NEW:
			return { ...state, newSelect: action.payload };

		case UPDATE_USER:
			return { ...state, user: payload };
		case CREATE_NEWS:
			return { ...state, news: [...state.news, payload] };
		case GET_ALL_NEWS:
			return {
				...state,
				news: [...action.payload],
			};

		case EDIT_PROFILE:
			return { ...state, aux: payload };
		case LOGIN:
			return {
				...state,
				user: payload,
				userProfile: payload,
			};
		case REGISTER:
			return { ...state };
		case USER:
			return {
				...state,
				aux: payload,
			};
		case EDIT_NEWS:
			return { ...state, news: payload };

		default:
			return state;
	}
};
export default rootReducer;
