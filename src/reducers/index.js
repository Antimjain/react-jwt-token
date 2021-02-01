import { combineReducers } from "redux";
import { authReducers } from "./authReducers";

// passing all reducers to combine reducers and creating root reducer and then will create single store for the application
const rootReducer = combineReducers({
  authState: authReducers,
});

// export rootReducer
export default rootReducer;