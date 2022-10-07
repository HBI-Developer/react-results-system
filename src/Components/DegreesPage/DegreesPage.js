import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import CustomList from "../CustomList/CustomList";
import Header from "../Header/Header";
import PageName from "../PageName/PageName";
import TablesPagination from "../TablesPagination/TablesPagination";
import Details from "./Details/Details";
import Finals from "./Finals/Finals";
import {
  addDegrees,
  editDegrees,
  removeDegrees,
} from "../../Redux/Slices/degreesSlice";
import NumberInput from "../NumberInput/NumberInput";
import clearInputs from "../../Functions/clearInputs";
import checkFromInputs from "../../Functions/checkFromInputs";
import $ from "jquery";

import "./DegreesPage.css";
import fadeOutLoading from "../../Functions/fadeOutLoading";

const fetchData = (data) => ({
  students: data.students.students,
  subjects: data.subjects.subjects,
  degrees: data.degrees.degrees,
});

const dataOperation = { addDegrees, editDegrees, removeDegrees };

export default connect(
  fetchData,
  dataOperation
)(
  class DegreesPage extends Component {
    nothing = () => {
      return (
        <div key={Math.random() * 999999} className="nothing">
          لا توجد درجات مسجلة حتى الآن.
        </div>
      );
    };

    nothing2 = () => {
      return (
        <div key={Math.random() * 999999} className="degrees">
          <div className="nothing">
            لقد تم وضع الدرجات لجميع الطلاب المسجلين في النظام حتى الآن
          </div>
        </div>
      );
    };

    state = {
      detailsLimit: 20,
      finalLimit: 20,
      detailsPage: 1,
      finalPage: 1,
      detailsItems: 0,
      finalItems: 0,
      detailsState: "الكل",
      finalState: "الكل",
      addingStudent: 0,
      studentsWithoutDegreesList: [],
      detailsTemplate: [this.nothing()],
      finalTemplate: [this.nothing()],
      currentStudent: 0,
      degreesTemplate: [this.nothing2()],
    };

    updateStudentWithoutDegrees = (ev, na) => {
      let ssn = +$(ev.target).attr("datatype"),
        major = this.props.students.filter((student) => student.ssn === ssn)[0]
          .major,
        degreesTemplate = [];

      this.props.subjects.map((i) => {
        if (i.major === "مشترك" || i.major === major) {
          degreesTemplate.push(
            <Fragment key={i.id}>
              <div className="label" data-id={i.id}>
                {i.name}
              </div>
              <NumberInput
                className={"theDegree"}
                min={0}
                max={100}
                data-id={i.id}
                bluring={this.blur}
              />
              <div className="error">لا يمكنك ترك هذا الحقل فارغاً.</div>
            </Fragment>
          );
        }

        return 0;
      });

      this.setState({
        addingStudent: ssn,
        degreesTemplate: (
          <div className="inputs" key={Math.random() * 999999}>
            <div className="degrees">{degreesTemplate}</div>
          </div>
        ),
      });
    };

    studentsWithoutDegrees = () => {
      let students = [],
        listTemplate = [],
        degreesTemplate = [];

      this.props.students.map((i) => {
        let isNotExists = 1;
        this.props.degrees.map((j) => {
          if (i.ssn === j.ssn) {
            isNotExists = 0;
          }

          return 0;
        });

        if (isNotExists) {
          students.push(i);
        }

        return 0;
      });

      if (students.length) {
        for (let i = 0; i < students.length; i++) {
          listTemplate.push([students[i].name, students[i].ssn]);
        }

        this.props.subjects.map((i) => {
          if (i.major === "مشترك" || i.major === students[0].major) {
            degreesTemplate.push(
              <Fragment key={i.id}>
                <div className="label" data-id={i.id}>
                  {i.name}
                </div>
                <NumberInput
                  className={"theDegree"}
                  min={0}
                  max={100}
                  bluring={this.blur}
                />
                <div className="error">لا يمكنك ترك هذا الحقل فارغاً.</div>
              </Fragment>
            );
          }

          return 0;
        });

        this.setState({
          addingStudent: students[0].ssn,
          degreesTemplate: (
            <div className="inputs" key={Math.random() * 999999}>
              <div className="degrees">{degreesTemplate}</div>
            </div>
          ),
          studentsWithoutDegreesList: (
            <Fragment>
              <CustomList
                className={"students"}
                list={"custom"}
                items={listTemplate}
                selected={students[0].name}
                selecting={this.updateStudentWithoutDegrees}
              />
            </Fragment>
          ),
        });

        setTimeout(() => {
          fadeOutLoading();
        }, 0);
      } else {
        this.setState({
          degreesTemplate: [this.nothing2()],
        });

        setTimeout(() => {
          fadeOutLoading();
        }, 0);
      }
    };

    blur = (ev) => {
      if (+ev.target.value > +ev.target.max) {
        ev.target.value = +ev.target.max;
      } else if (+ev.target.value < +ev.target.min) {
        ev.target.value = +ev.target.min;
      }
    };

    template = (type = "details", state = "الكل", page = 1) => {
      let stateStudents =
          state !== "الكل"
            ? this.props.students.filter((student) => student.state === state)
            : this.props.students,
        template = [];

      if (type === "details") {
        if (stateStudents.length) {
          let ssn = [],
            degree = [];
          stateStudents.map((i) => ssn.push(i.ssn));

          this.props.degrees.map((i) => {
            let degrees = [],
              studentName = this.props.students.filter(
                (s) => s.ssn === i.ssn
              )[0].name,
              isState = state === "الكل" ? 1 : 0;

            this.props.students.map((s) => {
              if (s.ssn === i.ssn && s.state === state) {
                isState = 1;
              }

              return 0;
            });

            if (isState) {
              i.degrees.map((j) => {
                let subjectName = this.props.subjects.filter(
                  (s) => s.id === j[0]
                )[0].name;
                degrees.push({ id: j[0], name: subjectName, degree: j[1] });

                return 0;
              });
              degree.push({ ssn: i.ssn, name: studentName, degrees });
            }

            return 0;
          });

          degree.sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            }

            return -1;
          });

          this.setState({
            detailsItems: degree.length,
          });

          for (let i = this.state.detailsLimit * (page - 1); ; i++) {
            if (i === this.state.detailsLimit * page || i === degree.length) {
              break;
            }

            template.push(
              <Details
                key={"from_details_" + i}
                info={degree[i]}
                opening={this.opening}
                editing={this.editing}
                removing={this.removing}
              />
            );
          }

          setTimeout(() => {
            this.setState({
              detailsTemplate: template,
            });
          }, 0);
        } else {
          this.setState({
            detailsTemplate: [this.nothing()],
          });
        }
      } else {
        if (stateStudents.length) {
          let finalInfo = [],
            finalTemplate = [];

          stateStudents.map((i) => {
            this.props.degrees.map((j) => {
              if (i.ssn === j.ssn) {
                let sum = 0;
                j.degrees.map((k) => (sum += k[1]));

                sum = (sum / j.degrees.length).toFixed(2);

                finalInfo.push({ name: i.name, degree: sum });
              }

              return 0;
            });

            return 0;
          });

          this.setState({
            finalItems: finalInfo.length,
          });

          for (let i = this.state.finalLimit * (page - 1); ; i++) {
            if (i === this.state.finalLimit * page || i === finalInfo.length) {
              break;
            }

            finalTemplate.push(
              <Finals key={"from_final_" + i} info={finalInfo[i]} />
            );
          }

          setTimeout(() => {
            this.setState({
              finalTemplate,
            });
          }, 0);
        } else {
          this.setState({
            finalTemplate: [this.nothing()],
          });
        }
      }
    };

    opening = (ev) => {
      $(ev.target)
        .parent()
        .siblings(".info")
        .slideToggle()
        .css("display", "grid")
        .parent()
        .toggleClass("open")
        .parent()
        .siblings(".details")
        .children(".student")
        .removeClass("open")
        .children(".info")
        .slideUp();
    };

    updatePagination = (ev, action) => {
      if (!$(ev.target).hasClass("disabled")) {
        let currentPage = $(ev.target).parents(".final-degrees").length
            ? this.state.finalPage
            : this.state.detailsPage,
          maxLength = $(ev.target).parents(".final-degrees").length
            ? Math.ceil(this.state.finalItems / this.state.finalLimit)
            : Math.ceil(this.state.detailsItems / this.state.detailsLimit),
          type = $(ev.target).parents(".final-degrees").length
            ? "final"
            : "details",
          state = $(ev.target).parents(".final-degrees").length
            ? this.state.finalState
            : this.state.detailsState;

        switch (action) {
          case "prev": {
            if (currentPage > 1) {
              currentPage -= 1;
            } else {
              currentPage = 1;
            }
            break;
          }

          case "next": {
            if (currentPage < maxLength) {
              currentPage += 1;
            } else {
              currentPage = maxLength;
            }
            break;
          }

          case "write": {
            let value = ev.target.value;
            if (value === "") {
              ev.target.value = currentPage;
            } else if (value < 1) {
              currentPage = 1;
            } else if (value > maxLength) {
              currentPage = maxLength;
            } else {
              currentPage = value;
            }
            break;
          }

          default: {
            currentPage = 1;
          }
        }

        if ($(ev.target).parents(".final-degrees").length) {
          this.setState({
            finalPage: currentPage,
          });
        } else {
          this.setState({
            detailsPage: currentPage,
          });
        }

        setTimeout(() => {
          this.template(type, state, currentPage);
        });
      }
    };

    changeState = (ev, st) => {
      let type = $(ev.target).parents(".final-degrees").length
        ? "final"
        : "details";

      this.template(type, st);

      if (type === "final") {
        this.setState({
          finalPage: 1,
          finalState: st,
        });
      } else {
        this.setState({
          detailsPage: 1,
          detailsState: st,
        });
      }
    };

    addNewDegrees = () => {
      clearInputs();
      checkFromInputs();

      if (!$(".inputs .error[style]").length) {
        let degrees = [];

        $(".inputs .theDegree").map(function () {
          degrees.push([+$(this).prev().attr("data-id"), +$(this).val()]);

          return 0;
        });

        this.props.addDegrees({ ssn: this.state.addingStudent, degrees });

        this.setState({
          addingStudent: 0,
        });

        setTimeout(() => {
          clearInputs(1);
          $(".cover").fadeOut();
          this.studentsWithoutDegrees();
        }, 0);
      }
    };

    editing = (ssn) => {
      this.setState({
        currentStudent: ssn,
      });

      let student = this.props.degrees.filter((d) => d.ssn === ssn)[0],
        studentName = this.props.students.filter((s) => s.ssn === ssn)[0].name,
        degreesTemplate = [];
      $(".cover .add-degree .students").addClass("disabled");
      $(".cover .add-degree .students .selected .name").text(studentName);

      student.degrees.map((h) => {
        this.props.subjects.map((i) => {
          if (h[0] === i.id) {
            degreesTemplate.push(
              <Fragment key={i.id}>
                <div className="label" data-id={i.id}>
                  {i.name}
                </div>
                <NumberInput
                  className={"theDegree"}
                  min={0}
                  max={100}
                  bluring={this.blur}
                  default={h[1]}
                />
                <div className="error">لا يمكنك ترك هذا الحقل فارغاً.</div>
              </Fragment>
            );
          }
          return 0;
        });

        return 0;
      });

      this.setState({
        degreesTemplate: (
          <div className="inputs" key={Math.random() * 999999}>
            <div className="degrees">{degreesTemplate}</div>
          </div>
        ),
      });

      setTimeout(() => {
        $(".cover").fadeIn();
      }, 0);
    };

    editNow = () => {
      clearInputs();
      checkFromInputs();

      if (!$(".inputs .error[style]").length) {
        let degrees = [];

        $(".inputs .theDegree").map(function () {
          degrees.push([+$(this).prev().attr("data-id"), +$(this).val()]);

          return 0;
        });

        this.props.editDegrees({ ssn: this.state.currentStudent, degrees });

        this.setState({
          addingStudent: 0,
          currentStudent: 0,
          detailsTemplate: [],
        });

        setTimeout(() => {
          this.template();
          this.clearEdit();
        }, 0);
      }
    };

    clearEdit = () => {
      $(".cover").fadeOut(400, () => {
        clearInputs(1);
        this.setState({
          currentStudent: 0,
          addingStudent: 0,
        });
        $(".cover .add-degree .students").removeClass("disabled");

        setTimeout(() => {
          this.studentsWithoutDegrees();
        }, 0);
      });
    };

    removing = (ssn) => {
      this.setState({
        currentStudent: ssn,
      });

      $(".confirm").fadeIn();
    };

    removeNow = () => {
      this.props.removeDegrees(this.state.currentStudent);
      $(".confirm").fadeOut();
      this.setState({
        currentStudent: 0,
      });

      this.setState({
        addingStudent: 0,
      });

      setTimeout(() => {
        this.template();
        this.studentsWithoutDegrees();
      }, 0);
    };

    componentDidUpdate(nextProps) {
      if (nextProps.degrees !== this.props.degrees) {
        this.template("details");
        this.template("final");
        this.studentsWithoutDegrees();
      }
    }

    componentDidMount() {
      if (this.props.degrees.length) {
        this.template("details");
        this.template("final");
        this.studentsWithoutDegrees();
      }
    }
    render() {
      return (
        <div className="degrees-page">
          <Header />
          <div className="container">
            <PageName name={"الدرجات"} backTo={'admin-page'} />

            <div
              className="details-degrees"
              key={"details_" + this.state.detailsTemplate.length}
            >
              <div className="table-head">الدرجات بالتفصيل</div>
              <CustomList
                key={"DS_" + this.state.detailsState}
                className={"states"}
                list={"states"}
                all={true}
                selected={this.state.detailsState}
                selecting={this.changeState}
              />
              {this.state.detailsTemplate}
              <div
                className="add"
                onClick={() =>
                  $(".confirm").css("display") === "none"
                    ? $(".cover").fadeIn()
                    : ""
                }
              >
                {"+"}
              </div>
              <TablesPagination
                key={"DP_" + this.state.detailsPage}
                items={this.state.detailsItems}
                limit={this.state.detailsLimit}
                current={this.state.detailsPage}
                min={1}
                clicking={this.updatePagination}
              />
              <div className="wait-table">
                <div className="circle"></div>
              </div>
            </div>
            <div
              className="final-degrees"
              key={"final_" + this.state.finalTemplate.length}
            >
              <div className="table-head">درجات الطلاب</div>
              <CustomList
                key={"FS_" + this.state.finalState}
                className={"states"}
                list={"states"}
                all={true}
                selected={this.state.finalState}
                selecting={this.changeState}
              />
              <div className="degrees">{this.state.finalTemplate}</div>
              <TablesPagination
                key={"FP_" + this.state.finalPage}
                items={this.state.finalItems}
                limit={this.state.finalLimit}
                current={this.state.finalPage}
                min={1}
                clicking={this.updatePagination}
              />
              <div className="wait-table">
                <div className="circle"></div>
              </div>
            </div>
            <div className="confirm">
              <div className="head">هل أنت متأكد؟</div>
              <div className="body">
                <div className="message">
                  هل أنت متأكد من أنك تريد حذف هذا الطالب من النظام؟
                </div>
                <div className="buttons">
                  <div className="yes" onClick={this.removeNow}>
                    نعم
                  </div>
                  <div
                    className="no"
                    onClick={() => {
                      $(".confirm").fadeOut();
                      this.setState({ currentStudent: 0 });
                    }}
                  >
                    لا
                  </div>
                </div>
              </div>
            </div>
            <div className="cover">
              <div
                className="add-degree"
                key={"AD_" + this.state.addingStudent}
              >
                <div className="table-head">أضف درجات طالب</div>
                {this.state.studentsWithoutDegreesList}
                {this.state.degreesTemplate}
                <div className="buttons">
                  <div
                    className="send"
                    onClick={() =>
                      this.state.currentStudent
                        ? this.editNow()
                        : this.addNewDegrees()
                    }
                  >
                    <p>إرسال البيانات</p>
                    <div className="dots">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
                  </div>
                  <div
                    className="cancel"
                    onClick={() =>
                      this.state.currentStudent
                        ? this.clearEdit()
                        : $(".cover").fadeOut()
                    }
                  >
                    إلغاء الأمر
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);
