import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changePassword } from '../../actions/firebase_actions';

class ChangePassword extends Component {

  constructor(props) {
      super(props);
      this.onFormSubmit = this.onFormSubmit.bind(this);
      this.state = {
        message: '',
    };
  }

  onFormSubmit(event) {
      event.preventDefault();
      let password = this.refs.password.value;
      let repeatPassword = this.refs.repeatPassword.value;
      if (password !== repeatPassword) {
        this.setState({
          message: 'Las contraseñas no coinciden!',
      });
    } else {
        this.props.changePassword(password).then((data) => {
          if (data.payload.errorCode)
            this.setState({ message: data.payload.errorMessage });
          else
          this.setState({ message: 'Contraseña actualizada exitosamente!' });
      });
    }
  }

    render() {
      return (
      <form id="ChangePassword" role="form" onSubmit={this.onFormSubmit} style={{paddingTop: 20}}>
        <h4> Cambiar contraseña </h4>
        <h5> {this.state.message} </h5>
        <div className="form-group">
          <label htmlFor="password"> Nueva contraseña: </label>
          <input type="password" className="form-control"
            name="password" ref="password" id="password" 
          />
        </div>
        <div className="form-group">
          <label htmlFor="repeatPassword"> Repita la contraseña: </label>
          <input type="password" className="form-control"
            name="repeatPassword" ref="repeatPassword" id="repeatPassword" 
          />

        </div>
        <button type="submit" className="btn btn-primary">Actualizar</button>
      </form>
    );
  }

}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ changePassword }, dispatch);
}

function mapStateToProps(state) {
    return { currentUser: state.currentUser };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
