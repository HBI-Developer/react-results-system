import React, { Component } from "react";
import { useSelector } from "react-redux";
import $ from "jquery";
import "./StudentLogin.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";

class StudentLoginClass extends Component {
  state = {
    ssn: 0,
    sittingNumber: 0,
  };

  check = (_) => {
    $(".error").removeAttr("style");
    $(".send-btn").addClass("waiting");

    let username = $(".username").val().trim(),
      password = $(".password").val().trim();

    if (username === "" && password === "") {
      $(".error")
        .text("لا يمكنك ترك حقلي اسم المستخدم وكلمة المرور خاليين.")
        .css("display", "block");
    } else if (username === "") {
      $(".error")
        .text("لا يمكنك ترك حقل اسم المستخدم خالياً.")
        .css("display", "block");
    } else if (password === "") {
      $(".error")
        .text("لا يمكنك ترك حقل كلمة المرور خالياً.")
        .css("display", "block");
    }

    if (!$(".error[style]").length) {
      if (this.props.students[0] !== 0) {
        let student = this.props.students.filter(
          (student) => student.ssn === +username
        )[0];

        if (!student || student.sittingNumber !== +password) {
          $(".error")
            .text("اسم المستخدم أو كلمة المرور أو كليهما خطأ.")
            .css("display", "block");
        } else {
          sessionStorage.setItem("RRS_username", student.name);
          sessionStorage.setItem("RRS_ssn", student.ssn);
          sessionStorage.setItem("RRS_role", "student");
          this.props.navigate("/student-page");
        }
      } else {
        $(".error")
          .text("لا يمكن تسجيل الدخول حالياً، رجاءً عد لاحقاً.")
          .css("display", "block");
      }
    }

    setTimeout(() => {
      $(".send-btn").removeClass("waiting");
    }, 0);
  };

  updateInfo = () => {
    if (!this.state.ssn) {
      if (this.props.degrees[0] !== 0) {
        let randomSSN =
            this.props.degrees[
              Math.floor(Math.random() * this.props.degrees.length)
            ].ssn,
          { sittingNumber } = this.props.students.filter(
            (student) => student.ssn === randomSSN
          )[0];

        this.setState({
          ssn: randomSSN,
          sittingNumber,
        });
      } else if (this.props.students[0] !== 0) {
        let { ssn, sittingNumber } =
          this.props.students[
            Math.floor(Math.random() * this.props.students.length)
          ];

        this.setState({
          ssn,
          sittingNumber,
        });
      } else {
        this.setState({
          ssn: "لا يوجد",
          sittingNumber: "لا يوجد",
        });
      }
    }
  };

  componentDidUpdate(next) {
    if (next.degrees !== this.props.degrees) {
      this.updateInfo();
    }
  }

  componentDidMount() {
    if (this.props.degrees.length) {
      this.updateInfo();
    }
  }

  render() {
    return (
      <div className="student-login">
        <Header />
        <form className="container" onSubmit={() => {}}>
          <div className="icon">
            <div className="icon student-icon"></div>
          </div>
          <div className="user">طالب</div>
          <input type="text" className="username" placeholder="الرقم الوطني" />
          <input type="text" className="password" placeholder="رقم الجلوس" />
          <p className="error"> رقم الجلوس أو الرقم الوطني غير صحيح </p>
          <div className="btn send-btn" onClick={this.check}>
            <p> تسجيل الدخول </p>
            <div className="waiting">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
          <Link className="btn back-btn" to={"/"}>
            عودة
          </Link>
        </form>
        <div className="login-data">
          <div className="username">الرقم الوطني: {this.state.ssn}</div>
          <div className="password">رقم الجلوس: {this.state.sittingNumber}</div>
        </div>
      </div>
    );
  }
}

export default function StudentLogin(props) {
  let nav = useNavigate(),
    { students } = useSelector((state) => state.students),
    { degrees } = useSelector((state) => state.degrees);

  return (
    <StudentLoginClass
      {...props}
      navigate={nav}
      students={students}
      degrees={degrees}
    />
  );
}
