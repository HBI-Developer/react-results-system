import React, { Component, Fragment } from "react";
import StartPage from "../StartPage/StartPage";
import "./ChooseLogin.css";
import $ from 'jquery';
import fadeInLoading from "../../Functions/fadeInLoading";

export default class ChooseLogin extends Component {
  constructor() {
    super();
    $(".loading-screen").css('display', 'none');
  }

  choose = (type) => {
    fadeInLoading(type);
  };
  render() {
    return (
      <Fragment>
        <StartPage />
        <div className="choose-page">
          <div className="header">
            <div className="logo">
              <div className="icon logo-icon"></div>
            </div>
            <div className="welcome">
              <p>مرحباً بك في</p>
              <div className="title">نظام النتائج</div>
            </div>
          </div>
          <div className="container">
            <div className="admin" onClick={() => this.choose('admin-login')}>
              <div className="icon user-icon"></div>
              <div className="name">مسؤول النظام</div>
            </div>
            <div className="student" onClick={() => this.choose('student-login')}>
              <div className="icon student-icon"></div>
              <div className="name">طالب</div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
