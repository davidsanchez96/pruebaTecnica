import React, { Component } from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { registerUser } from "../../actions/firebase_actions";
import { createUser } from "../../actions/user_actions";

class UserRegister extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {
      message: ""
    };
  }

  onFormSubmit(event) {
    event.preventDefault();

    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const name = this.refs.nombre.value;
    const birthday = this.refs.fechaNacimiento.value;
    const avatar = this.refs.avatar.value;
    const role = this.refs.role.value;

    this.props.registerUser({ email, password }).then(data => {
      if (data.payload.errorCode) {
        this.setState({ message: data.payload.errorMessage });
      } else {
        this.props.createUser(this.props.currentUser, {
          email,
          name,
          birthday,
          avatar,
          role,
        });
        browserHistory.push("/profile");
      }
    });
  }

  render() {
    // Nombre, Documento, Fecha nacimiento, Avatar y opción de actualizar password.
    return (
      <div className="col-md-4">
        <form id="frmRegister" role="form" onSubmit={this.onFormSubmit}>
          <p>
            {this.state.message}
          </p>
          <h2>Registro</h2>
          <div className="form-group">
            <label htmlFor="role">Seleccione un rol</label>
            <select className="form-control" id="role" ref="role">
              <option>Administrador</option>
              <option>Usuario</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="txtNombre">Nombre</label>
            <input
              type="text"
              className="form-control"
              ref="nombre"
              id="txtNombre"
              placeholder="Digite su nombre"
              name="nombre"
            />
          </div>
          <div className="form-group">
            <label htmlFor="txtFechaNacimiento">Fecha de Nacimiento</label>
            <input
              type="date"
              className="form-control"
              ref="fechaNacimiento"
              id="txtFechaNacimiento"
              placeholder="Ingrese su fecha de nacimiento"
              name="fechaNacimiento"
            />
          </div>
          <div className="form-group">
            <label htmlFor="txtAvatar">Avatar</label>
            <input
              type="url"
              className="form-control"
              ref="avatar"
              id="txtAvatar"
              placeholder="Ingrese la url de su avatar"
              name="avatar"
            />
          </div>
          <div className="form-group">
            <label htmlFor="txtEmail">Email</label>
            <input
              type="email"
              className="form-control"
              ref="email"
              id="txtEmail"
              placeholder="Digite su email"
              name="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="txtRegPass">Password</label>
            <input
              type="password"
              className="form-control"
              ref="password"
              id="txtPass"
              placeholder="Password"
              name="password"
            />
          </div>
          <button type="submit" className="btn btn-default">
            Register
          </button>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      registerUser,
      createUser
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegister);
