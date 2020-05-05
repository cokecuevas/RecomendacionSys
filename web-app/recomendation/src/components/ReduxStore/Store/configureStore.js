import {createStore} from 'redux';
import rootReducer from '../Navegation/Reducer'
export default function configureStore(initialState) {
  return createStore(rootReducer, initialState);
}