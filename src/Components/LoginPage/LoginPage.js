import React, { Component } from "react";
import AdminLogin from "../AdminLogin/AdminLogin";
import ChooseLogin from "../ChooseLogin/ChooseLogin";
import StudentLogin from "../StudentLogin/StudentLogin";
import "./LoginPage.css";

export default class LoginPage extends Component {
  render() {
    return (
      <div className="login-page">
        <ChooseLogin />
        {/* <AdminLogin /> */}
        {/* <StudentLogin /> */}
      </div>
    );
  }
}
