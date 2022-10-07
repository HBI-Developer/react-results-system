import React, { Component } from "react";
import fadeInLoading from "../../Functions/fadeInLoading";

import "./PageName.css";

export default class PageName extends Component {

  goto = () => {
    fadeInLoading(this.props.backTo)
  }

  render() {
    return (
      <div className={`to-back ${(this.props.arrow === 'hidden') ? 'no-arrow' : ''}`}>
        <div className="back-arrow" onClick={this.goto}>{"<"}</div>
        <div className="page-title">{this.props.name}</div>
      </div>
    );
  }
}
