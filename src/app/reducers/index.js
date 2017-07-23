import { combineReducers } from 'redux';
import FireBaseUserReducer from './firebase_user_reducer';
import UserReducer from './user_reducer';
import LastfmReducer from './lastfm_reducer';
import DashboardReducer from './dashboard_reducer';

const rootReducer = combineReducers({
    currentUser: FireBaseUserReducer,
    user: UserReducer,
    api: LastfmReducer,
    dashboard: DashboardReducer,
});

export default rootReducer;
