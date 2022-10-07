import React, { Component } from 'react';
import './LoadingScreen.css';

export default class LoadingScreen extends Component {
  render() {
    return (
    <div className="loading-screen">
        <div className="container">
            <div className="part"></div>
            <div className="part"></div>
            <div className="part"></div>
            <div className="part"></div>
        </div>
    </div>
    )
  }
}
