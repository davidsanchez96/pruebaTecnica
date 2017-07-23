import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser, logoutUser } from "../actions/firebase_actions";
import { fetchUserData } from "../actions/user_actions";

class App extends Component {
  constructor(props) {
    super(props);

    this.props.fetchUser();
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    this.props.logoutUser().then(data => {
      // reload props from reducer
      this.props.fetchUser();
    });
  }

  renderUserMenu(user) {
    if (user) {
      if (user.role === 'Administrador') {
        return <Link className="nav-link" to="/dashboard"> Panel de usuarios</Link>;
      } else {
        return <Link className="nav-link" to="/artists"> Artistas</Link>;
      }
    } else {
      return <Link className="nav-link" to="/"> Inicio</Link>;
    }
  }

  renderOptionsUserMenu(currentUser) {
    // if current user exists and user id exists than make user navigation
    if (currentUser && currentUser.uid) {
      return <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {currentUser.email}
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <Link className="dropdown-item" to="/profile">
              Perfil
            </Link>
            <Link className="dropdown-item" to="/logout" onClick={this.logOut}>
              Cerrar Sesion
            </Link>
          </div>
        </li>;
    } else {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/login">Login</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/register">Registro</Link>
        </li>,
      ];
    }
  }

  render() {
    return (
        <div>
            <nav className="navbar navbar-toggleable-md navbar-inverse bg-faded" style={{backgroundColor: "red"}}>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link to="/" className="navbar-brand">
                    Prueba Maxcorp
                </Link>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            {this.renderUserMenu(this.props.user)}
                        </li>                                            
                    </ul>
                    <ul className="nav navbar-nav ml-auto">
                        {this.renderOptionsUserMenu(this.props.currentUser)}
                    </ul>

                </div>
            </nav>
            <div className="container">
                {this.props.children}
            </div>
        </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser, logoutUser, fetchUserData }, dispatch);
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    user: state.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
