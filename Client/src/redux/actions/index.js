import {
	CREATE_GAME,
	GET_USERNAME,
	UPDATE_USER,
	GET_GAMES,
} from "../constants";
import axios from "axios";

export const createGame = (game) => (dispatch) => {
	return fetch("https://backend-gamematch.herokuapp.com/games", {
		method: "POST",
		headers: { Accept: "applcation/json", "Content-Type": "application/json" },
		body: JSON.stringify(game),
	})
		.then((response) => {
			return response.json();
		})
		.then((json) => {
			dispatch({ type: CREATE_GAME, payload: json });
		});
};

export const editProfile = (user) => {
	return async (dispatch) => {
		await axios.put(
			`https://backend-gamematch.herokuapp.com/users/${user._id}`,
			user
		);
		return dispatch({ type: "EDIT_PROFILE", payload: user });
	};
};

export const updateUser = (payload) => {
	return { type: UPDATE_USER, payload };
};

export const getAllNews = () => {
	return async (dispatch) => {
		try {
			let json = await axios.get(
				`https://backend-gamematch.herokuapp.com/News`
			);
			return dispatch({
				type: "GET_ALL_NEWS",
				payload: json.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
};

export const addNews = (news) => {
	return async () => {
		return await axios.post(
			`https://backend-gamematch.herokuapp.com/News`,
			news
		);
	};
};

export const deleteNews = (idNew) => {
	return async () => {
		return await axios.delete(
			`https://backend-gamematch.herokuapp.com/news/delete/${idNew}`
		);
	};
};

export const login = (data) => (dispatch) => {
	return fetch("https://backend-gamematch.herokuapp.com/users/login", {
		method: "POST",
		headers: { Accept: "applcation/json", "Content-Type": "application/json" },
		body: JSON.stringify(data),
	})
		.then((response) => {
			return response.json();
		})
		.then((json) => {
			dispatch({ type: "LOGIN", payload: json });
		});
};
export const register = (data) => (dispatch) => {
	return fetch("https://backend-gamematch.herokuapp.com/users/login", {
		method: "POST",
		headers: { Accept: "applcation/json", "Content-Type": "application/json" },
		body: JSON.stringify(data),
	})
		.then((response) => {
			return response.json();
		})
		.then((json) => {
			dispatch({ type: "REGISTER", payload: json });
		});
};
export const allUser = () => (dispatch) => {
	return fetch(`https://backend-gamematch.herokuapp.com/users`)
		.then((response) => response.json())
		.then((json) => {
			const { username, _id, img, email } = json;

			dispatch({ type: "USER", payload: json });
		});
};

export const getGames = () => (dispatch) => {
	return axios
		.get(`https://backend-gamematch.herokuapp.com/games`)
		.then((info) =>
			dispatch({
				type: GET_GAMES,
				payload: info.data,
			})
		)
		.catch((error) => console.log(error.message));
};
