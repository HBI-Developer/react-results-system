import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CheckPage() {
  const navigate = useNavigate(),
    location = useLocation();
  useEffect(() => {
    let startPages = ["/", "/admin-login", "/student-login"],
      pathname = location.pathname;

    if (startPages.indexOf(pathname) !== -1) {
      if (sessionStorage.getItem("RRS_username") !== null) {
        if (sessionStorage.getItem("RRS_role") === "admin") {
          navigate("/admin-page");
        } else {
          navigate("/student-page");
        }
      }
    } else {
      if (sessionStorage.getItem("RRS_username") === null) {
        if (pathname === "/admin-page") {
          navigate("/admin-login");
        } else if (pathname === "/student-page") {
          navigate("/student-login");
        } else {
          navigate("/");
        }
      } else {
        if (
          (pathname === "/student-page" || pathname === "/certificate") &&
          sessionStorage.getItem("RRS_role") === "admin"
        ) {
          navigate("/admin-page");
        }

        if (
          pathname !== "/student-page" &&
          pathname !== "/certificate" &&
          sessionStorage.getItem("RRS_role") === "student"
        ) {
          navigate("/student-page");
        }
      }
    }
  });

  return <div style={{ display: "none" }}></div>;
}
