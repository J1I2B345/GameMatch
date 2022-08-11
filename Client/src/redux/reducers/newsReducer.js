import { GET_ALL_NEWS } from "../constants";
const initialState = {
  news: null,
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_NEWS:
      return {
        ...state,
        news: [...action.payload],
      };
    default:
      return state;
  }
};

export default newsReducer;
