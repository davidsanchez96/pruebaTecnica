import { firebaseAuth, FireBaseTools } from "../utils/firebase";
import { CREATE_USER, FETCH_USER } from "./types";
import firebase from "firebase";

export function createUser(currentUser, { email, name, birthday, avatar, role }) {
  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}`)
      .push({
        email,
        name,
        birthday,
        avatar,
        role,
        uid: currentUser.uid,
      })
      .then(() => {
        dispatch({ type: CREATE_USER });
      });
  };
}

export function fetchUserData(currentUser) {
  console.log(currentUser);
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}`)
      .on('value', (snapshot) => {
        dispatch({ type: FETCH_USER, payload: snapshot.val() });
      });
  };
}
