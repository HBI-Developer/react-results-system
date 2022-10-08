import React, { Component } from "react";
import CheckPage from "../CheckPage/CheckPage";
import "./Header.css";

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <CheckPage />
        <div className="logo">
          <div className="icon logo-icon"></div>
        </div>
        <div className="title">نظام النتائج</div>
      </div>
    );
  }
}
