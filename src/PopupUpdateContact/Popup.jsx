import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import "./popup.css";
import { favoriteAC, setUsersAC, unfavoriteAC } from "../redux/user-reducer";
import connect from "react-redux/es/connect/connect";

class Popup extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    let user = this.props.user;
    this.setState({
      open: true,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  edit = () => {
    let { users, user } = this.props;
    let { name, username, email, phone } = this.state;
    let editedUsers = users.map(u => {
      if (u.id === user.id) {
        return {
          ...u,
          name: name,
          username: username,
          email: email,
          phone: phone
        };
      }
      return u;
    });
    this.props.setUsers(editedUsers);
    editedUsers.map(item => {
      localStorage.setItem(`${item.id}`, JSON.stringify(item));
      return item;
    });
    this.handleClose();
  };

  bind = (field, e) => {
    this.setState({
      [field]: e.target.value
    });
  };

  render() {
    return (
      <div className={this.props.className}>
        <span onClick={this.handleOpen}>&#9998;</span>
        <Dialog
          className="popup"
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <h1 className="edit-a-contact">Edit a Contact</h1>
            <p>Name:</p>
          <input
            type="text"
            defaultValue={this.state.name}
            onChange={e => this.bind("name", e)}
          />
          <p>Username:</p>
          <input
            type="text"
            defaultValue={this.state.username}
            onChange={e => this.bind("username", e)}
          />
          <p>E-mail:</p>
          <input
            type="text"
            defaultValue={this.state.email}
            onChange={e => this.bind("email", e)}
          />
          <p>Phone</p>
          <input
            type="text"
            defaultValue={this.state.phone}
            onChange={e => this.bind("phone", e)}
          />
          <div className="buttons">
            <button onClick={this.edit}>Edit</button>
            <button onClick={this.handleClose}>Cancel</button>
          </div>
        </Dialog>
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
    setFavorite: userId => {
      dispatch(favoriteAC(userId));
    },
    setUnfavorite: userId => {
      dispatch(unfavoriteAC(userId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Popup);
