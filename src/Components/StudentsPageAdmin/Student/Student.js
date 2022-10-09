import React, { Component } from "react";

export default class Student extends Component {
  render() {
    return (
      <div className="student">
        <div className="info-name">
          <div className="open-arrow" onClick={this.props.clicking}>
            {"<"}
          </div>
          <div className="title">
            <div className="name">{this.props.info.name}</div>
            <div className="options">
              <div
                className="edit"
                onClick={(ev) =>
                  document.querySelector(".confirm").style.display !== "block"
                    ? this.props.editing(ev)
                    : ""
                }
              >
                <div className="icon edit-icon"></div>
              </div>
              <div className="delete" onClick={this.props.removing}>
                {"-"}
              </div>
            </div>
          </div>
        </div>
        <div className="info">
          <div className="name">الرقم الوطني</div>
          <div className="value">{this.props.info.ssn}</div>
          <div className="name">العمر</div>
          <div className="value">{this.props.info.age}</div>
          <div className="name">الجنس</div>
          <div className="value">{this.props.info.gender}</div>
          <div className="name">المدرسة</div>
          <div className="value">{this.props.info.school}</div>
          <div className="name">الولاية</div>
          <div className="value">{this.props.info.state}</div>
          <div className="name">رقم الجلوس</div>
          <div className="value">{this.props.info.sittingNumber}</div>
          <div className="name">التخصص</div>
          <div className="value">{this.props.info.major}</div>
        </div>
      </div>
    );
  }
}
