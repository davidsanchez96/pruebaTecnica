import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  fetchTracks,
  createFavoriteArtist,
  createFavoriteTrack,
  deleteFavoriteArtist,
  deleteFavoriteTrack,
} from "../../actions/lastfm_actions";
import { fetchUserData } from "../../actions/user_actions";

import LastFM from "last-fm";
import Loading from "../helpers/loading";

const lastfm = new LastFM("d3326839409e0534a0b654d79eb24fd4");

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topTracks: [],
      isFavorite: false
    };
    // mbid
    this.fetchTopTracks({ name: this.props.album.name, limit: 5 });
  }

  renderTopTracks() {
    if (!this.state.topTracks || !this.props.api.favoriteArtists || !this.props.dashboard.selectedUser) {
      return <Loading />;
    } else {
      return this.state.topTracks.map((track, index) => {
        let isFavoriteTrack = false;
        if (this.props.api.favoriteArtists.hasOwnProperty(track.artistName)) {
            if (this.props.api.favoriteArtists[track.artistName].hasOwnProperty(track.name)){
                isFavoriteTrack = true;
            }            
        }
        return (
          <button
            key={index}
            type="button"
            className={'list-group-item list-group-item-action ' + (isFavoriteTrack ? 'active' : '')}
            onClick={()=> {
              if (isFavoriteTrack) {
                this.markAsUnfavoriteTrack(track);
              } else {
                this.markAsFavoriteTrack(track);
              }                
            }}
          >
            {track.name}
          </button>
        );
      });
    }
  }

  fetchTopTracks(opts) {
    lastfm.artistTopTracks(opts, (err, data) => {
      this.setState({
        topTracks: data.result,
      });
    });
  }

  markAsFavoriteTrack({ artistName, name, images }) {    
    this.props.createFavoriteTrack(this.props.dashboard.selectedUser[0].uid, { artistName, name, images });
  }

  markAsUnfavoriteTrack({ artistName, name }) {    
    this.props.deleteFavoriteTrack(this.props.dashboard.selectedUser[0].uid, { artistName, name });
  }

  markAsFavorite() {
    const { name, image } = this.props.album;
    this.props.createFavoriteArtist(this.props.dashboard.selectedUser[0].uid, { name, image: image[2]['#text'] });
  }

  markAsUnfavorite() {
    const { name } = this.props.album;
    this.props.deleteFavoriteArtist(this.props.dashboard.selectedUser[0].uid, { name });
  }

  renderFavoriteButton() {
    if (this.props.api.favoriteArtists && this.props.dashboard.selectedUser) {
        if (this.props.api.favoriteArtists.hasOwnProperty(this.props.album.name)) {
            return (
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                    this.markAsUnfavorite();
                    }}
                >
                    Eliminar de favoritos 
                </button>
            );
        } else {
            return (
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                      this.markAsFavorite();
                    }}
                >
                    Añadir a favoritos
                </button>
            );
        }
    } else {
        return <Loading />;
    }
  }

  render() {
    const { image, url, name, listeners } = this.props.album;
    return (
      <div className="col-sm-6 col-md-4 col-lg-3 mt-4">
        <div className="card" >
          <img
            className="card-img-top"
            src={image[2]["#text"]}
            alt="Card image cap"
          />
          <div className="card-block">
            <h4 className="card-title">
              {name}
            </h4>
            <p className="card-text">
              Listeners: {listeners}
            </p>
          </div>
          <ul className="list-group list-group-flush">
            {this.renderTopTracks()}
          </ul>
          <div className="card-block">
            {this.renderFavoriteButton()}
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteFavoriteTrack, fetchTracks, createFavoriteArtist, createFavoriteTrack, deleteFavoriteArtist }, dispatch);
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser, api: state.api, dashboard: state.dashboard };
}

export default connect(mapStateToProps, mapDispatchToProps)(Album);
