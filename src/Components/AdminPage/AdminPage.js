import React, { Component } from "react";
import "./AdminPage.css";
import TimePicker from "./TimePicker/TimePicker";
import $ from 'jquery';
import MainHeader from "../MainHeader/MainHeader";
import fadeOutLoading from "../../Functions/fadeOutLoading";
import fadeInLoading from "../../Functions/fadeInLoading";
import { Link } from "react-router-dom";

export default class AdminPage extends Component {

  goto = page => {
    fadeInLoading(page);
  }

  showClock = () => {
    $(document.querySelector('.admin-page .cover')).fadeIn();
    $(document.querySelector('.admin-page .cover')).css("display", "flex");
  }

  hideClock = ev => {
    if (ev.target.classList[0] === "cover") {
      $(document.querySelector('.admin-page .cover')).fadeOut();
    }
  }

  componentDidMount() {
    setTimeout(() => {
      fadeOutLoading();
    }, 0);
  }

  render() {
    return (
      <div className="admin-page">
        <MainHeader type={'admin'} />
        <div className="container">
          <div className="sidebar">
            <div className="option clock" onClick={this.showClock}>
              <div className="icon clock-icon"></div>
            </div>
          </div>
          <div className="option clock" onClick={this.showClock}>
            <div className="icon clock-icon"></div>
          </div>
          <div className="options">
            <Link className="option statistics" data-option="statistics" to={'/statistics'}>
              <div className="icon statistics-icon"></div>
              <div className="name">احصائيات</div>
            </Link>
            <Link className="option students" data-option="students" to={'/students'}>
              <div className="icon student-icon"></div>
              <div className="name">الطلاب</div>
            </Link>
            <Link className="option subjects" data-option="subjects" to={'/subjects'}>
              <div className="icon subjects-icon"></div>
              <div className="name">المقررات الدراسية</div>
            </Link>
            <Link className="option degrees" data-option="degrees" to={'/degrees'}>
              <div className="icon bookmark-icon"></div>
              <div className="name">الدرجات</div>
            </Link>
          </div>
        </div>
        <div className="cover" onClick={this.hideClock}>
          <TimePicker />
        </div>
      </div>
    );
  }
}
