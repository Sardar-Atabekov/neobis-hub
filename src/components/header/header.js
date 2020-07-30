import React, { Component } from "react";
import bell from "./../../assets/header/bell.svg";
import profile from "./../../assets/header/profile.svg";
import "./header.css";

class Header extends Component {
  // handleSubmit(event) {
  //   event.preventDefault();
  //   let formData = new FormData(event.target);

  //   let data = {};
  //   formData.forEach(function(value, key) {
  //     data[key] = value;
  //   });
  // }
  render() {
    return (
      <nav className="serchNavbar">
        <div className="input">
          <input
            className="navbar-search form-control"
            type="text"
            // placeholder="Поиск..."
            aria-label="Search"
          />
        </div>
        <div className="bell">
          <img src={bell} alt="bellImage" />
        </div>
        <div className="profileImage">
          <img src={profile} alt="bellImage" />
        </div>
      </nav>
    );
  }
}

export default Header;
