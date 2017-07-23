import {
  CREATE_USER,
  FETCH_USER,
  LOGOUT_USER,
} from '../actions/types';

const INITIAL_STATE = null;

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
    case CREATE_USER:
        return null;
    case FETCH_USER:
        return action.payload;
    case LOGOUT_USER:
        return INITIAL_STATE;
    default:
        return state;
    }
}
