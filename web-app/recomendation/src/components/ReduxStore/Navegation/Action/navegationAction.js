import * as actionTypes from './actionTypes';

export const updateLanding = (isLanding) => {
    return {
      type: actionTypes.IS_LANDING,
      isLanding: isLanding
    }
  };