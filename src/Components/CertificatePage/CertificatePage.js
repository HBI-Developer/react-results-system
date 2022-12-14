import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import CheckPage from "../CheckPage/CheckPage";
import "./CertificatePage.css";

const fetchData = (data) => ({
  students: data.students.students,
  subjects: data.subjects.subjects,
  degrees: data.degrees.degrees,
});

export default connect(fetchData)(
  class CertificatePage extends Component {
    state = {
      studentName: "",
      major: "",
      state: "",
      school: "",
      degrees: [],
      fullDegree: 0,
      statistics: [],
    };

    ssn = +sessionStorage.getItem("RRS_ssn");

    theCertificate = () => {
      let { name, major, state, school } = this.props.students.filter(
          (student) => student.ssn === this.ssn
        )[0],
        degrees = this.props.degrees.filter(
          (degree) => degree.ssn === this.ssn
        )[0],
        degreesTemplate = [],
        fullDegree = 0,
        statistics = [];

      this.props.subjects.map((i) => {
        degrees.degrees.map((j) => {
          if (i.id === j[0]) {
            degreesTemplate.push(
              <Fragment key={i.id}>
                <div className="column">{i.name}</div>
                <div className="column">{j[1]}%</div>
              </Fragment>
            );

            fullDegree += j[1];
          }
          return 0;
        });

        return 0;
      });

      degrees.degrees.map((i) => {
        let inState = 0,
          inStateNumber = 0,
          inCountry = 0,
          inCountryNumber = 0,
          subjectName = this.props.subjects.filter(
            (subject) => subject.id === i[0]
          )[0].name,
          studentsInState = this.props.students.filter(
            (student) => student.state === state
          );

        studentsInState.map((s) => {
          this.props.degrees.map((j) => {
            if (j.ssn === s.ssn) {
              j.degrees.map((k) => {
                if (k[0] === i[0]) {
                  inState += k[1];
                  inStateNumber++;
                }

                return 0;
              });
            }

            return 0;
          });

          return 0;
        });

        this.props.degrees.map((j) => {
          j.degrees.map((k) => {
            if (k[0] === i[0]) {
              inCountry += k[1];
              inCountryNumber++;
            }

            return 0;
          });
          return 0;
        });

        inState = (inState / inStateNumber).toFixed(2);
        inCountry = (inCountry / inCountryNumber).toFixed(2);

        statistics.push(
          <div className="box" key={"statistics_" + i[0]}>
            <div className="title">{subjectName}</div>
            <div className="staticstic">
              <div className="row">???????? ????????????</div>
              <div className="row with-columns">
                <div className="column">
                  <div
                    className="progress origin"
                    style={{
                      "--width": `${parseFloat(i[1]).toFixed(2)}%`,
                      "--background": "#03A9F4",
                    }}
                  ></div>
                </div>
                <div className="column">{parseFloat(i[1]).toFixed(2)}%</div>
              </div>
              <div className="row">?????????? ???????? ??????????????</div>
              <div className="row with-columns">
                <div className="column">
                  <div
                    className="progress origin"
                    style={{
                      "--width": `${inState}%`,
                      "--background": "#4CAF50",
                    }}
                  ></div>
                </div>
                <div className="column">{inState}%</div>
              </div>
              <div className="row">?????????? ???????? ??????????????</div>
              <div className="row with-columns">
                <div className="column">
                  <div
                    className="progress origin"
                    style={{
                      "--width": `${inCountry}%`,
                      "--background": "#EF5350",
                    }}
                  ></div>
                </div>
                <div className="column">{inCountry}%</div>
              </div>
            </div>
          </div>
        );

        return 0;
      });

      fullDegree = (fullDegree / degrees.degrees.length).toFixed(2);

      this.setState({
        studentName: name,
        major,
        state,
        school,
        fullDegree,
        degrees: degreesTemplate,
        statistics,
      });
    };

    componentDidUpdate(next) {
      if (next.degrees !== this.props.degrees && this.ssn) {
        this.theCertificate();
      }
    }

    componentDidMount() {
      if (this.props.degrees.length && this.ssn) {
        this.theCertificate();
      }
    }

    render() {
      return (
        <div className="print-certificate" key={this.state.studentName}>
          <CheckPage />
          <div className="certificate">
            <div className="container">
              <div className="head">
                <div className="icon ministry-icon"></div>
                <div className="ministry-info">
                  <p>?????????????? ??????????????</p>
                  <p>?????????? ?????????????? ????????????????</p>
                </div>
                <div className="ministry-info">
                  <p>Republic of the Sudan</p>
                  <p>Ministry of Education</p>
                </div>
                <div className="icon ministry-icon"></div>
              </div>
              <div className="body">
                <div className="student-info">
                  <div className="name">??????????: {this.state.studentName}</div>
                  <div className="major">????????????: {this.state.major}</div>
                  <div className="state">??????????????: {this.state.state}</div>
                  <div className="school">??????????????: {this.state.school}</div>
                </div>

                <div className="degrees-table">
                  <div className="details">
                    <div className="column title">????????????</div>
                    <div className="column title">????????????</div>
                    {this.state.degrees}
                  </div>
                  <div className="final">
                    <div className="column">???????????? ????????????</div>
                    <div className="column">{this.state.fullDegree}%</div>
                  </div>
                </div>

                <div className="statistics">{this.state.statistics}</div>
              </div>
            </div>
            <div className="warning">
              ???? ?????????? ???? ?????????? ???? ?????? ???? ?????? ?????????????? ????????????
            </div>
          </div>
        </div>
      );
    }
  }
);
