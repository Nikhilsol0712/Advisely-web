import {
  SET_SELECTED_SME,
  GET_ALL_MATCHING_SME_REQUEST,
  GET_ALL_MATCHING_SME_SUCCESS,
  GET_ALL_MATCHING_SME_FAILURE,
  GET_USER_BYID_REQUEST,
  GET_USER_BYID_SUCCESS,
  GET_USER_BYID_FAILURE,
  GET_ALL_SME_REQUEST,
  GET_ALL_SME_SUCCESS,
  GET_ALL_SME_FAILURE,
} from "../constants/userConstants";

const initialState = {
  selectedSME: null,
  loading: false,
  allMathcingSME: [],
  error: null,
  userDetail: {}, //its an smeDetail state
  AllSme: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_SME:
      return {
        ...state,
        selectedSME: action.payload,
      };

    case GET_ALL_MATCHING_SME_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_ALL_MATCHING_SME_SUCCESS:
      return {
        ...state,
        loading: false,
        allMathcingSME: action.payload,
        error: null,
      };

    case GET_ALL_MATCHING_SME_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_USER_BYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_BYID_SUCCESS:
      return {
        ...state,
        loading: false,
        userDetail: action.payload,
        error: null,
      };

    case GET_USER_BYID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_ALL_SME_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_ALL_SME_SUCCESS:
      return {
        ...state,
        loading: false,
        AllSme: action.payload,
        error: null,
      };

    case GET_ALL_SME_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
