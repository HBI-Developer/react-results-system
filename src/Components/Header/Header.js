import React, { Component } from "react";
import "./Header.css";

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="logo">
          <div className="icon logo-icon"></div>
        </div>
        <div className="title">نظام النتائج</div>
      </div>
    );
  }
}
