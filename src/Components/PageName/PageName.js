import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./PageName.css";

export default class PageName extends Component {

  render() {
    return (
      <div className={`to-back ${(this.props.arrow === 'hidden') ? 'no-arrow' : ''}`}>
        <Link className="back-arrow" to={this.props.backTo}>{"<"}</Link>
        <div className="page-title">{this.props.name}</div>
      </div>
    );
  }
}
