import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchArtists, fetchFavoriteArtists } from '../../actions/lastfm_actions';
import { fetchUserData } from '../../actions/user_actions';
import Loading from '../helpers/loading';
import Album from '../api/album';

class Artists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
        };
        this.props.fetchArtists();
    }

    renderAlbums() {
        if (!this.props.api.topArtists) return null;
        return this.props.api.topArtists.map((album, index) => {
            return <Album key={index} album={album} />;
        });
    }

    renderHeaderProfile() {

        let photoURL = this.props.currentUser.photoURL;
        if (!photoURL || photoURL === '') {
            photoURL = 'http://eadb.org/wp-content/uploads/2015/08/profile-placeholder-300x300.jpg';
        }

        return (
            <div className="bd-pageheader">
                <div className="container">
                    <h1 className="display-3">PERFIL USUARIO</h1>
                    <p className="lead">Email usuario: {this.props.dashboard.selectedUser[0].email}</p>
                    <img
                        className="figure-img img-fluid rounded-circle"
                        src={photoURL}
                        alt="Card image cap"
                    />
                </div>
            </div>
        );
    }

    render() {
        if (!this.props.currentUser || !this.props.dashboard.selectedUser) {
            return <Loading />;
        }
        console.log('this.props.dashboard.selectedUser', this.props.currentUser);
        return (
            <div>
                {this.renderHeaderProfile()}
                <div className="row">
                    {this.renderAlbums()}
                </div>
            </div>
            
        );
    }

}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchArtists, fetchFavoriteArtists }, dispatch);
}

function mapStateToProps(state) {
    return { currentUser: state.currentUser, api: state.api, dashboard: state.dashboard };
}


export default connect(mapStateToProps, mapDispatchToProps)(Artists);
