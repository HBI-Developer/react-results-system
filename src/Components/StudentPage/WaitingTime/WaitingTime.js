import React, { Component } from "react";

export default class WaitingTime extends Component {
    state = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    }

    decreaseTime = null;

    componentDidUpdate(nextProps, nextState) {
        let days = +document.querySelector('.student-page .container .until-open .time:nth-child(2)').innerText,
            hours = +document.querySelector('.student-page .container .until-open .time:nth-child(4)').innerText,
            minutes = +document.querySelector('.student-page .container .until-open .time:nth-child(6)').innerText,
            seconds = +document.querySelector('.student-page .container .until-open .time:nth-child(8)').innerText;

        if (!days && !hours && !minutes && !seconds) {
            clearInterval(this.decreaseTime);
            window.location.pathname = '/student-page';
        }
    }

    componentDidMount() {
        let year = +sessionStorage.getItem("RRS_year"),
            month = +sessionStorage.getItem("RRS_month"),
            day = +sessionStorage.getItem("RRS_day"),
            hour = +sessionStorage.getItem("RRS_hour"),
            minute = +sessionStorage.getItem("RRS_minute"),
            diff = new Date(`${year}-${month + 1}-${day} ${hour}:${minute}`).getTime() - new Date().getTime();

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
                    seconds
                });

                setTimeout(() => {
                    this.decreaseTime = setInterval(() => {
                        let days = this.state.days,
                            hours = this.state.hours,
                            minutes = this.state.minutes,
                            seconds = this.state.seconds;

                        if (seconds > 0) {
                            seconds--;
                        } else if (minutes > 0) {
                            minutes--;
                            seconds = 59;
                        } else if (hours > 0) {
                            hours--;
                            minutes = 59;
                            seconds = 59;
                        } else if (days > 0) {
                            days--;
                            hours = 23;
                            minutes = 59;
                            seconds = 59;
                        }

                        this.setState({
                            days,
                            hours,
                            minutes,
                            seconds
                        });
                    }, 1000);
                }, 0);
            }, 0);
        }
    }
  render() {
    return (
      <div className="until-open">
        <div className="text">بقي حتى عرض النتائج:</div>
        <div key={"d" + this.state.days} className="time">{(this.state.days < 10 ? "0" : "") + this.state.days}</div>
        <span>:</span>
        <div key={"h" + this.state.hours} className="time">{(this.state.hours < 10 ? "0" : "") + this.state.hours}</div>
        <span>:</span>
        <div key={"m" + this.state.minutes} className="time">{(this.state.minutes < 10 ? "0" : "") + this.state.minutes}</div>
        <span>:</span>
        <div key={"s" + this.state.seconds} className="time">{(this.state.seconds < 10 ? "0" : "") + this.state.seconds}</div>
      </div>
    );
  }
}
