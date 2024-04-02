import { combineReducers } from "redux";
import { outletReducer } from "./outletChangeReducer";
import { subCategoryReducer } from "./subCategoryReducer";
import { authReducer } from "./authReducer";
import { userReducer } from "./userReducer";
import { sessionReducer } from "./sessionReducers";
import { chatReducer } from "./chatReducer";
import { messageReducer } from "./messageReducer";

export const rootReducer = combineReducers({
  outlet: outletReducer,
  subCategory: subCategoryReducer,
  auth: authReducer,
  user: userReducer,
  session: sessionReducer,
  chat: chatReducer,
  message: messageReducer,
});
