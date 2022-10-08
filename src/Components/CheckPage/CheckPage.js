import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function CheckPage() {
  const navigate = useNavigate();
  useEffect(() => {
    let startPages = ['/', '/admin-login', '/student-login'];

    if (startPages.indexOf(window.location.pathname) !== -1) {
      if (sessionStorage.getItem('RRS_username') !== null) {
        if (sessionStorage.getItem('RRS_role') === 'admin') {
          navigate('/admin-page');
        } else {
          navigate('/student-page');
        }
      }
    } else {
      if (sessionStorage.getItem('RRS_username') === null) {
        navigate('/')
      } else {
        if ((window.location.pathname === '/student-page' || window.location.pathname === '/certificate') && sessionStorage.getItem('RRS_role') === 'admin') {
          navigate('/admin-page');
        }

        if ((window.location.pathname !== '/student-page' && window.location.pathname !== '/certificate') && sessionStorage.getItem('RRS_role') === 'student') {
          navigate('/student-page');
        }
      }
    }
  });

  return (
    <div style={{display: 'none'}}></div>
  )
}
