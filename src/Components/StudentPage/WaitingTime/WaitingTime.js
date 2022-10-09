import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

class WaitingTimeClass extends Component {
  state = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  decreaseTime = null;
  counterDecrease = 1;

  decreaseTimeFunction = () => {
    if (
      +sessionStorage.getItem("RRS_year") ||
      +sessionStorage.getItem("RRS_month") ||
      +sessionStorage.getItem("RRS_day") ||
      +sessionStorage.getItem("RRS_hour") ||
      +sessionStorage.getItem("RRS_minute")
    ) {
      let [year, month, day, hour, minute] = [
          +sessionStorage.getItem("RRS_year") ?? new Date().getFullYear(),
          +sessionStorage.getItem("RRS_month") + 1 ?? new Date().getMonth() + 1,
          +sessionStorage.getItem("RRS_day") ?? new Date().getDate(),
          +sessionStorage.getItem("RRS_hour") ?? 0,
          +sessionStorage.getItem("RRS_minute") ?? 0,
        ],
        diff =
          new Date(`${year}-${month}-${day} ${hour}:${minute}`).getTime() -
          new Date().getTime();

      if (diff > 0) {
        let [days, hours, minutes, seconds] = [
          Math.floor(diff / 86400000),
          Math.floor((diff % 86400000) / 3600000),
          Math.floor((diff % 3600000) / 60000),
          Math.floor((diff % 60000) / 1000),
        ];

        this.setState({
          days,
          hours,
          minutes,
          seconds,
        });

        setTimeout(() => {
          if (diff > 0) {
            this.decreaseTimeFunction();
          }
        }, 400);
      }
    }
  };

  componentDidUpdate() {
    let days = +document.querySelector(
        ".student-page .container .until-open .time:nth-child(2)"
      ).innerText,
      hours = +document.querySelector(
        ".student-page .container .until-open .time:nth-child(4)"
      ).innerText,
      minutes = +document.querySelector(
        ".student-page .container .until-open .time:nth-child(6)"
      ).innerText,
      seconds = +document.querySelector(
        ".student-page .container .until-open .time:nth-child(8)"
      ).innerText;

    if (!days && !hours && !minutes && !seconds) {
      if (this.counterDecrease) {
        this.counterDecrease = 0;
        clearInterval(this.decreaseTime);
        this.props.navigate(0);
      }
    }
  }

  componentDidMount() {
    let year = +sessionStorage.getItem("RRS_year"),
      month = +sessionStorage.getItem("RRS_month"),
      day = +sessionStorage.getItem("RRS_day"),
      hour = +sessionStorage.getItem("RRS_hour"),
      minute = +sessionStorage.getItem("RRS_minute"),
      diff =
        new Date(`${year}-${month + 1}-${day} ${hour}:${minute}`).getTime() -
        new Date().getTime();

    if (diff > 0) {
      let days = Math.floor(diff / 86400000),
        hours = Math.floor((diff % 86400000) / 3600000),
        minutes = Math.floor((diff % 3600000) / 60000),
        seconds = Math.floor((diff % 60000) / 1000);

      setTimeout(() => {
        this.setState({
          days,
          hours,
          minutes,
          seconds,
        });

        setTimeout(() => {
          this.decreaseTimeFunction();
        }, 0);
      }, 0);
    }
  }
  render() {
    return (
      <div className="until-open">
        <div className="text">بقي حتى عرض النتائج:</div>
        <div key={"d" + this.state.days} className="time">
          {(this.state.days < 10 ? "0" : "") + this.state.days}
        </div>
        <span>:</span>
        <div key={"h" + this.state.hours} className="time">
          {(this.state.hours < 10 ? "0" : "") + this.state.hours}
        </div>
        <span>:</span>
        <div key={"m" + this.state.minutes} className="time">
          {(this.state.minutes < 10 ? "0" : "") + this.state.minutes}
        </div>
        <span>:</span>
        <div key={"s" + this.state.seconds} className="time">
          {(this.state.seconds < 10 ? "0" : "") + this.state.seconds}
        </div>
      </div>
    );
  }
}

export default function WaitingTime(props) {
  const navigate = useNavigate();

  return <WaitingTimeClass {...props} navigate={navigate} />;
}
