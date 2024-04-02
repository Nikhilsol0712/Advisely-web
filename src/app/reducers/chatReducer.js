import {
  FETCH_MYCHAT_REQUEST,
  FETCH_MYCHAT_FAILURE,
  FETCH_MYCHAT_SUCCESS,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_FAILURE,
  SELECTED_CHAT,
} from "../constants/chatConstants";

const initialState = {
  loading: false,
  chats: [],
  newChat: {},
  selectedChat: {},
  error: null,
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MYCHAT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_MYCHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        chats: action.payload,
        error: null,
      };

    case FETCH_MYCHAT_FAILURE:
      return {
        ...state,
        loading: false,
        chats: [],
        error: action.payload,
      };

    case CREATE_CHAT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        newChat: action.payload,
        error: null,
      };

    case CREATE_CHAT_FAILURE:
      return {
        ...state,
        loading: false,
        newChat: {},
        error: action.payload,
      };

    case SELECTED_CHAT:
      return {
        ...state,
        selectedChat: action.payload,
      };
    default:
      return state;
  }
};
