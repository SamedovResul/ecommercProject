import { combineReducers } from "redux";
import reducer from "./reducer/reducer";
import Auth from "./reducer/authReducer";
import category from './reducer/categoriesReducer'
export default combineReducers({
  reducer,
  Auth,
  category
})