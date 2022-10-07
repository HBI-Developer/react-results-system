import React, { Component } from "react";

export default class TimePicker extends Component {
  state = {
    year: sessionStorage.getItem("RRS_year") ? +sessionStorage.getItem("RRS_year") : new Date().getFullYear(),
    month: sessionStorage.getItem("RRS_month") ? +sessionStorage.getItem("RRS_month") : new Date().getMonth(),
    day: sessionStorage.getItem("RRS_day") ? +sessionStorage.getItem("RRS_day") : new Date().getDate(),
    hour: sessionStorage.getItem("RRS_hour") ? +sessionStorage.getItem("RRS_hour") : 0,
    minute: sessionStorage.getItem("RRS_minute") ? +sessionStorage.getItem("RRS_minute") : 0,
    disabledYear: 0,
    disabledMonth: 0,
    templateDay: [],
  };

  decreaseTime = null;

  changeTemplateDay = () => {
    let temp = [],
      last = new Date(this.state.year, parseInt(this.state.month) + 1, 0).getDate(),
      day = this.state.day < last ? this.state.day : last,
      disabledDay = 0,
      disabledMonth = 0,
      disabledYear = 0;

    if (this.state.year === new Date().getFullYear()) {
      disabledYear = 1;

      if (this.state.month === new Date().getMonth()) {
        disabledMonth = 1;

        disabledDay = new Date().getDate();

        if (this.state.day < new Date().getDate()) {
          day = new Date().getDate();
        }
      }
    }

    for (let i = 1; i <= last; i++) {
      temp.push(
        <div
          key={i}
          className={`day${i < disabledDay ? " disabled" : ""}${
            i === day ? " selected" : ""
          }`}
        >
          {i}
        </div>
      );

      if (i === last) {
        this.setState({
          templateDay: temp,
          disabledYear,
          disabledMonth,
          day,
        });

        sessionStorage.setItem("RRS_year", this.state.year);
        sessionStorage.setItem("RRS_month", this.state.month);
        sessionStorage.setItem("RRS_day", day);
        setTimeout(() => {
          this.changeWaintingTime();
        }, 0);
      }
    }
  };

  changeYear = (action, yearInput = null) => {
    let month = this.state.month,
      year = yearInput ? yearInput.value : this.state.year;
    if (action === "down") {
      if (year > new Date().getFullYear()) {
        year--;
      }
    } else if (action === "up") {
      year++;
    } else if (action === "wrote") {
      if (year < new Date().getFullYear()) {
        year = new Date().getFullYear();
      }
    }

    if (year === new Date().getFullYear()) {
      if (month < new Date().getMonth()) {
        month = new Date().getMonth();
      }
    }

    setTimeout(() => {
      this.setState({
        year,
        month,
      });

      document.querySelector(
        ".cover .time-picker .years .year-input .year"
      ).value = year;

      setTimeout(() => {
        this.changeTemplateDay();
      }, 0);
    }, 0);
  };

  changeMonth = (action) => {
    let month = this.state.month,
      year = this.state.year;
    if (action === "down") {
      if (
        !(
          this.state.year === new Date().getFullYear() &&
          this.state.month === new Date().getMonth()
        )
      ) {
        if (month) {
          month--;
        } else {
          month = 11;
          year--;
        }
      }
    } else if (action === "up") {
      if (month < 11) {
        month++;
      } else {
        month = 0;
        year++;
      }
    }

    setTimeout(() => {
      this.setState({
        month,
        year,
      });

      document.querySelector(
        ".cover .time-picker .years .year-input .year"
      ).value = year;

      setTimeout(() => {
        this.changeTemplateDay();
      }, 0);
    }, 0);
  };

  changeDay = ev => {
    if (ev.target.classList.value.indexOf("day") > -1 && ev.target.classList.value.indexOf("disabled") === -1) {
      this.setState({
        day: +ev.target.innerText
      });

      setTimeout(() => {
        this.changeTemplateDay();
      }, 0);
    }
  };

