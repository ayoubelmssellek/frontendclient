import { combineReducers } from "redux";
import { ClientReducer } from "./Client/reducer/reducer";
import reducer from "./Admin/Redux/AdminReducer";

const rootReducer = combineReducers({
  admin: reducer,
  client: ClientReducer,
});

export default rootReducer;
