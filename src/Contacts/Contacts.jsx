import React, { Component } from "react";
import "./contacts.css";
import api from "../config/api";
import {
    unfavoriteAC,
    favoriteAC,
    setUsersAC,
} from "../redux/user-reducer";
import connect from "react-redux/es/connect/connect";
import Popup from "../PopupUpdateContact/Popup";
import Search from "../Search/Search";
import Sort from "../Sort/Sort";

class Contacts extends Component {

  componentDidMount() {
    api.get("/users").then(response => {
      this.props.setUsers(response.data);
      response.data.map(item => {
        localStorage.setItem(`${item.id}`, JSON.stringify(item));
        return item;
      });
    });
  }

  render() {
    let { users } = this.props;
    return (
      <>
        <h1>My Contacts</h1>
          <Search />
          <Sort />
        {users.map((person, i) => {
          return (
            <div className="person-container" key={i}>
              <div className="img-box">
                <img src={person.avatar} alt="avatar" />
              </div>
              <div className="names">
                <h1 className="name">{person.name} </h1>
                <span className="nickname">@{person.username}</span>
                <span className="email">&#9993; {person.email}</span>
                <span className="phone">&#9742; {person.phone}</span>
              </div>
              {person.favorite ? (
                <span onClick={() => this.props.setUnfavorite(person.id)} className="favorite-heart">&#9733;</span>
              ) : (
                <span onClick={() => this.props.setFavorite(person.id)} className="favorite-heart">&#9734;</span>
              )}
              <Popup className="edit-contact" user={person} />
            </div>
          );
        })}
      </>
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
            dispatch(favoriteAC(userId))
        },
        setUnfavorite: userId => {
            dispatch(unfavoriteAC(userId))
        },

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Contacts);