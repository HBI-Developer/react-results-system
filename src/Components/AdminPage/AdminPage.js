import React, { Component } from "react";
import "./AdminPage.css";
import TimePicker from "./TimePicker/TimePicker";
import $ from 'jquery';
import MainHeader from "../MainHeader/MainHeader";
import fadeOutLoading from "../../Functions/fadeOutLoading";
import fadeInLoading from "../../Functions/fadeInLoading";

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
        <MainHeader clicking={this.goto} type={'admin-login'} />
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
            <div className="option statistics" data-option="statistics" onClick={() => this.goto('statistics')}>
              <div className="icon statistics-icon"></div>
              <div className="name">احصائيات</div>
            </div>
            <div className="option students" data-option="students" onClick={() => this.goto('students')}>
              <div className="icon student-icon"></div>
              <div className="name">الطلاب</div>
            </div>
            <div className="option subjects" data-option="subjects" onClick={() => this.goto('subjects')}>
              <div className="icon subjects-icon"></div>
              <div className="name">المقررات الدراسية</div>
            </div>
            <div className="option degrees" data-option="degrees" onClick={() => this.goto('degrees')}>
              <div className="icon bookmark-icon"></div>
              <div className="name">الدرجات</div>
            </div>
          </div>
        </div>
        <div className="cover" onClick={this.hideClock}>
          <TimePicker />
        </div>
      </div>
    );
  }
}
