import {
  FETCH_ALL_USERS,
  VIEW_USER,
  UNSELECT_USER,
} from '../actions/types';

const INITIAL_STATE = {usuarios: [], selectedUser: null};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
    case FETCH_ALL_USERS:
        return { ...state, usuarios: action.payload };
    case VIEW_USER:
        return { ...state, selectedUser: action.payload };
    case UNSELECT_USER:
        return { INITIAL_STATE };
    default:
        return state;
    }
}
