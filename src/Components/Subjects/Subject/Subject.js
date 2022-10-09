import React, { Component } from "react";

export default class Subject extends Component {
  render() {
    return (
      <div className="column">
        <div className="subject" data-id={this.props.info.id}>
          {this.props.info.name}
        </div>
        <div className="major">
          <div className="name">{this.props.info.major}</div>
          <div className="options">
            <div className="edit" onClick={this.props.editing}>
              <div className="icon edit-icon"></div>
            </div>
            <div className="delete" onClick={this.props.confirm}>
              {"-"}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
