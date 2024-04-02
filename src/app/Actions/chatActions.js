import {
  FETCH_MYCHAT_REQUEST,
  FETCH_MYCHAT_FAILURE,
  FETCH_MYCHAT_SUCCESS,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_FAILURE,
  SELECTED_CHAT,
} from "../constants/chatConstants";

export const fetchMyChatRequest = () => {
  return {
    type: FETCH_MYCHAT_REQUEST,
  };
};

export const fetchMyChatSuccess = (chats) => {
  return {
    type: FETCH_MYCHAT_SUCCESS,
    payload: chats,
  };
};

export const fetchMyChatFailure = (error) => {
  return {
    type: FETCH_MYCHAT_FAILURE,
    payload: error,
  };
};

export const createChatRequest = () => {
  return {
    type: CREATE_CHAT_REQUEST,
  };
};

export const createChatSuccess = (newChat) => {
  return {
    type: CREATE_CHAT_SUCCESS,
    payload: newChat,
  };
};

export const createChatFailure = (error) => {
  return {
    type: CREATE_CHAT_FAILURE,
    payload: error,
  };
};

export const selectedChat = (chat) => {
  return {
    type: SELECTED_CHAT,
    payload: chat,
  };
};
