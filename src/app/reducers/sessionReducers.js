import {
  FETCH_SESSION_REQUEST,
  FETCH_SESSION_SUCCESS,
  FETCH_SESSION_FAILURE,
  UPDATE_SESSION_REQUEST,
  UPDATE_SESSION_SUCCESS,
  UPDATE_SESSION_FAILURE,
  CREATE_SESSION_REQUEST,
  CREATE_SESSION_SUCCESS,
  CREATE_SESSION_FAILURE,
  FETCH_SESSIONBY_ID_REQUEST,
  FETCH_SESSIONBY_ID_SUCCESS,
  FETCH_SESSIONBY_ID_FAILURE,
  SET_SESSION_FORMDATA,
} from "../constants/sessionConstants";

const initialState = {
  loading: false,
  sessions: [],
  sessionUpated: {},
  sessionData: {},
  sessionFormData: {},
  error: null,
};

export const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SESSION_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        sessions: action.payload,
        error: null,
      };

    case FETCH_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_SESSION_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        sessions: action.payload,
        error: null,
      };

    case CREATE_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        sessions: [],
        error: action.payload,
      };

    case UPDATE_SESSION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UPDATE_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        sessionUpated: action.payload,
        error: null,
      };

    case UPDATE_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        sessionUpated: {},
        error: action.payload,
      };

    case FETCH_SESSIONBY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_SESSIONBY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        sessionData: action.payload,
        error: null,
      };

    case FETCH_SESSIONBY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        sessionData: {},
        error: action.payload,
      };

    case SET_SESSION_FORMDATA:
      return {
        ...state,
        sessionFormData: action.payload,
      };

    default:
      return state;
  }
};
