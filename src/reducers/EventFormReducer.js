import {
  FORM_UPDATE,
  // EVENT_CREATE,
  // EVENT_SAVE_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  description: '',
  subject: '',
  date: '',
};

export default (state = INITIAL_STATE, action) => {
  // console.log(state);

  switch (action.type) {
    case FORM_UPDATE:
      return {
        ...state,
        [action.payload.prop]: action.payload.value
      };
    // case EVENT_CREATE:
    //   return INITIAL_STATE;
    // case EVENT_SAVE_SUCCESS:
    //   return INITIAL_STATE;
    default:
      return state;
  }
};
