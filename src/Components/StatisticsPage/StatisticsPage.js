import React, { Component } from "react";
import GenderStatisticBox from "../GenderStatisticBox/GenderStatisticBox";
import Header from "../Header/Header";
import PageName from "../PageName/PageName";
import CustomList from "../CustomList/CustomList";
import SubjectStatistic from "../SubjectStatistic/SubjectStatistic";
import "./StatisticsPage.css";
import { connect } from "react-redux";
import fadeOutLoading from "../../Functions/fadeOutLoading";

const fetchData = (data) => ({
  students: data.students.students,
  subjects: data.subjects.subjects,
  degrees: data.degrees.degrees,
});

export default connect(fetchData)(
  class StatisticsPage extends Component {
    nothing = (
      <div key={"nothing"} className="nothing">
        لا يمكن بناء الإحصائيات لعدم توفر المعلومات الكافية، تأكد من توفر بيانات
        الطلاب والمواد ودرجات الطلاب.
      </div>
    );

    state = {
      students: [],
      template: [this.nothing],
      finallyDegrees: [0, 0, 0],
    };

    computedMidiumForSubjects = (ev, state = "الكل") => {
      let studentsList =
          state !== "الكل"
            ? this.props.students.filter((student) => student.state === state)
            : this.props.students,
        males = [],
        females = [],
        degrees = [],
        finalStatistics = [0, 0, 0],
        tableTemplate = [];

      if (studentsList.length) {
        studentsList.map((i) => {
          i.gender === "ذكر" ? males.push(i.ssn) : females.push(i.ssn);

          return 0;
        });

        this.props.subjects.map((i) => {
          let finalMalesDegree = 0,
            malesNumber = 0,
            finalFemalesDegree = 0,
            femalesNumber = 0;
          degrees.push([i.name]);

          males.map((j) => {
            let studentDegrees = this.props.degrees.filter(
              (degree) => degree.ssn === j
            )[0];

            if (studentDegrees) {
              let theDegree = studentDegrees.degrees.filter(
                (degree) => degree[0] === i.id
              )[0];

              if (theDegree) {
                finalMalesDegree += theDegree[1];
                malesNumber++;
              }
            }

            return 0;
          });

          females.map((j) => {
            let studentDegrees = this.props.degrees.filter(
              (degree) => degree.ssn === j
            )[0];

            if (studentDegrees) {
              let theDegree = studentDegrees.degrees.filter(
                (degree) => degree[0] === i.id
              )[0];

              if (theDegree) {
                finalFemalesDegree += theDegree[1];
                femalesNumber++;
              }
            }

            return 0;
          });

          degrees[degrees.length - 1].push(
            finalMalesDegree ? (finalMalesDegree / malesNumber).toFixed(2) : 0
          );
          degrees[degrees.length - 1].push(
            finalFemalesDegree
              ? (finalFemalesDegree / femalesNumber).toFixed(2)
              : 0
          );

          let bothDegree = 0;

          if (finalMalesDegree && finalFemalesDegree) {
            bothDegree = (
              (parseFloat(degrees[degrees.length - 1][1]) +
                parseFloat(degrees[degrees.length - 1][2])) /
              2
            ).toFixed(2);
          } else if (finalMalesDegree && !finalFemalesDegree) {
            bothDegree = parseFloat(degrees[degrees.length - 1][1]);
          } else if (!finalMalesDegree && finalFemalesDegree) {
            bothDegree = parseFloat(degrees[degrees.length - 1][2]);
          } else {
            bothDegree = 0;
          }
          degrees[degrees.length - 1].push(bothDegree);

          return 0;
        });

        degrees.map((i) => {
          finalStatistics[0] += parseFloat(i[1]);
          finalStatistics[1] += parseFloat(i[2]);
          finalStatistics[2] += parseFloat(i[3]);

          tableTemplate.push(
            <SubjectStatistic
              key={"Subject_" + state + "_" + i[0]}
              subject={i[0]}
              male={i[1]}
              female={i[2]}
              all={i[3]}
            />
          );

          return 0;
        });

        finalStatistics[0] = (finalStatistics[0] / degrees.length).toFixed(2);
        finalStatistics[1] = (finalStatistics[1] / degrees.length).toFixed(2);
        finalStatistics[2] = (finalStatistics[2] / degrees.length).toFixed(2);
      } else {
        tableTemplate.push(
          <div key={"nothing"} className="nothing">
            لا توجد إحصائيات لعرضها هنا لعدم وجود الدرجات.
          </div>
        );
      }

      this.setState({
        template: (
          <div className="subjects-statistics">
            <div className="title">نسبة النجاح بالنسبة للمواد</div>
            <div className="statistics-table">
              <div className="table-head">المواد</div>
              <div className="table-head">الإحصائيات</div>
              <div className="table-head">النسبة المئوية</div>
              <CustomList
                className={"states"}
                list={"states"}
                all={true}
                selecting={this.computedMidiumForSubjects}
              />
              {tableTemplate}
            </div>
            <div className="key-statistics">
              <div className="key">
                <span>الذكور:</span>
                <span className="square"></span>
              </div>
              <div className="key">
                <span>الإناث:</span>
                <span
                  className="square"
                  style={{ "--background": "#EC407A" }}
                ></span>
              </div>
              <div className="key">
                <span>الكل:</span>
                <span
                  className="square"
                  style={{ "--background": "#66BB6A" }}
                ></span>
              </div>
            </div>
          </div>
        ),
        finallyDegrees: [
          finalStatistics[0],
          finalStatistics[1],
          finalStatistics[2],
        ],
      });

      setTimeout(() => {
        fadeOutLoading();
      }, 0);
    };

    componentDidUpdate(nextProps) {
      if (nextProps.students !== this.props.students) {
        this.computedMidiumForSubjects();
      }
    }

    componentDidMount() {
      if (this.props.students.length) {
        this.computedMidiumForSubjects();
      }
    }

    render() {
      return (
        <div className="statistics-page">
          <Header />
          <div className="container">
            <PageName name={"الإحصائيات"} backTo={"/admin-page"} />

            {this.state.template}

            <div className="gender-statistics">
              <div className="title">نسبة النجاح بالنسبة للطلاب</div>
              <div className="statistics">
                <GenderStatisticBox
                  gender={"ذكور"}
                  color={"#29B6F6"}
                  degree={this.state.finallyDegrees[0]}
                />
                <GenderStatisticBox
                  gender={"إناث"}
                  color={"#EC407A"}
                  degree={this.state.finallyDegrees[1]}
                />
                <GenderStatisticBox
                  gender={"الكل"}
                  color={"#66BB6A"}
                  degree={this.state.finallyDegrees[2]}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);