  changeHour = ev => {
    let hour = 0;
    if (ev.target.value < 24 && ev.target.value > 0) {
      hour = ev.target.value;
    } else if (ev.target.value > 23) {
      hour = 23;
    } else if (ev.target.value < 0) {
      hour = 0;
    }

    if (hour < 10) {
      ev.target.value = "0" + hour
    } else {
      ev.target.value = hour
    }

    setTimeout(() => {
      this.setState({
        hour
      });

      sessionStorage.setItem("RRS_hour", hour);

      setTimeout(() => {
        this.changeWaintingTime();
      }, 0);
    }, 0);
  }

  changeMinute = ev => {
    let minute = 0,
      val = +ev.target.value;
    if (val < 60 && val >= 0) {
      minute = val;
    } else if (val > 59) {
      minute = 59;
    } else if (val < 0 || val === 0) {
      minute = 0;
    }

    if (minute < 10) {
      ev.target.value = "0" + minute
    } else {
      ev.target.value = minute
    }

    setTimeout(() => {
      this.setState({
        minute
      });

      sessionStorage.setItem("RRS_minute", minute);

      setTimeout(() => {
        this.changeWaintingTime();
      }, 0);
    }, 0);
  }

  changeWaintingTime = () => {
    let waitingDate = new Date(`${this.state.year}-${this.state.month + 1}-${this.state.day} ${this.state.hour}:${this.state.minute}`).getTime(),
      diff = waitingDate - new Date().getTime(),
      days = 0,
      hours = 0,
      minutes = 0,
      seconds = 0;

    diff = diff > 0 ? diff : 0;

    days = Math.floor(diff / 86400000);
    hours = Math.floor((diff % 86400000) / 3600000);
    minutes = Math.floor((diff % 3600000) / 60000);
    seconds = Math.floor((diff % 60000) / 1000);

    days = days > 9 ? days : "0" + days;
    hours = hours > 9 ? hours : "0" + hours;
    minutes = minutes > 9 ? minutes : "0" + minutes;
    seconds = seconds > 9 ? seconds : "0" + seconds;

    clearInterval(this.decreaseTime);

    this.decreaseTime = null;

    document.querySelector(".cover .time-picker .until-open .counter").innerText = `${days}:${hours}:${minutes}:${seconds}`;

    setTimeout(() => {
      if (diff > 0) {
        this.decreaseTime = setInterval(() => {
          let time = document.querySelector(".cover .time-picker .until-open .counter").innerText.split(":");
  
          time[0] = +time[0];
          time[1] = +time[1];
          time[2] = +time[2];
          time[3] = +time[3];
  
          if (time[3] > 0) {
            time[3]--;
          } else if (time[2] > 0) {
            time[2]--;
            time[3] = 59;
          } else if (time[1] > 0) {
            time[1]--;
            time[2] = 59;
            time[3] = 59;
          } else if (time[0] > 0) {
            time[0]--;
            time[1] = 23;
            time[2] = 59;
            time[3] = 59;
          }
  
          time[0] = time[0] > 9 ? time[0] : "0" + time[0];
          time[1] = time[1] > 9 ? time[1] : "0" + time[1];
          time[2] = time[2] > 9 ? time[2] : "0" + time[2];
          time[3] = time[3] > 9 ? time[3] : "0" + time[3];
  
          document.querySelector(".cover .time-picker .until-open .counter").innerText = `${time[0]}:${time[1]}:${time[2]}:${time[3]}`;
  
          if (time[0] === 0 && time[1] === 0 && time[2] === 0 && time[3] === 0) {
            clearInterval(this.decreaseTime);
          }
        }, 1000);
      }
    }, 0);
  }

