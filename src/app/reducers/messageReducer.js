import {
  FETCH_MESSAGE_REQUEST,
  FETCH_MESSAGE_SUCCESS,
  FETCH_MESSAGE_FAILURE,
} from "../constants/messageConstants";

const initialState = {
  loading: false,
  messageHistory: [],
  error: null,
};

export const messageReducer = (state = initialState, action) => {


  switch (action.type) {
    case FETCH_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        messageHistory: action.payload,
        error: null,
      };

    case FETCH_MESSAGE_FAILURE:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };

    default:
      return state;
  }
};
