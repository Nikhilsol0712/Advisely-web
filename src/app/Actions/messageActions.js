import {
  FETCH_MESSAGE_REQUEST,
  FETCH_MESSAGE_SUCCESS,
  FETCH_MESSAGE_FAILURE,
} from "../constants/messageConstants";

export const fetchMessageRequest = () => {
  return {
    type: FETCH_MESSAGE_REQUEST,
  };
};

export const fetchMessageSuccess = (messages) => {
  return {
    type: FETCH_MESSAGE_SUCCESS,
    payload: messages,
  };
};

export const fetchMessageFailure = (error) => {
  return {
    type: FETCH_MESSAGE_FAILURE,
    payload: error,
  };
};
