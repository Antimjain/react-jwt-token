//constant
import { authConstants } from "../constants";

const user = JSON.parse(localStorage.getItem("user"));

//setting initState
// const initState = {
  
//   loginProcess: false,
//   loginSuccess: false,
//   loginFailure: false,
// };

const initState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

// passing state and action to the reducer
const authReducers = (state = initState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_STARTED: {
      return {
        ...state,
        loginProcess: true,
        loginSuccess: false,
        loginFailure: false,
        isLoading: true,
        isLoggedIn: false,
      };
    }
    case authConstants.LOGIN_SUCCESS: {
      console.log("console.log", action.payload)
      return {
        ...state,
        loginProcess: false,
        loginSuccess: true,
        loginFailure: false,
        isLoading: false,
        isLoggedIn: true,
        // user: action.payload.user,
      };
    }
    case authConstants.LOGIN_FAILURE: {
      return {
        ...state,
        loginProcess: false,
        loginSuccess: false,
        loginFailure: true,
        isLoading: false,
        isLoggedIn: false,
        user: null,
      };
    }case authConstants.LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    }
    default:
      return state;
  }
};

//exporting authReducers
export { authReducers };
