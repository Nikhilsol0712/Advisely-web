import {
  SELECTED_SUBCATEGORY,
  FETCH_ALL_SUBCATEGORY_REQUEST,
  FETCH_ALL_SUBCATEGORY_SUCCESS,
  FETCH_ALL_SUBCATEGORY_FAILURE,
} from "../constants/subCategoryConstants";

export const slectedSubcategory = (selectedSubCat) => {
  return {
    type: SELECTED_SUBCATEGORY,
    payload: selectedSubCat,
  };
};


export const fetchAllSubCategoriesRequest = () => {
  return {
    type: FETCH_ALL_SUBCATEGORY_REQUEST,
  };
};

export const fetchAllSubCategoriesSuccess = subCategories => {
  return {
    type: FETCH_ALL_SUBCATEGORY_SUCCESS,
    payload: subCategories,
  };
};

export const fetchAllSubCategoriesFailure = error => {
  return {
    type: FETCH_ALL_SUBCATEGORY_FAILURE,
    payload: error,
  };
};