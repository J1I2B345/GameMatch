import {
	CREATE_GAME,
	GET_USERNAME,
	UPDATE_USER,
	GET_GAMES,
	ELO,
	POSITION,
	ORDER,
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
			if (!json.error) {
				alert("game created!"), dispatch({ type: CREATE_GAME, payload: json });
			} else alert(json.error);
		});
};

export const editProfile = (user) => {
	return async (dispatch) => {
		await axios.put(`https://backend-gamematch.herokuapp.com/users/${user._id}`, user);
		return dispatch({ type: "EDIT_PROFILE", payload: user });
	};
};

export const getUser = (username) => (dispatch) => {
	return fetch(`https://backend-gamematch.herokuapp.com/users/username/${username}`)
		.then((response) => response.json())
		.then((json) => {
			const {
				username,
				rating,
				_id,
				img,
				email,
				premium,
				chats,
				description,
				socialNetworks,
				rol,
			} = json;
			let user = {
				username,
				rating,
				_id,
				img,
				email,
				premium,
				chats,
				description,
				socialNetworks,
				rol,
			};
			dispatch({ type: GET_USERNAME, payload: user });
		});
};

export const getNameUserChat = (idUser) => (dispatch) => {
	return fetch(`https://backend-gamematch.herokuapp.com/users/${idUser}`)
		.then((response) => response.json())
		.then((json) => {
			const { username } = json;
			let userName = username;
			dispatch({ type: "USER_NAME_CHAT", payload: userName });
		});
};

export const updateUser = (payload) => {
	return { type: UPDATE_USER, payload };
};

export const getAllNews = () => {
	return async (dispatch) => {
		try {
			let json = await axios.get(`https://backend-gamematch.herokuapp.com/News`);
			return dispatch({
				type: "GET_ALL_NEWS",
				payload: json.data,
			});
		} catch (error) {
			alter(error.message);
		}
	};
};

export const sendStateNewsInfo = (newsInfo) => {
	return async (dispatch) => {
		return dispatch({ type: "NEW_INFO", payload: newsInfo });
	};
};

export const addNews = (news) => {
	// return async () => {
	// 	return await axios.post(`https://backend-gamematch.herokuapp.com/news`, news);
	// };
	return async () => {
		let response = await axios.post(`https://backend-gamematch.herokuapp.com/news`, news);
		if (response.data.error) alert("error: ", response.data.error);
		else {
			alert("Noticia creada exitosamente");
			return response.data;
		}
	};
};

export const editNews = (news) => {
	return async () => {
		return await axios.put(
			`https://backend-gamematch.herokuapp.com/news/edit/${news._id}`,
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

export const orderByRating = (payload) => {
	return {
		type: ORDER,
		payload,
	};
};

export const orderByElo = (payload) => {
	return {
		type: ELO,
		payload,
	};
};

export const orderByPosition = (payload) => {
	return {
		type: POSITION,
		payload,
	};
};
