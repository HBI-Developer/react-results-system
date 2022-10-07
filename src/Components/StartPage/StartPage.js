import React, { Component } from 'react';
import './StartPage.css';

export default class StartPage extends Component {
  out = _ => {
    document.querySelector('.start-page').style.transform = 'translateY(-100%)';
  }
  render() {
    return (
    <div className="start-page" onClick={this.out}>
        <div className="container">
        <div className="logo">
            <div className="icon logo-icon"></div>
        </div>
        <div className="note">هذا الموقع مجرد عرض وحسب، لن يتم حفظ أو حذف أو تعديل أي بيانات.</div>
        <div className="note">جميع بيانات الطلاب في هذا الموقع تم توليدها عشوائياً.</div>
        </div>
    </div>
    )
  }
}
