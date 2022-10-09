import React, { Component } from "react";
import NumberInput from "../NumberInput/NumberInput";
import "./TablesPagination.css";

export default class TablesPagination extends Component {
  nothing = (<div className="footer-table"></div>);

  pagination = function () {
    if (Math.ceil(this.props.items / this.props.limit) > 1) {
      return (
        <div className="pagination">
          <div
            className={`prev ${this.props.current === 1 ? "disabled" : ""}`}
            onClick={(ev) => this.props.clicking(ev, "prev")}
          >
            {"<"}
          </div>
          <div className="pages">
            <NumberInput
              className={"current"}
              min={1}
              max={Math.ceil(this.props.items / this.props.limit)}
              default={this.props.current}
              bluring={(ev) => this.props.clicking(ev, "write")}
            />
            <span>/</span>
            <div className="pages-number">
              {Math.ceil(this.props.items / this.props.limit)}
            </div>
          </div>
          <div
            className={`next ${
              this.props.current ===
              Math.ceil(this.props.items / this.props.limit)
                ? "disabled"
                : ""
            }`}
            onClick={(ev) => this.props.clicking(ev, "next")}
          >
            {">"}
          </div>
        </div>
      );
    } else {
      return this.nothing;
    }
  };

  render() {
    return this.pagination();
  }
}
