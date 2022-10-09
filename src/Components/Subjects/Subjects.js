import React, { Component } from "react";
import Header from "../Header/Header";
import PageName from "../PageName/PageName";
import CustomList from "../CustomList/CustomList";
import Subject from "./Subject/Subject";
import { connect } from "react-redux";
import {
  addSubject,
  editSubject,
  removeSubject,
} from "../../Redux/Slices/subjectsSlice";
import {
  addDegree,
  editDegree,
  removeDegree,
} from "../../Redux/Slices/degreesSlice";
import $ from "jquery";
import checkFromInputs from "../../Functions/checkFromInputs";
import clearInputs from "../../Functions/clearInputs";

import "./Subjects.css";
import fadeOutLoading from "../../Functions/fadeOutLoading";

const fetchData = (data) => ({
  students: data.students.students,
  subjects: data.subjects.subjects,
  degrees: data.degrees.degrees,
});

const dataOperations = {
  addSubject,
  editSubject,
  removeSubject,
  addDegree,
  editDegree,
  removeDegree,
};

const defaultMajor = "مشترك";

export default connect(
  fetchData,
  dataOperations
)(
  class Subjects extends Component {
    nothing = (
      <div key={"nothing"} className="nothing">
        لا توجد أي مواد مضافة حتى الآن.
      </div>
    );

    state = {
      template: [this.nothing],
      currentSubject: 0,
      currentMajor: defaultMajor,
    };

    updateTemplate = (_) => {
      let template = [];

      if (this.props.subjects !== [0]) {
        this.props.subjects.map((i) => {
          template.push(
            <Subject
              key={"subject_" + i.id}
              confirm={() => {
                $(".confirm").fadeIn();
                this.setState({ currentSubject: i.id });
              }}
              editing={() => {
                this.setState({ currentSubject: i.id });
                this.editing();
              }}
              info={i}
            />
          );
          return 0;
        });
      } else {
        template = [this.nothing];
      }

      this.setState({
        template,
      });

      setTimeout(() => {
        fadeOutLoading();
      }, 0);
    };

    addNewSubject = () => {
      clearInputs();
      checkFromInputs();

      if (!$(".inputs .error[style]").length) {
        let id = 0,
          name = $(".inputs .subject").val().trim(),
          major = $(".inputs .majors .selected .name").text().trim();

        this.props.subjects.map((i) => (id = id > i.id ? id : i.id));

        id++;

        if (
          !this.props.subjects.filter(
            (subject) => subject.name === name && subject.major === major
          ).length
        ) {
          this.props.addSubject({ id, name, major });

          if (major === "مشترك") {
            this.props.addDegree({ major: "مشترك", id });
          } else {
            let students = [];

            this.props.students.map((i) =>
              i.major === major ? students.push(i.ssn) : ""
            );

            this.props.addDegree({ major: students, id });
          }

          this.setState({
            currentMajor: major,
          });

          setTimeout(() => {
            $(".cover").fadeOut(400, () => {
              clearInputs(1);
              this.setState({
                currentMajor: defaultMajor,
              });
            });
          });
        } else {
          $(".inputs .subject").css("border-color", "#f44336");
          $(".inputs .subject")
            .next()
            .text("هذه المادة بهذا التخصص موجودةٌ سلفاً.")
            .css("display", "block");
        }

        id++;
      }
    };

    editing = () => {
      setTimeout(() => {
        let subject = this.props.subjects.filter(
          (subject) => subject.id === this.state.currentSubject
        )[0];

        $(".inputs .subject").val(subject.name);

        this.setState({
          currentMajor: subject.major,
        });

        setTimeout(() => {
          $(".cover").fadeIn();
        }, 0);
      }, 0);
    };

    editNow = () => {
      clearInputs();
      checkFromInputs();

      if (!$(".inputs .error[style]").length) {
        let subject = this.props.subjects.filter(
            (subject) => subject.id === this.state.currentSubject
          )[0],
          name = $(".inputs .subject").val().trim(),
          major = $(".inputs .majors .selected .name").text().trim();

        if (
          this.props.subjects.filter(
            (subject) =>
              subject.name === name &&
              subject.major === major &&
              subject.id !== this.state.currentSubject
          ).length
        ) {
          $(".inputs .subject").css("border-color", "#f44336");
          $(".inputs .subject")
            .next()
            .text("هذه المادة بهذا التخصص موجودةٌ سلفاً.")
            .css("display", "block");
        } else if (
          this.props.subjects.filter(
            (subject) =>
              subject.name === name &&
              subject.major === major &&
              subject.id === this.state.currentSubject
          ).length
        ) {
          this.clearEdit();
        } else {
          this.props.editSubject({ id: subject.id, name, major });
          if (subject.major !== major) {
            if (major === "مشترك") {
              this.props.editDegree(this.state.currentSubject);
            } else {
              if (subject.major === "مشترك") {
                let student = [];
                this.props.students.map((i) =>
                  i.major === major ? student.push(i.ssn) : ""
                );
                this.props.removeDegree({
                  id: this.state.currentSubject,
                  ssn: student,
                });
              } else {
                let students = [];
                this.props.students.map((i) =>
                  i.major === major ? students.push(i.ssn) : ""
                );
                this.props.removeDegree(this.state.currentSubject);
                this.props.addDegree({
                  id: this.state.currentSubject,
                  major: students,
                });
              }
            }
          }

          this.clearEdit();
        }
      }
    };

    clearEdit = () => {
      $(".cover").fadeOut(400, () => {
        clearInputs(1);
        this.setState({
          currentMajor: "محايد",
        });

        this.setState({
          currentMajor: defaultMajor,
        });
      });
    };

    removeSubject = () => {
      this.props.removeSubject(this.state.currentSubject);
      this.props.removeDegree(this.state.currentSubject);

      setTimeout(() => {
        $(".confirm").fadeOut();
        this.setState({
          currentSubject: 0,
        });
      }, 0);
    };

    componentDidUpdate(nextProps) {
      if (nextProps.subjects !== this.props.subjects) {
        this.updateTemplate();
      }
    }

    componentDidMount() {
      if (this.props.subjects.length) {
        this.updateTemplate();
      }
    }

    render() {
      return (
        <div className="subjects-page">
          <Header />
          <div className="container">
            <PageName name={"المواد الدراسية"} backTo={"/admin-page"} />

            <div className="subjects-table">
              <div className="table-head">المواد الدراسية</div>
              <div className="column title">
                <div className="subject">المادة</div>
                <div className="major">التخصص</div>
              </div>
              {this.state.template}
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
              <div className="footer-table"></div>
              <div className="wait-table">
                <div className="circle">
                  <div className="cover-circle"></div>
                </div>
              </div>
              <div className="confirm">
                <div className="head">هل أنت متأكد؟</div>
                <div className="body">
                  <div className="message">
                    هل أنت متأكد من أنك تريد حذف هذه المادة من النظام؟
                  </div>
                  <div className="buttons">
                    <div className="yes" onClick={this.removeSubject}>
                      نعم
                    </div>
                    <div
                      className="no"
                      onClick={() => {
                        $(".confirm").fadeOut();
                        this.setState({ currentSubject: 0 });
                      }}
                    >
                      لا
                    </div>
                  </div>
                </div>
              </div>
              <div className="cover">
                <div className="add-subject">
                  <div className="table-head">أضف مادة</div>
                  <div className="inputs">
                    <div className="label">المادة</div>
                    <input type="text" className="subject" />
                    <div className="error">لا يمكنك ترك هذا الحقل فارغاً.</div>
                    <div className="label">التخصص</div>
                    <CustomList
                      key={"5" + this.state.currentMajor}
                      className={"majors"}
                      selected={this.state.currentMajor}
                      list={"majors"}
                      all={true}
                    />
                  </div>
                  <div className="buttons">
                    <div
                      className="send"
                      onClick={() =>
                        this.state.currentSubject
                          ? this.editNow()
                          : this.addNewSubject()
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
                        this.state.currentSubject
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
        </div>
      );
    }
  }
);
