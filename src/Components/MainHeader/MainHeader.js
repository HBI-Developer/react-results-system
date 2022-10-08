import React from 'react'
import { useNavigate } from 'react-router-dom';
import CheckPage from '../CheckPage/CheckPage';

export default function MainHeader(props) {
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem('RRS_username');
    sessionStorage.removeItem('RRS_ssn');
    sessionStorage.removeItem('RRS_role');
    
    switch(props.type) {
      case 'admin': {
        navigate('/admin-login');
      break;}

      case 'student': {
        navigate('/student-login');
      break;}

      default: {}
    }
  }
    return (
      <div className="header">
        <CheckPage />
        <div className="logo">
          <div className="icon logo-icon"></div>
        </div>
        <div className="welcome">
          <span>مرحباً بك، </span>
          <span className="username">
            {sessionStorage.getItem("RRS_username")}
          </span>
        </div>
        <div className="logout" onClick={logout}>تسجيل الخروج</div>
      </div>
    );
  }

