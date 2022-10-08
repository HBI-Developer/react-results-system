import React, { Component, Fragment } from "react";
import "./ChooseLogin.css";
import { Link } from "react-router-dom";
import CheckPage from "../CheckPage/CheckPage";

export default class ChooseLogin extends Component {
  render() {
    return (
      <Fragment>
        <div className="choose-page">
          <div className="header">
            <CheckPage />
            <div className="logo">
              <div className="icon logo-icon"></div>
            </div>
            <div className="welcome">
              <p>مرحباً بك في</p>
              <div className="title">نظام النتائج</div>
            </div>
          </div>
          <div className="container">
            <Link className="admin" to={'/admin-login'}>
              <div className="icon user-icon"></div>
              <div className="name">مسؤول النظام</div>
            </Link>
            <Link className="student" to={'/student-login'}>
              <div className="icon student-icon"></div>
              <div className="name">طالب</div>
            </Link>
          </div>
        </div>
      </Fragment>
    );
  }
}
