import axios from "axios";
export const CREATE_GAME = "CREATE_GAME";
export const GET_USERID = "GET_USERID";
export const UPDATE_USER = "UPDATE_USER";
export const CREATE_NEWS = "CREATE_NEWS";
export const GET_ALL_NEWS = "GET_ALL_NEWS";
export const EDIT_PROFILE = "EDIT_PROFILE";
export const EDIT_GAME = "EDIT_GAME";
export const EDIT_NEWS = "EDIT_NEWS";
export const USER = "USER";
export const LOGIN = "LOGIN";
export const REGISTER = "REGISTER";
export const GET_GAME = "GET_GAME";
export const GET_NEW = "GET_NEW";

export const createGame = (game) => (dispatch) => {
	try {
		return axios
			.post(`https://backend-gamematch.herokuapp.com/Games`, game)
			.then((data) => {
				alert("Juego creado exitosamente");
				return dispatch({ type: CREATE_GAME, payload: game });
			})
			.catch((error) => alert(error.message));
	} catch (error) {
		console.log(error);
	}
};

export const createNews = (news) => {
	// console.log(news);
	return (dispatch) => {
		axios
			.post(`https://backend-gamematch.herokuapp.com/News`, news)
			.then((data) => {
				alert("Noticia creada exitosamente");
				return dispatch({ type: CREATE_NEWS, payload: news });
			})
			.catch((error) => alert(error));
	};
};

export const updateUser = (payload) => {
	return { type: UPDATE_USER, payload };
};

export const getUser = (_id) => (dispatch) => {
	return fetch(`https://backend-gamematch.herokuapp.com/Users/${_id}`)
		.then((response) => response.json())
		.then((json) => {
			const { username, _id, img, email, rol, ban } = json;

			dispatch({ type: GET_USERID, payload: json });
		});
};
export const getGame = (id) => (dispatch) => {
	return fetch(`https://backend-gamematch.herokuapp.com/Games/${id}`)
		.then((response) => {
			return response.json();
		})
		.then((json) => {
			dispatch({ type: GET_GAME, payload: json });
		});
};
export const getNew = (_id) => (dispatch) => {
	return fetch(`https://backend-gamematch.herokuapp.com/News/${_id}`)
		.then((response) => {
			return response.json();
		})
		.then((json) => {
			dispatch({ type: GET_NEW, payload: json });
		});
};
export const getAllNews = () => (dispatch) => {
	return fetch("https://backend-gamematch.herokuapp.com/News")
		.then((response) => {
			return response.json();
		})
		.then((json) => {
			dispatch({ type: GET_ALL_NEWS, payload: json });
		});
};

export const editGame = (game) => {
	let { id } = game;
	return async (dispatch) => {
		await axios.put(`https://backend-gamematch.herokuapp.com/games/${id}`, game);
		return dispatch({ type: EDIT_GAME, payload: game });
	};
};

export const editNews = (news) => {
	try {
		let { _id } = news;
		return async (dispatch) => {
			await axios.put(`https://backend-gamematch.herokuapp.com/News/edit/${_id}`, news);
			return dispatch({ type: EDIT_NEWS, payload: news });
		};
	} catch (e) {
		console.error(e.response.data);
	}
};

export const editProfile = (user) => {
	// console.log({ user });
	return async (dispatch) => {
		let updatedUser = await axios.put(
			`https://backend-gamematch.herokuapp.com/Users/${user._id}`,
			user
		);
		console.log("usuario actualizado", updatedUser);
		return dispatch({ type: EDIT_PROFILE, payload: user });
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
			dispatch({ type: LOGIN, payload: json });
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
			dispatch({ type: REGISTER, payload: json });
		});
};

export const allUser = () => (dispatch) => {
	return fetch(`https://backend-gamematch.herokuapp.com/users`)
		.then((response) => response.json())
		.then((json) => {
			const { username, _id, img, email } = json;

			dispatch({ type: USER, payload: json });
		});
};
