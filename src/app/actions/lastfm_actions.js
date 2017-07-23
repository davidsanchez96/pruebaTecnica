import firebase from "firebase";
import LastFM from "last-fm";

import {
  FETCH_ARTISTS,
  FETCH_TRACKS,
  FAVORITE_ARTIST_SUCCESS,
  FETCH_FAVORITE_ARTISTS,
  FAVORITE_TRACK_SUCCESS
} from "./types";

// secret: 'faffc27e1427b6e4522dea72a570e4b4',

const lastfm = new LastFM("d3326839409e0534a0b654d79eb24fd4");

export function fetchArtists() {
  return dispatch => {
    lastfm.geoTopArtists({ country: "Colombia" }, (err, data) => {
      dispatch({
        type: FETCH_ARTISTS,
        payload: data.artist
      });
    });
  };
}

export function fetchTracks(opts) {
  return dispatch => {
    lastfm.artistTopTracks(opts, (err, data) => {
      console.log(data);
      dispatch({
        type: FETCH_TRACKS,
        payload: data.result
      });
    });
  };
}

export function createFavoriteArtist(uid, { name, image }) {
  return dispatch => {
    firebase
      .database()
      .ref(`/users/${uid}/artists/`)
      .child(name)
      .set({ name, image })
      .then(() => {
        dispatch({ type: FAVORITE_ARTIST_SUCCESS });
      });
  };
}


export function deleteFavoriteArtist(uid, { name }) {
  return dispatch => {
    firebase
      .database()
      .ref(`/users/${uid}/artists/`)
      .child(name)
      .remove();
  };
}

export function fetchFavoriteArtists(currentUser) {
  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/artists`)
      .on("value", snapshot => {
        console.log(snapshot.val(), snapshot.val());
        dispatch({ type: FETCH_FAVORITE_ARTISTS, payload: snapshot.val() === null ? [] : snapshot.val() });
      });
  };
}

export function createFavoriteTrack(uid, { artistName, name, images }) {
  return dispatch => {
    firebase
      .database()
      .ref(`/users/${uid}/artists/${artistName}`)
      .child(name)
      .set({ name, image: images[2] })
      .then(() => {
        dispatch({ type: FAVORITE_TRACK_SUCCESS });
      });
  };
}

export function deleteFavoriteTrack(uid, { artistName, name }) {
  return dispatch => {
    firebase
      .database()
      .ref(`/users/${uid}/artists/${artistName}`)
      .child(name)
      .remove();
  };
}
