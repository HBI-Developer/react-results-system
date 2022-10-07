import React, { Component } from "react";
import { connect } from "react-redux";
import CustomList from "../CustomList/CustomList";
import Header from "../Header/Header";
import PageName from "../PageName/PageName";
import TablesPagination from "../TablesPagination/TablesPagination";
import Student from "./Student/Student";
import $ from 'jquery';
import { addStudent, editStudent, removeStudent } from "../../Redux/Slices/studentsSlice";
import { editDegrees, removeDegrees } from "../../Redux/Slices/degreesSlice";
import NumberInput from "../NumberInput/NumberInput";
import clearInputs from "../../Functions/clearInputs";
import checkFromInputs from "../../Functions/checkFromInputs";

import "./StudentsPage.css";
import fadeOutLoading from "../../Functions/fadeOutLoading";


const [defaultGender, defaultState, defaultMajor] = ["ذكر", "الخرطوم", "علمي"];

const fetchData = (data) => ({
  students: data.students.students,
  subjects: data.subjects.subjects,
  degrees: data.degrees.degrees
});

const infoOperaions = {addStudent, editStudent, removeStudent, editDegrees, removeDegrees}

export default connect(fetchData, infoOperaions)(class StudentsPage extends Component {
  state = {
    template: [],
    students: [],
    page: 1,
    limit: 20,
    currentGenetalState: 'الكل',
    currentStudent: 0,
    currentGender: defaultGender,
    currentState: defaultState,
    currentMajor: defaultMajor
  }
  nothing = (
    <div className="nothing" key={'nothing'}>
      <div className="message">لا يوجد أي طلاب مسجلين حتى الآن</div>
    </div>
  );

  createTable = () => {
    if (this.props.students.length) {
      this.setState({
        students: this.props.students
      });

      setTimeout(() => {
        let temp = [];
        for (let i = 0; ; i++) {

          if (i >= this.state.limit || i === this.state.students.length - 1) {
            break;
          }

          temp.push(<Student key={"student_" + i} clicking={this.expendedStudent} removing={this.removeStudentFromSystem} editing={this.editPanel} info={this.state.students[i]} />);
        }

        this.setState({
          template: temp
        });

        setTimeout(() => {
          fadeOutLoading();
        }, 0);
      }, 0);

    } else {
      this.setState({
        template: [this.nothing]
      });

      setTimeout(() => {
        fadeOutLoading();
      }, 0);
    }
  }

  updateStudentsTable = (ev, action) => {
    if (ev.target.classList.value.indexOf('disabled') === -1) {
      let page = this.state.page,
        temp = [];
      $(".wait-table").fadeIn();
      $(".wait-table").css("display", "flex");
      if (action === "prev") {
        page--;
      } else if (action === 'next') {
        page++;
      } else if (action === 'write') {
        let val = +ev.target.value,
          maxVal = Math.ceil(this.state.students.length / this.state.limit);
        if (ev.target.value === '') {
          ev.target.value = page;
        }else if (val < 1) {
          page = 1;
          ev.target.value = 1;
        } else if (val > maxVal) {
          page = maxVal;
          ev.target.value = maxVal;
        } else {
          page = val;
        }
      }

      for (let i = (this.state.limit * (page - 1)); ; i++) {

        if (i >= this.state.limit * page || i === this.state.students.length) {
          break;
        }

        temp.push(<Student key={"student_" + i} clicking={this.expendedStudent} removing={this.removeStudentFromSystem} editing={this.editPanel} info={this.state.students[i]} />);
      }

      setTimeout(() => {
        this.setState({
          template: temp,
          page
        });

        setTimeout(() => {
          $(".wait-table").fadeOut();
        }, 0);
      }, 0);
    }
  }

  changeState = (ev, st) => {
    let newStudents = (st !== 'الكل') ? this.props.students.filter(student => student.state === st) : this.props.students;

    if (newStudents.length) {
      this.setState({
        students: newStudents
      });

      setTimeout(() => {
        let temp = [];
        for (let i = 0; ; i++) {

          if (i >= this.state.limit || i === this.state.students.length) {
            break;
          }

          temp.push(<Student key={"student_" + i} clicking={this.expendedStudent} removing={this.removeStudentFromSystem} editing={this.editPanel} info={this.state.students[i]} />);
        }

        this.setState({
          template: temp
        });
      }, 0);

    } else {
      this.setState({
        template: [this.nothing]
      });
    }

    this.setState({
      page: 1,
      currentGenetalState: st
    });
  }

  expendedStudent = ev => {
    if ($(ev.target).hasClass('open-arrow')) {
      $(ev.target).parent().siblings('.info').slideToggle();
      $(ev.target).parent().siblings('.info').css('display', 'grid');
      $(ev.target).parents('.student').toggleClass('open').siblings('.student').removeClass('open').find('.info').slideUp();
    }
  }

  addNewStudent = _ => {
    clearInputs();
    checkFromInputs();

    let ssn = +$('.inputs .ssn').val(),
        sittingNumber = +$('.inputs .sitting-number').val();

    if (ssn && (ssn < 1000000000 || ssn > 9999999999)) {
      $('.inputs .ssn').css('border-color', '#f44336').next().text('يجب أن يكون الرقم الوطني مكون من 10 أرقام فقط.').css('display', 'block');
    }

    if (sittingNumber && (sittingNumber < 10000 || sittingNumber > 99999)) {
      $('.inputs .sitting-number').css('border-color', '#f44336').next().text('يجب أن يكون رقم الجلوس مكون من 5 أرقام فقط.').css('display', 'block');
    }

    if (this.props.students.filter(student => student.ssn === ssn).length) {
      $('.inputs .ssn').css('border-color', '#f44336').next().text('هذا الرقم الوطني موجودٌ مسبقاً.').css('display', 'block');
    }

    if (this.props.students.filter(student => student.sittingNumber === sittingNumber).length) {
      $('.inputs .sitting-number').css('border-color', '#f44336').next().text('رقم الجلوس هذا موجودٌ مسبقاً.').css('display', 'block');
    }

    if (!$('.inputs .error[style]').length) {
      let name = `${$('.inputs .first-name').val().trim()} ${$('.inputs .middle-name').val().trim()} ${$('.inputs .last-name').val().trim()}`,
        age = +$('.inputs .age').val(),
        gender = $('.gender .selected .name').text(),
        school = $('.inputs .school').val().trim(),
        state = $('.state .selected .name').text(),
        sittingNumber = $('.inputs .sitting-number').val().trim(),
        major = $('.major .selected .name').text();

      this.props.addStudent({
        name,
        ssn,
        age,
        gender,
        school,
        state,
        sittingNumber,
        major
      });

      setTimeout(() => {
        let choosingState = $('.states .selected .name').text();

        this.changeState(choosingState);

        clearInputs(1);

        this.setState({
          currentGender:  defaultGender,
          currentState: defaultState,
          currentMajor: defaultMajor
        });

      }, 0);
    }
  }

  editPanel = ev => {
    clearInputs();
    let currentStudent = this.props.students.filter(student => student.ssn === +$(ev.target).parents('.info-name').siblings('.info').children(':nth-child(2)').text())[0];

    this.setState({
      currentStudent: currentStudent.ssn,
      currentGender: currentStudent.gender,
      currentState: currentStudent.state,
      currentMajor: currentStudent.major
    });

    $('.cover .inputs .first-name').val(currentStudent.name.split(' ')[0]);
    $('.cover .inputs .middle-name').val(currentStudent.name.split(' ')[1]);
    $('.cover .inputs .last-name').val(currentStudent.name.split(' ')[2]);
    $('.cover .inputs .ssn').val(currentStudent.ssn);
    $('.cover .inputs .ssn').attr('disabled', 'disabled');
    $('.cover .inputs .age').val(currentStudent.age);
    $('.cover .inputs .school').val(currentStudent.school);
    $('.cover .inputs .sitting-number').val(currentStudent.sittingNumber);

    $('.cover').fadeIn();
  }

  clearEdit = _ => {
    this.setState({
      currentStudent: 0,
      currentGender: defaultGender,
      currentState: defaultState,
      currentMajor: defaultMajor
    });

    $('.cover .inputs .ssn').removeAttr('disabled');
    $(".cover").fadeOut(() => {
      clearInputs(1);
    });
  }

  editNow = _ => {
    clearInputs();
    checkFromInputs();

    let studentSittingNumber = this.props.students.filter(student => student.ssn === this.state.currentStudent)[0].sittingNumber,
      sittingNumber = +$('.inputs .sitting-number').val();

    if (sittingNumber && (sittingNumber < 10000 || sittingNumber > 99999)) {
      $('.inputs .sitting-number').css('border-color', '#f44336').next().text('يجب أن يكون رقم الجلوس مكون من 5 أرقام فقط.').css('display', 'block');
    }

    if (this.props.students.filter(student => student.sittingNumber === sittingNumber).length && sittingNumber !== studentSittingNumber) {
      $('.inputs .sitting-number').css('border-color', '#f44336').next().text('رقم الجلوس هذا موجودٌ مسبقاً.').css('display', 'block');
    }

    if (!$('.inputs .error[style]').length) {
      let name = `${$('.inputs .first-name').val().trim()} ${$('.inputs .middle-name').val().trim()} ${$('.inputs .last-name').val().trim()}`,
        age = +$('.inputs .age').val(),
        gender = $('.gender .selected .name').text(),
        school = $('.inputs .school').val().trim(),
        state = $('.state .selected .name').text(),
        major = $('.major .selected .name').text(),
        studentDegrees = [];

      if (major !== this.props.students.filter(student => student.ssn === this.state.currentStudent)[0].major && this.props.degrees.filter(degree => degree.ssn === this.state.currentStudent).length) {
        let subjects = [],
          allowMajors = ['مشترك', major],
          currentStudentDegrees = this.props.degrees.filter(degree => degree.ssn === this.state.currentStudent)[0].degrees;

        subjects = this.props.subjects.filter(subject => allowMajors.indexOf(subject.major) > -1);

        subjects.map(i => {
          let id = i.id,
            degree = currentStudentDegrees.filter(deg => deg[0] === id)[0];

          degree = degree ? degree[1] : 0;

          studentDegrees.push([id, degree]);

          return 0;
        });
      }

      setTimeout(() => {
        this.props.editStudent({
          ssn: this.state.currentStudent,
          name,
          age,
          gender,
          school,
          state,
          sittingNumber,
          major
        });

        if (studentDegrees.length) {
          this.props.editDegrees({
            ssn: this.state.currentStudent,
            degrees: studentDegrees
          });
        }

        setTimeout(() => {
          let choosingState = $('.states .selected .name').text();
          this.changeState(choosingState);
          this.clearEdit();
        }, 0);
      }, 0);
    }
  }

  removeStudentFromSystem = ev => {
    this.setState({
      currentStudent: +$(ev.target).parents('.info-name').siblings('.info').children(':nth-child(2)').text()
    });

    setTimeout(() => {
      $('.confirm').fadeIn();
    }, 0);
  }

  removingNow = _ => {
    this.props.removeStudent(this.state.currentStudent);
    this.props.removeDegrees(this.state.currentStudent);

    setTimeout(() => {
      this.setState({
        currentStudent: 0
      });

      let choosingState = $('.states .selected .name').text();
      this.changeState(choosingState);

      $('.confirm').fadeOut();
    }, 0);
  }

  componentDidUpdate(next) {
    if (next.students !== this.props.students) {
      this.createTable();
    }
  }

  componentDidMount () {
    this.createTable();
  }

  render() {
    return (
      <div className="students-page">
        <Header />
        <div className="container">
          <PageName name={"الطلاب"} backTo={'admin-page'} />
          <div className="students-table" key={'students_' + this.state.page}>
            <div className="table-head">جدول الطلاب</div>
            <CustomList key={'GS_'+ this.state.currentGenetalState} className={'states'} list={"states"} all={true} selected={this.state.currentGenetalState} selecting={this.changeState} />
            {this.state.template}
            <div className="add" onClick={() => $('.confirm').css('display') === 'none' ? $(".cover").fadeIn() : ''}>{"+"}</div>
            <TablesPagination items={this.state.students.length} current={this.state.page} limit={this.state.limit} clicking={this.updateStudentsTable} />
            <div className="wait-table">
              <div className="circle">
                <div className="cover-circle"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="confirm">
          <div className="head">هل أنت متأكد؟</div>
          <div className="body">
            <div className="message">
              هل أنت متأكد من أنك تريد حذف هذا الطالب من النظام؟
            </div>
            <div className="buttons">
              <div className="yes" onClick={this.removingNow}>نعم</div>
              <div className="no" onClick={() => {$('.confirm').fadeOut(); this.setState({ currentStudent: 0 });}}>لا</div>
            </div>
          </div>
        </div>

        <div className="cover">
          <div className="student-inputs">
            <div className="title">إضافة طالب جديد</div>
            <div className="inputs">
              <div className="label">الاسم الأول</div>
              <input type="text" className="first-name" />
              <div className="error">لا يمكنك ترك هذا الحقل فارغاً.</div>
              <div className="label">الاسم الأوسط</div>
              <input type="text" className="middle-name" />
              <div className="error">لا يمكنك ترك هذا الحقل فارغاً.</div>
              <div className="label">الاسم الأخير</div>
              <input type="text" className="last-name" />
              <div className="error">لا يمكنك ترك هذا الحقل فارغاً.</div>
              <div className="label">الرقم الوطني</div>
              <NumberInput className={'ssn'} />
              <div className="error">لا يمكنك ترك هذا الحقل فارغاً.</div>
              <div className="label">العمر</div>
              <NumberInput className={'age'} />
              <div className="error">لا يمكنك ترك هذا الحقل فارغاً.</div>
              <div className="label">الجنس</div>
              <CustomList key={"1" + this.state.currentGender} className={'gender'} selected={this.state.currentGender} list={"genders"} />
              <div className="label">المدرسة</div>
              <input type="text" className="school" />
              <div className="error">لا يمكنك ترك هذا الحقل فارغاً.</div>
              <div className="label">الولاية</div>
              <CustomList key={"2" + this.state.currentState} className={'state'} selected={this.state.currentState} list={"states"} all={false} />
              <div className="label">رقم الجلوس</div>
              <NumberInput className={'sitting-number'} />
              <div className="error">لا يمكنك ترك هذا الحقل فارغاً.</div>
              <div className="label">التخصص</div>
              <CustomList key={"3" + this.state.currentMajor} className={'major'} selected={this.state.currentMajor} list={"majors"} all={false} />
            </div>
            <div className="buttons">
              <div className="send" onClick={() => this.state.currentStudent ? this.editNow() : this.addNewStudent()}>
                <p>إرسال البيانات</p>
                <div className="dots">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>
              <div className="cancel" onClick={() => this.state.currentStudent ? this.clearEdit() : $('.cover').fadeOut()}>إلغاء الأمر</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
})
