import React, { Component, Fragment } from "react";
import "./SubjectStatistic.css";

export default class SubjectStatistic extends Component {
  state = {
    degree: this.props.all,
    degreeType: 'all'
  }

  changeDegree = type => {
    this.setState({
      degree: this.props[type],
      degreeType: type
    });
  }

  render() {
    return (
      <Fragment>
        <div className="subject">{this.props.subject}</div>
        <div className="statistic">
          <div className={`male origin ${this.state.degreeType === 'male' ? 'active' : ''}`} style={{ width: `${this.props.male}%` }} onClick={() => this.changeDegree('male')}></div>
          <div className={`female origin ${this.state.degreeType === 'female' ? 'active' : ''}`} style={{ width: `${this.props.female}%` }} onClick={() => this.changeDegree('female')}></div>
          <div className={`all origin ${this.state.degreeType === 'all' ? 'active' : ''}`} style={{ width: `${this.props.all}%` }} onClick={() => this.changeDegree('all')}></div>
        </div>
        <div className="percentage">{`${this.state.degree}%`}</div>
      </Fragment>
    );
  }
}
