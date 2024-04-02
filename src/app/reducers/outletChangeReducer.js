import { CHANGE_OUTLET } from "../constants/outletChangeConstants";

const initialState = {
  outletName: "SMESessions",
};

export const outletReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_OUTLET:
      return { ...state, outletName: action.payload };

    default:
      return state;
  }
};
