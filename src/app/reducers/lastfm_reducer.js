import {
  FETCH_ARTISTS,
  FETCH_TRACKS,
  FAVORITE_ARTIST_SUCCESS,
  FETCH_FAVORITE_ARTISTS,
  FAVORITE_TRACK_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = { topArtists: [], tracks: [], favoriteArtists: [] };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ARTISTS:
      return { ...state, topArtists: action.payload };
    case FETCH_TRACKS:
      return { ...state, tracks: action.payload };
    case FAVORITE_ARTIST_SUCCESS:
      return { ...state };
    case FETCH_FAVORITE_ARTISTS:
      return { ...state, favoriteArtists: action.payload };
    case FAVORITE_TRACK_SUCCESS:
      return { ...state };
    default:
      return state;
  }
}
