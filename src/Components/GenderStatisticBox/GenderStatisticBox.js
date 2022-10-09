import React, { Component } from "react";
import "./GenderStatisticBox.css";

export default class GenderStatisticBox extends Component {
  render() {
    return (
      <div className="statistic-box">
        <div className="gender">{this.props.gender}</div>
        <div className="percentage">
          <div
            className="circle"
            style={{ "--gradient-color": this.props.color }}
          ></div>
          <div className="small-circle">{`${this.props.degree}%`}</div>
          <div
            className="cover-one"
            style={{ "--degree": `${(this.props.degree / 100) * 360}deg` }}
          ></div>
          <div className="cover-two"></div>
        </div>
      </div>
    );
  }
}
