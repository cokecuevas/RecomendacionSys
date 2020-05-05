import { combineReducers } from 'redux';
import isLanding from '../Reducer/navegationReducer';
export default combineReducers({
    isLanding: isLanding
});