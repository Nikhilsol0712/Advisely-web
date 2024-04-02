import {
  GET_ALL_MATCHING_SME_REQUEST,
  GET_ALL_MATCHING_SME_SUCCESS,
  GET_ALL_MATCHING_SME_FAILURE,
  SET_SELECTED_SME,
  GET_USER_BYID_REQUEST,
  GET_USER_BYID_SUCCESS,
  GET_USER_BYID_FAILURE,
  GET_ALL_SME_REQUEST,
  GET_ALL_SME_SUCCESS,
  GET_ALL_SME_FAILURE,
} from "../constants/userConstants";

export const setSelectedSME = (selectedSME) => {
  return {
    type: SET_SELECTED_SME,
    payload: selectedSME,
  };
};

export const fetchAllMatchingSMERequest = () => {
  return {
    type: GET_ALL_MATCHING_SME_REQUEST,
  };
};

export const fetchAllMatchingSMESuccess = (allMatchingSME) => {
  return {
    type: GET_ALL_MATCHING_SME_SUCCESS,
    payload: allMatchingSME,
  };
};

export const fetchAllMatchingSMEFailure = (error) => {
  return {
    type: GET_ALL_MATCHING_SME_FAILURE,
    payload: error,
  };
};

export const getUserByIdReuest = () => {
  return {
    type: GET_USER_BYID_REQUEST,
  };
};

export const getUserByIdSuccess = (userDetail) => {
  return {
    type: GET_USER_BYID_SUCCESS,
    payload: userDetail,
  };
};

export const getUserByIdFailure = (error) => {
  return {
    type: GET_ALL_MATCHING_SME_FAILURE,
    payload: error,
  };
};

export const getAllSmeRequest = () => {
  return {
    type: GET_ALL_SME_REQUEST,
  };
};

export const getAllSmeSuccess = (allSme) => {
  return {
    type: GET_ALL_SME_SUCCESS,
    payload: allSme,
  };
};

export const getAllSmeFailure = (error) => {
  return {
    type: GET_ALL_SME_FAILURE,
    error: error,
  };
};
