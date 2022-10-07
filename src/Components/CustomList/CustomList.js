import React, { Component } from "react";
import "./CustomList.css";
import $ from 'jquery';

export default class CustomList extends Component {
    state = {
        list: [],
        selected: ""
    }
    lists = {
        "states": ["الكل", "الخرطوم", "الجزيرة", "القضارف", "كسلا", "سنار", "البحر الأحمر", "نهر النيل", "النيل الأزرق", "النيل الأبيض", "الشمالية", "شمال دارفور", "جنوب دارفور", "وسط دارفور", "غرب دارفور", "شرق دارفور", "شمال كردفان", "جنوب كردفان", "غرب كردفان"],
        "genders": ["ذكر", "أنثى"],
        "majors": ["مشترك", "علمي", "أدبي"]
    }

    openList = ev => {
      if (!$(ev.target).parents('.list-container').hasClass('disabled') && !$(ev.target).hasClass('disabled')) {
        if ($(ev.target).hasClass('selected')) {
          $(ev.target).siblings('.list').slideToggle();
          $(ev.target).parent().toggleClass("open");
        } else if ($(ev.target).parent().hasClass('selected')) {
          $(ev.target).parent().siblings('.list').slideToggle();
          $(ev.target).parent().parent().toggleClass("open");
        }
      }
    }

    selecting = (ev, ch) => {
      this.setState({
        selected: ch
      });


      $(ev.target).parent().slideUp()
      $(ev.target).parent().parent().removeClass('open');

      if (this.props.selecting) {
        this.props.selecting(ev, ch);
      }
    }

    modifyLists = ["states", "majors"];

    componentDidUpdate(nextProps) {
      if (nextProps.selected) {
        if (this.props.selected !== nextProps.selected) {
          this.setState({
            selected: nextProps.selected
          })
        }
      }
    }

    componentDidMount() {
        if (this.props.list) {
          if (this.props.list !== 'custom') {
            let tmepList = [],
              tempSelected = "";

            if (this.modifyLists.indexOf(this.props.list ) >= 0 && !this.props.all) {
                tempSelected = this.lists[this.props.list][1];
            } else {
                tempSelected = this.lists[this.props.list][0];
            }

            for (let i = 0; i < this.lists[this.props.list].length; i++) {
                if (this.modifyLists.indexOf(this.props.list ) >= 0 && !this.props.all && i === 0) {
                    continue;
                }

                let choice = this.lists[this.props.list][i];

                tmepList.push((
                  <div key={i} className="option" onClick={ev => this.selecting(ev, choice)}>{choice}</div>
                ));

                if (i === this.lists[this.props.list].length - 1) {
                    this.setState({
                        list: [...tmepList],
                        selected: this.props.selected ?? tempSelected
                    });
                }
            }
          } else {
            let tmepList = [];

            for (let i = 0; i < this.props.items.length; i++) {

                let choice;

                if (Array.isArray(this.props.items[i])) {
                  choice = this.props.items[i][0];
                } else {
                  choice = this.props.items[i];
                }

                tmepList.push((
                  <div key={i} datatype={Array.isArray(this.props.items[i]) ? this.props.items[i][1] : ''} className="option" onClick={ev => this.selecting(ev, choice)}>{choice}</div>
                ));

                if (i === this.props.items.length - 1) {
                    this.setState({
                        list: [...tmepList],
                        selected: this.props.selected ?? Array.isArray(this.props.items[i]) ? this.props.items[0][0] : this.props.items[0]
                    });
                }
            }
          }
        }
    }

  render() {
    return (
      <div className={`list-container ${this.props.className ?? ''}`} key={this.state.list.length}>
        <div className="selected" onClick={this.openList}>
          <div className="open-arrow">{"<"}</div>
          <div className="name" key={this.state.selected}>{this.state.selected}</div>
        </div>
        <div className="list">
          {this.state.list}
        </div>
      </div>
    );
  }
}
