import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from '../../utils/firebase';


import { fetchUser, updateUser } from '../../actions/firebase_actions';
import { fetchUserData } from '../../actions/user_actions';
import Loading from '../helpers/loading';
import ChangePassword from './change_password';

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.props.fetchUser();
        this.state = {
            message: '',
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();
        const email = this.refs.email.value;
        const displayName = this.refs.displayName.value;
        this.props.updateUser({ email, displayName }).then((data) => {
            if (data.payload.errorCode) {
                this.setState({ message: data.payload.errorMessage });
            } else {
                this.setState({
                    message: 'Updated successfuly!',
                });
            }
        }
    );
    }

    render() {
        if (!this.props.currentUser) {
            return <Loading />;
        }
        let photoURL = this.props.currentUser.photoURL;
        if (!photoURL || photoURL === '') {
            photoURL = 'http://eadb.org/wp-content/uploads/2015/08/profile-placeholder-300x300.jpg';
        }
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">                
                        <ChangePassword />                
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-3 mt-4">
                    <div className="card" >
                    <img
                        className="card-img-top"
                        src={photoURL}
                        alt="Card image cap"
                    />
                    <div className="card-block">
                        <h4 className="card-title">
                            {this.props.currentUser.displayName}
                        </h4>
                        <p className="card-text">
                            {this.props.currentUser.email}
                        </p>
                    </div>
                    </div>
                </div>
                </div>                
            </div>
            
        );
    }

}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchUser, updateUser, fetchUserData }, dispatch);
}


function mapStateToProps(state) {
    return { currentUser: state.currentUser };
}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