  reset = () => {
    let date = new Date();
    this.setState({
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      hour: 0,
      minute: 0
    });

    sessionStorage.removeItem('RRS_year');
    sessionStorage.removeItem('RRS_month');
    sessionStorage.removeItem('RRS_day');
    sessionStorage.removeItem('RRS_hour');
    sessionStorage.removeItem('RRS_minute');

    document.querySelector(".cover .time-picker .years .year-input .year").value = date.getFullYear();
    document.querySelector(".admin-page .cover .time-picker .hours .hour").value = "00";
    document.querySelector(".admin-page .cover .time-picker .hours .minute").value = "00";

    setTimeout(() => {
      this.changeTemplateDay();
    }, 0);
  }

  componentDidMount() {
    this.changeTemplateDay()
  }

  render() {
    return (
      <div className="time-picker" dir="ltr">
        <div className="title-bar">عرض النتائج بتاريخ...</div>
        <div className="years">
          <div
            className={`arrow prev ${
              this.state.disabledYear ? "disabled" : ""
            }`}
            onClick={() => this.changeYear("down")}
          >
            {"<"}
          </div>
          <div className="year-input">
            <input
              type="number"
              className="year open"
              min={new Date().getFullYear()}
              defaultValue={this.state.year}
              onBlur={(ev) => this.changeYear("wrote", ev.target)}
            />
          </div>
          <div className="arrow next" onClick={() => this.changeYear("up")}>
            {">"}
          </div>
        </div>
        <div className="months">
          <div
            className={`arrow prev ${
              this.state.disabledMonth ? "disabled" : ""
            }`}
            onClick={() => this.changeMonth("down")}
          >
            {"<"}
          </div>
          <div className="container">
            <div
              className="month"
              style={{ transform: `translateX(-${this.state.month * 100}%)` }}
            >
              يناير
            </div>
            <div
              className="month"
              style={{ transform: `translateX(-${this.state.month * 100}%)` }}
            >
              فبراير
            </div>
            <div
              className="month"
              style={{ transform: `translateX(-${this.state.month * 100}%)` }}
            >
              مارس
            </div>
            <div
              className="month"
              style={{ transform: `translateX(-${this.state.month * 100}%)` }}
            >
              أبريل
            </div>
            <div
              className="month"
              style={{ transform: `translateX(-${this.state.month * 100}%)` }}
            >
              مايو
            </div>
            <div
              className="month"
              style={{ transform: `translateX(-${this.state.month * 100}%)` }}
            >
              يونيو
            </div>
            <div
              className="month"
              style={{ transform: `translateX(-${this.state.month * 100}%)` }}
            >
              يوليو
            </div>
            <div
              className="month"
              style={{ transform: `translateX(-${this.state.month * 100}%)` }}
            >
              أغسطس
            </div>
            <div
              className="month"
              style={{ transform: `translateX(-${this.state.month * 100}%)` }}
            >
              سبتمبر
            </div>
            <div
              className="month"
              style={{ transform: `translateX(-${this.state.month * 100}%)` }}
            >
              أكتوبر
            </div>
            <div
              className="month"
              style={{ transform: `translateX(-${this.state.month * 100}%)` }}
            >
              نوفمبر
            </div>
            <div
              className="month"
              style={{ transform: `translateX(-${this.state.month * 100}%)` }}
            >
              ديسمبر
            </div>
          </div>
          <div className="arrow next" onClick={() => this.changeMonth("up")}>
            {">"}
          </div>
        </div>
        <div className="days" onClick={this.changeDay}>{this.state.templateDay}</div>
        <div className="hours">
          <input
            type="number"
            className="hour"
            min="0"
            max="23"
            defaultValue={
              this.state.hour < 10 ? "0" + this.state.hour : this.state.hour
            }
            onBlur={this.changeHour}
          />
          :
          <input
            type="number"
            className="minute"
            min="0"
            max="59"
            defaultValue={
              this.state.hour < 10 ? "0" + this.state.minute : this.state.minute
            }
            onBlur={this.changeMinute}
          />
        </div>
        <div className="until-open">
          <div className="text">بقي حتى العرض:</div>
          <div className="counter">00:00:00:00</div>
        </div>
        <div className="reset-time" onClick={this.reset}>إعادة ضبط</div>
      </div>
    );
  }
}
