import React, { Component } from "react";

export default class MainHeader extends Component {

  logout = () => {
    this.props.clicking(this.props.type);
    sessionStorage.removeItem('RRS_username');
    sessionStorage.removeItem('RRS_ssn');
    sessionStorage.removeItem('RRS_role');
  }

  render() {
    return (
      <div className="header">
        <div className="logo">
          <div className="icon logo-icon"></div>
        </div>
        <div className="welcome">
          <span>مرحباً بك، </span>
          <span className="username">
            {sessionStorage.getItem("RRS_username")}
          </span>
        </div>
        <div className="logout" onClick={this.logout}>تسجيل الخروج</div>
      </div>
    );
  }
}
