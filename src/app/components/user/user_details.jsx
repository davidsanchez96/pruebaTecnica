import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import { fetchAllUsers, viewUser } from "../../actions/dashboard_actions";
import Loading from "../helpers/loading";
import { fetchArtists } from "../../actions/lastfm_actions";
import Album from '../api/album';

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.props.fetchArtists();
  }

  renderAlbums() {
        if (!this.props.api.topArtists || this.props.dashboard.selectedUser === null ) return null;
        return this.props.api.topArtists.map((album, index) => {
            return <Album key={index} album={album} />;
        });
    }

  render() {
    if (!this.props.dashboard.selectedUser || !this.props.dashboard.selectedUser) {
      return <Loading />;
    }
    
    let photoURL = this.props.dashboard.selectedUser[0].avatar;
    if (!photoURL || photoURL === '') {
        photoURL = 'http://eadb.org/wp-content/uploads/2015/08/profile-placeholder-300x300.jpg';
    }

    return (
      <div>
        <div className="bd-pageheader">
          <div className="container">
            <h1 className="display-3">MODO ADMINISTRADOR</h1>
            <p className="lead">Email usuario: {this.props.dashboard.selectedUser[0].email}</p>
            <img
                className="figure-img img-fluid rounded-circle"
                src={photoURL}
                alt="Card image cap"
            />
          </div>
        </div>
        <div className="row">
          {this.renderAlbums()}
        </div>
      </div>      
    );
  }  
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchArtists }, dispatch);
}

function mapStateToProps(state) {
  return { dashboard: state.dashboard, api: state.api };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
