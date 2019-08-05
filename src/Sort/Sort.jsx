import React, { Component } from "react";
import { setUsersAC, sortAC } from "../redux/user-reducer";
import connect from "react-redux/es/connect/connect";

class Sort extends Component {
  state = {};

  bind = (field, e) => {
    this.setState({
      [field]: e.target.value
    });
  };

  doSortAZ = () => {
    let sortedAZ = this.props.users.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
      let editedUsers = sortedAZ.map(u => {
          return u;
      });
      this.props.setUsers(editedUsers);
  };

  doSortZA = () => {
    let sortedZA = this.props.users.sort((a, b) => {
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
      return 0;
    });
      let editedUsers = sortedZA.map(u => {
          return u;
      });
      this.props.setUsers(editedUsers);
  };

  render() {
    return (
      <div className="sort">
        <span>Sort:</span>
        <button className="sort" onClick={() => this.doSortAZ()}>
          &#9660;
        </button>
        <button className="sort" onClick={() => this.doSortZA()}>
          &#9650;
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.usersPage.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUsers: users => {
      dispatch(setUsersAC(users));
    },
    sort: () => {
      dispatch(sortAC());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sort);
