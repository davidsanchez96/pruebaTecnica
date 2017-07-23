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
        console.log(this.props.dashboard);
        return (
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-3">PERFIL USUARIO</h1>
                    <p className="lead">Email usuario: {this.props.dashboard.selectedUser[0].email}</p>
                </div>
            </div>
        );
    }

    render() {
        if (!this.props.currentUser || !this.props.dashboard) {
            return <Loading />;
        }

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
