import axios from "axios";
export const CREATE_GAME = "CREATE_GAME";
export const GET_USERNAME = "GET_USERNAME";
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

export const createGame = (game) => {
  console.log(game);
  return async (dispatch) => {
    await axios.post(`https://backend-gamematch.herokuapp.com/Games`, game);
    return dispatch({ type: CREATE_GAME, payload: game });
  };
};

export const createNews = (news) => {
  // console.log(news);
  return async (dispatch) => {
    await axios.post(`https://backend-gamematch.herokuapp.com/News`, news);
    return dispatch({ type: CREATE_NEWS, payload: news });
  };
};

export const updateUser = (payload) => {
  return { type: UPDATE_USER, payload };
};

export const getUser = (username) => (dispatch) => {
  return fetch(
    `https://backend-gamematch.herokuapp.com/Users/username/${username}`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      dispatch({ type: GET_USERNAME, payload: json });
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
export const getNew = (id) => (dispatch) => {
  return fetch(`https://backend-gamematch.herokuapp.com/News/${id}`)
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
  // console.log({ game });
  return async (dispatch) => {
    await axios.put(
      `https://backend-gamematch.herokuapp.com/games/${id}`,
      game
    );
    return dispatch({ type: EDIT_GAME, payload: game });
  };
};

export const editNews = (news) => {
  try {
    let { _id } = news;
    return async (dispatch) => {
      await axios.put(
        `https://backend-gamematch.herokuapp.com/News/edit/${_id}`,
        news
      );
      return dispatch({ type: EDIT_NEWS, payload: news });
    };
  } catch (e) {
    console.error(e.response.data);
  }
};

export const editProfile = (user) => {
  let { id } = user;
  return async (dispatch) => {
    await axios.put(
      `https://backend-gamematch.herokuapp.com/users/${id}`,
      user
    );
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
