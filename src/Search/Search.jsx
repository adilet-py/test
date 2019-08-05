import React, { Component } from "react";
import "./search.css";
import SearchIcon from "@material-ui/icons/Search";
import { setUsersAC } from "../redux/user-reducer";
import connect from "react-redux/es/connect/connect";
import api from "../config/api";

class Search extends Component {
  state = {

  };

  bind = (field, e) => {
    this.setState({
      [field]: e.target.value
    });
  };

  doSearch = () => {
    let { name } = this.state;
    if(name !== '') {
      let filteredUsersByName = this.props.users.filter(contact => contact.name.startsWith(name));
      this.props.setUsers(filteredUsersByName);
    } else {
      api.get("/users").then(response => {
        this.props.setUsers(response.data);
        response.data.map(item => {
          localStorage.setItem(`${item.id}`, JSON.stringify(item));
          return item;
        });
      });
    }
  }

  render() {
    return (
      <div className="search">
        <div className="inner">
          <div className="search-icon">
            <SearchIcon onClick={() => this.doSearch()} />
          </div>
          <input
            placeholder="Search…"
            type="text"
            onChange={(e) => this.bind('name', e)}
          />
        </div>
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
    }
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);

