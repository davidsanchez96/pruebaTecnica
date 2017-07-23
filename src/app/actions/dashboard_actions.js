import firebase from 'firebase';
import { FETCH_ALL_USERS, VIEW_USER, FETCH_FAVORITE_ARTISTS } from './types';

export function fetchAllUsers() {
  return (dispatch) => {
    firebase.database().ref('/users')
    .on('value', (snapshot) => {
      dispatch({ type: FETCH_ALL_USERS, payload: snapshot.val() });
    });
  };
}

export function viewUser(user) {
  return (dispatch) => {
    dispatch({
      type: VIEW_USER,
      payload: user,
    });
    fetchFavoriteArtists(user, dispatch);
  };
}

const fetchFavoriteArtists = (user, dispatch) => {
  console.log('fetchFavoritesArtist.dashboard_actions = {user[0].uid} = ', user[0].uid);
  firebase.database().ref(`/users/${user[0].uid}/artists`)
  .on('value', (snapshot) => {
    dispatch({ type: FETCH_FAVORITE_ARTISTS, payload: snapshot.val() === null ? [] : snapshot.val() });
  });
};
