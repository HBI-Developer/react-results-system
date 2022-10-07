import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import fadeInLoading from "../../../Functions/fadeInLoading";
import PageName from "../../PageName/PageName";

const fetchData = (data) => ({
  students: data.students.students,
  subjects: data.subjects.subjects,
  degrees: data.degrees.degrees
});

export default connect(fetchData)(class DegreesTable extends Component {
  state = {
    template: [],
    fullDegree: 0,
    studentName: ''
  }

  table = () => {
    let studentInfo = this.props.students.filter(student => student.ssn === this.props.ssn)[0],
      degrees = this.props.degrees.filter(degree => degree.ssn === this.props.ssn)[0],
      degreesTemplate = [],
      fullDegree = 0;

    this.props.subjects.map(i => {
      degrees.degrees.map(j => {
        if (i.id === j[0]) {
          degreesTemplate.push(
            <Fragment key={"DT_" + i.id}>
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

    fullDegree = (fullDegree / degrees.degrees.length).toFixed(2);
    
    this.setState({
      studentName: studentInfo.name,
      template: degreesTemplate,
      fullDegree
    })

  }

  componentDidMount() {
    this.table();
  }

  render() {
    return (
      <Fragment>
        <PageName name={`الطالب: ${this.state.studentName}`} arrow={"hidden"} />

        <div className="degrees-table">
          <div className="table-head">الدرجات</div>
          <div className="degrees">
            <div className="details">
              <div className="column title">المادة</div>
              <div className="column title">الدرجة</div>
              {this.state.template}
            </div>
            <div className="final">
              <div className="column title">الدرجة الكلية</div>
              <div className="column title">{this.state.fullDegree}%</div>
            </div>
          </div>
          <div className="print-button" onClick={() => fadeInLoading('certificate')}>
            <div className="icon print-icon"></div>
          </div>
        </div>
      </Fragment>
    );
  }
})
