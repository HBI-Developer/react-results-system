import React, { Component } from "react";
import { connect } from "react-redux";
import MainHeader from "../MainHeader/MainHeader";
import DegreesTable from "./DegreesTable/DegreesTable";
import Nothing from "./Nothing/Nothing";
import "./StudentPage.css";
import WaitingTime from "./WaitingTime/WaitingTime";

const fetchData = (data) => ({
  students: data.students.students,
  subjects: data.subjects.subjects,
  degrees: data.degrees.degrees,
});

export default connect(fetchData)(
  class StudentPage extends Component {
    nothing = (<Nothing key={"nothing"} />);
    state = {
      template: [this.nothing],
    };

    ssn = +sessionStorage.getItem("RRS_ssn");

    theTime = () => {
      let [year, month, day, hour, minute] = [
          +sessionStorage.getItem("RRS_year") ?? new Date().getFullYear(),
          +sessionStorage.getItem("RRS_month") + 1 ?? new Date().getMonth() + 1,
          +sessionStorage.getItem("RRS_day") ?? new Date().getDate(),
          +sessionStorage.getItem("RRS_hour") ?? 0,
          +sessionStorage.getItem("RRS_minute") ?? 0,
        ],
        diff =
          new Date(`${year}-${month}-${day} ${hour}:${minute}`).getTime() -
          new Date().getTime();

      return diff > 0 ? diff : 0;
    };

    createTemplate = () => {
      let diff = this.theTime();
      if (diff) {
        this.setState({
          template: [<WaitingTime key={diff} />],
        });
      } else {
        let student = this.props.degrees.filter(
          (degree) => degree.ssn === this.ssn
        )[0];
        if (student) {
          this.setState({
            template: [<DegreesTable key={"degreesTable"} ssn={this.ssn} />],
          });
        } else {
          this.setState({
            template: [this.nothing],
          });
        }
      }
    };

    componentDidUpdate(next) {
      if (next.degrees !== this.props.degrees) {
        this.createTemplate();
      }
    }

    componentDidMount() {
      if (this.props.degrees.length) {
        this.createTemplate();
      }
    }

    render() {
      return (
        <div className="student-page">
          <MainHeader type={"student"} />
          <div className="container" key={this.state.template}>
            {this.state.template}
          </div>
        </div>
      );
    }
  }
);
