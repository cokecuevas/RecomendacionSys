import * as actionTypes from '../Action/actionTypes';
export default (state = [], action) => {
    switch (action.type){
      case actionTypes.IS_LANDING:
        return action.isLanding
      default:
            return state;
    }
  };