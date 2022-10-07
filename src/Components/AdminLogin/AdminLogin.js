import React, { Component } from "react";
import fadeInLoading from '../../Functions/fadeInLoading';
import fadeOutLoading from "../../Functions/fadeOutLoading";
import $ from 'jquery';
import "./AdminLogin.css";

export default class AdminLogin extends Component {

  check = () => {
    $('.error').removeAttr('style');
    $('.send-btn').addClass('waiting');

    let username = $('.username').val().trim(),
        password = $('.password').val().trim();

    if (username === '' && password === '') {
        $('.error').text('لا يمكنك ترك حقلي اسم المستخدم وكلمة المرور خاليين.').css('display', 'block');
    } else if (username === '') {
        $('.error').text('لا يمكنك ترك حقل اسم المستخدم خالياً.').css('display', 'block');
    } else if (password === '') {
        $('.error').text('لا يمكنك ترك حقل كلمة المرور خالياً.').css('display', 'block');
    }

    if (!$('.error[style]').length) {
        if (username !== 'admin' || password !== '1234567890') {
            $('.error').text('اسم المستخدم أو كلمة المرور أو كليهما خطأ.').css('display', 'block');
        } else {
            sessionStorage.setItem('RRS_username', 'admin');
            sessionStorage.setItem('RRS_role', 'admin');
            fadeInLoading('admin-page');
        }
    }

    setTimeout(() => {
        $('.send-btn').removeClass('waiting');
    }, 0);
  };

  componentDidMount() {
    fadeOutLoading();
  }
  render() {
    return (
      <div className="admin-login">
        <div className="header">
          <div className="logo">
            <div className="icon logo-icon"></div>
          </div>
          <div className="title">نظام النتائج</div>
        </div>
        <form className="container" onSubmit={() => {}}>
          <div className="icon">
            <div className="icon user-icon"></div>
          </div>
          <div className="user">مسؤول النظام</div>
          <input type="text" className="username" placeholder="اسم المستخدم" />
          <input
            type="password"
            className="password"
            placeholder="كلمة المرور"
          />
          <p className="error"></p>
          <div className="btn send-btn" onClick={this.check}>
            <p> تسجيل الدخول </p>
            <div className="waiting">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
          <div className="btn back-btn" onClick={() => fadeInLoading('root')}>عودة</div>
        </form>
        <div className="login-data">
          <div className="username">اسم المستخدم: admin</div>
          <div className="password">كلمة المرور: 1234567890</div>
        </div>
      </div>
    );
  }
}
