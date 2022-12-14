import React, { useEffect } from "react";
import $ from "jquery";
import { useDispatch } from "react-redux";
import "./App.css";
import AdminPage from "./Components/AdminPage/AdminPage";
import CertificatePage from "./Components/CertificatePage/CertificatePage";
import DegreesPage from "./Components/DegreesPage/DegreesPage";
import StatisticsPage from "./Components/StatisticsPage/StatisticsPage";
import StudentPage from "./Components/StudentPage/StudentPage";
import StudentsPage from "./Components/StudentsPageAdmin/StudentsPage";
import Subjects from "./Components/Subjects/Subjects";
import { initStudentsData } from "./Redux/Slices/studentsSlice";
import { initDegreesData } from "./Redux/Slices/degreesSlice";
import { initSubjectsData } from "./Redux/Slices/subjectsSlice";
import { HashRouter, Route, Routes } from "react-router-dom";
import ChooseLogin from "./Components/ChooseLogin/ChooseLogin";
import AdminLogin from "./Components/AdminLogin/AdminLogin";
import StudentLogin from "./Components/StudentLogin/StudentLogin";
import FourtyHundredFour from "./Components/errors/FourtyHundredFour";
import StartPage from "./Components/StartPage/StartPage";

export default function App() {
  const disp = useDispatch();

  useEffect(() => {
    $.getJSON("./data.json", (r) => {
      let students = r.students && r.students.length !== 0 ? r.students : [0],
        subjects = r.subjects && r.subjects.length !== 0 ? r.subjects : [0],
        degrees = r.degrees && r.degrees.length !== 0 ? r.degrees : [0],
        sorted = students.sort((a, b) => {
          let first = a.name,
            second = b.name;
          if (first > second) {
            return 1;
          }
          return -1;
        });
      disp(initStudentsData(sorted));
      disp(initDegreesData(degrees));
      disp(initSubjectsData(subjects));
    });
  });

  return (
    <HashRouter>
      <div className="app">
        <StartPage />
        <Routes>
          <Route exact path="/" element={<ChooseLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/admin-page" element={<AdminPage />} />
          <Route path="/student-page" element={<StudentPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/degrees" element={<DegreesPage />} />
          <Route path="/student-page" element={<StudentPage />} />
          <Route path="/certificate" element={<CertificatePage />} />
          <Route path="*" element={<FourtyHundredFour />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
