
//services
import { authServices } from "../services";
import { authConstants } from "../constants";

/**
 * dispatching login action
 * @method doLogin
 * @params {username, password}
*/
const doLogin = (username, password) => (dispatch) => {
  dispatch({ type: authConstants.LOGIN_STARTED });
  authServices
    .doLogin(username, password)
    .then((response) => {
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: response,
      });
    })
    .catch((error) => {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: error,
      });
    });
};

//export authActions
export const authActions = {
  doLogin,
};