import React, { Component, Fragment } from "react";

export default class Finals extends Component {
  render() {
    return (
      <Fragment>
        <div className="student">{this.props.info.name}</div>
        <div className="degree">{this.props.info.degree}%</div>
      </Fragment>
    );
  }
}
