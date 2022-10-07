import React, { Component } from "react";

export default class Details extends Component {
  degrees = [];

  opening = ev => {
    this.props.opening(ev);
  }

  render() {
    for (let i = 0; i < this.props.info.degrees.length; i++) {
      this.degrees.push(
        <div key={this.degrees.length} className="name">
          {this.props.info.degrees[i].name}
        </div>
      );
      this.degrees.push(
        <div key={this.degrees.length} className="value">
          {this.props.info.degrees[i].degree}%
        </div>
      );
    }

    this.degrees.splice(this.props.info.degrees.length * 2);
    return (
      <div className="details">
        <div className="student" data-ssn={this.props.info.ssn}>
          <div className="info-name">
            <div className="open-arrow" onClick={this.opening}>{"<"}</div>
            <div className="title">
              <div className="name">{this.props.info.name}</div>
              <div className="options">
                <div className="edit" onClick={() => this.props.editing(this.props.info.ssn)}>
                  <div className="icon edit-icon"></div>
                </div>
                <div className="delete" onClick={() => this.props.removing(this.props.info.ssn)}>&minus;</div>
              </div>
            </div>
          </div>
          <div className="info">{this.degrees}</div>
        </div>
      </div>
    );
  }
}
