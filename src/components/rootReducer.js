import { combineReducers } from "redux";
import { characterReducer } from "./character/characterReducer";


export const rootReducer = combineReducers({
  character: characterReducer,
//   list: listReducer,
//   event: eventReducer,
});
