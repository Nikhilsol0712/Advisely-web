import {
  FETCH_SESSION_REQUEST,
  FETCH_SESSION_SUCCESS,
  FETCH_SESSION_FAILURE,
  CREATE_SESSION_REQUEST,
  CREATE_SESSION_SUCCESS,
  CREATE_SESSION_FAILURE,
  UPDATE_SESSION_REQUEST,
  UPDATE_SESSION_SUCCESS,
  UPDATE_SESSION_FAILURE,
  FETCH_SESSIONBY_ID_REQUEST,
  FETCH_SESSIONBY_ID_SUCCESS,
  FETCH_SESSIONBY_ID_FAILURE,
  SET_SESSION_FORMDATA,
} from "../constants/sessionConstants";

export const fetchSessionRequest = () => {
  return {
    type: FETCH_SESSION_REQUEST,
  };
};

export const fetchSessionSuccess = (sessions) => {
  return {
    type: FETCH_SESSION_SUCCESS,
    payload: sessions,
  };
};

export const fetchSessionFailure = (error) => {
  return {
    type: FETCH_SESSION_FAILURE,
    payload: error,
  };
};

export const createSessionRequest = () => {
  return {
    type: CREATE_SESSION_REQUEST,
  };
};

export const createSessionSuccess = (sessionData) => {
  return {
    type: CREATE_SESSION_SUCCESS,
    payload: sessionData,
  };
};

export const createSessionFailure = (error) => {
  return {
    type: CREATE_SESSION_FAILURE,
    payload: error,
  };
};

export const updateSessionRequest = () => ({
  type: UPDATE_SESSION_REQUEST,
});

export const updateSessionSuccess = (updatedSession) => ({
  type: UPDATE_SESSION_SUCCESS,
  payload: updatedSession,
});

export const updateSessionFailure = (error) => ({
  type: UPDATE_SESSION_FAILURE,
  payload: error,
});

export const fetchSessionByIdRequest = () => {
  return {
    type: FETCH_SESSIONBY_ID_REQUEST,
  };
};

export const fetchSessionByIdSuccess = (sessionData) => {
  return {
    type: FETCH_SESSIONBY_ID_SUCCESS,
    payload: sessionData,
  };
};

export const fetchSessionByIdFailure = (error) => {
  return {
    type: FETCH_SESSIONBY_ID_FAILURE,
    payload: error,
  };
};

export const setSessionFormData = (formData) => {
  return {
    type: SET_SESSION_FORMDATA,
    payload: formData,
  };
};
