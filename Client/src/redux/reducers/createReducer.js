import { CREATE_GAME } from "../constants";
const initialState = {
  games: null,
};

const createReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_GAME:
      return state;
    default:
      return state;
  }
};

export default createReducer;
