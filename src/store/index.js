import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

//add all middlewares
const middleware = applyMiddleware(thunkMiddleware);

//creating store and passing all reducers to it
const store = createStore(
  rootReducer,
  middleware
);

export {
  store,
};