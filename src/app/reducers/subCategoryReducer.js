import {
  SELECTED_SUBCATEGORY,
  FETCH_ALL_SUBCATEGORY_REQUEST,
  FETCH_ALL_SUBCATEGORY_SUCCESS,
  FETCH_ALL_SUBCATEGORY_FAILURE,
} from "../constants/subCategoryConstants";

const initialState = {
  selectedSubCategory: null,
  loading: false,
  subCategories: [],
  error: null,
};

export const subCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_SUBCATEGORY:
      return { ...state, selectedSubCategory: action.payload };

    case FETCH_ALL_SUBCATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_ALL_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        subCategories: action.payload,
        error: null,
      };

    case FETCH_ALL_SUBCATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
