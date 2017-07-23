import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchAllUsers, viewUser } from "../../actions/dashboard_actions";
import { browserHistory, Link } from 'react-router';
import Loading from "../helpers/loading";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.props.fetchAllUsers();
  }

  renderUsers() {
    if (!this.props.dashboard) {
      return <Loading />;
    }

    const arr = _.values(this.props.dashboard);
    const userArray = _.values(arr[0]);
    return userArray.map((user, index) => {
        const actualUser = _.values(user)[0];

      return (
        <tr key={index}>
          <td>{actualUser.name}</td>
          <td>{actualUser.email}</td>
          <td>{actualUser.birthday}</td>
          <td>{actualUser.role}</td>
          <td>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                this.props.viewUser(_.values(user));
                browserHistory.push('/userDetails');
              }}
            >
              Ver usuario
                </button></td>
        </tr>
      );
    });
  }

  render() {
    if (!this.props.dashboard) {
      return <Loading />;
    }

    return (
      <div className="col-md-12">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Birthday</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.renderUsers()}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchAllUsers, viewUser }, dispatch);
}

function mapStateToProps(state) {
  return { dashboard: state.dashboard };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
