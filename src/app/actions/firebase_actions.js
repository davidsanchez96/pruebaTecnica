import firebase from 'firebase';
import _ from 'lodash';
import FireBaseTools from '../utils/firebase';

import {
  LOGIN_WITH_PROVIDER_FIREBASE,
  REGISTER_FIREBASE_USER,
  LOGIN_FIREBASE_USER,
  FETCH_FIREBASE_USER,
  UPDATE_FIREBASE_USER,
  CHANGE_FIREBASE_USER_PASSWORD,
  FIREBASE_PASSWORD_RESET_EMAIL,
  LOGOUT_FIREBASE_USER,
  FETCH_USER,
  LOGOUT_USER,
  FETCH_FAVORITE_ARTISTS,
  VIEW_USER,
  UNSELECT_USER,
} from './types';

export function loginWithProvider(provider) {
  const request = FireBaseTools.loginWithProvider(provider);
  return {
    type: LOGIN_WITH_PROVIDER_FIREBASE,
    payload: request,
  };
}

export function registerUser(user) {
  const request = FireBaseTools.registerUser(user);
  return {
    type: REGISTER_FIREBASE_USER,
    payload: request,
  };
}

export function loginUser(user) {
  const request = FireBaseTools.loginUser(user);
  return {
    type: LOGIN_FIREBASE_USER,
    payload: request,
  };
}

export function fetchUser() {
  const request = FireBaseTools.fetchUser();
  return (dispatch) => {
    dispatch({
      type: FETCH_FIREBASE_USER,
      payload: request,
    });
    fetchUserData(request, dispatch);
    fetchFavoriteArtists(request, dispatch);
    viewUser(request, dispatch);
  };
}

const viewUser = (request, dispatch) => {
  request.then((currentUser) => {
    dispatch({
      type: VIEW_USER,
      payload: [{
        uid: currentUser.uid,
        email: currentUser.email,
        photoURL: currentUser.photoURL,
      }],
    });
  });
}

const fetchUserData = (request, dispatch) => {
  request.then((currentUser) => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}`)
      .on('value', (snapshot) => {
        const arr = _.values(snapshot.val());
        dispatch({ type: FETCH_USER, payload: arr[0] });
      });
  });
};

const fetchFavoriteArtists = (request, dispatch) => {
  request.then((currentUser) => {
    firebase.database().ref(`/users/${currentUser.uid}/artists`)
    .on('value', (snapshot) => {
      dispatch({ type: FETCH_FAVORITE_ARTISTS, payload: snapshot.val() === null ? [] : snapshot.val() });
    });
  });
};

export function updateUser(user) {
  const request = FireBaseTools.updateUserProfile(user);
  return {
    type: UPDATE_FIREBASE_USER,
    payload: request,
  };
}

export function changePassword(newPassword) {
  const request = FireBaseTools.changePassword(newPassword);
  return {
    type: CHANGE_FIREBASE_USER_PASSWORD,
    payload: request,
  };
}

export function resetPasswordEmail(email) {
  const request = FireBaseTools.resetPasswordEmail(email);
  return {
    type: FIREBASE_PASSWORD_RESET_EMAIL,
    payload: request,
  };
}

export function logoutUser(user) {
  const request = FireBaseTools.logoutUser(user);
  return (dispatch) => {
    dispatch({
        type: LOGOUT_FIREBASE_USER,
        payload: request,
    });
    dispatch({
        type: LOGOUT_USER,
    });
    dispatch({
        type: UNSELECT_USER,
    });
  };
}
