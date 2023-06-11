import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import StartPage from "../pages/StartPage/StartPage";
import AllCoursesPage from "../pages/AllCoursesPage/AllCoursesPage";
import SingleCoursePage from "../pages/SingleCoursePage/SingleCoursePage";
import AuthPage from "../pages/AuthPage/AuthPage";
import CreateCoursePage from "../pages/AdminRightsPages/CreateCoursePage/CreateCoursePage";
import EditCoursePage from "../pages/AdminRightsPages/EditCoursePage/EditCoursePage";
import AllUsersPage from "../pages/AdminRightsPages/AllUsersPage/AllUsersPage";
import MyCoursesPage from "../pages/MyCoursesPage/MyCoursesPage";
import CoursesApplicationsPage from "../pages/AdminRightsPages/CoursesApplicationsPage/CoursesApplicationsPage";
import TeacherProfilePage from "../pages/TeacherProfilePage/TeacherProfilePage";
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage";

const Pages = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const role = useSelector((state) => state.user.currentUser.role);

  function renderRotes(isAuth, role) {
    if (!isAuth) {
      return (
        <Route exact path="/" element={<Dashboard />}>
          <Route index element={<StartPage />} />
          <Route path="/all-courses" element={<AllCoursesPage />} />
          <Route path="/courses/:id" element={<SingleCoursePage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route exact path="/registration" element={<AuthPage />} />
        </Route>
      );
    } else if (isAuth && role === "admin") {
      return (
        <Route exact path="/" element={<Dashboard />}>
          <Route index element={<StartPage />} />
          <Route path="/all-courses" element={<AllCoursesPage />} />
          <Route path="/courses/:id" element={<SingleCoursePage />} />
          <Route exact path="/create-course" element={<CreateCoursePage />} />
          <Route exact path="/edit-course/:id" element={<EditCoursePage />} />
          <Route exact path="/users" element={<AllUsersPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route
            exact
            path="/courses-applications"
            element={<CoursesApplicationsPage />}
          />
        </Route>
      );
    } else if (isAuth && role === "user") {
      return (
        <Route exact path="/" element={<Dashboard />}>
          <Route index element={<StartPage />} />
          <Route path="/all-courses" element={<AllCoursesPage />} />
          <Route path="/courses/:id" element={<SingleCoursePage />} />
          <Route path="/my-courses" element={<MyCoursesPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
        </Route>
      );
    } else if (isAuth && role === "teacher") {
      return (
        <Route exact path="/" element={<Dashboard />}>
          <Route index element={<StartPage />} />
          <Route path="/all-courses" element={<AllCoursesPage />} />
          <Route path="/courses/:id" element={<SingleCoursePage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/teacher-profile" element={<TeacherProfilePage />} />
        </Route>
      );
    }
  }
  return <Routes>{renderRotes(isAuth, role)}</Routes>;
};

export default Pages;
