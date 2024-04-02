import { CHANGE_OUTLET } from "../constants/outletChangeConstants";

export const changeOutlet = (outletName) => {
  return {
    type: CHANGE_OUTLET,
    payload: outletName,
  };
};
