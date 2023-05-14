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

const Pages = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const role = useSelector((state) => state.user.currentUser.role_id);

  function renderRotes(isAuth, role) {
    if (!isAuth) {
      return (
        <Route exact path="/" element={<Dashboard />}>
          <Route index element={<StartPage />} />
          <Route path="/all-courses" element={<AllCoursesPage />} />
          <Route path="/courses/:id" element={<SingleCoursePage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route exact path="/registration" element={<AuthPage />} />
          <Route exact path="/create-course" element={<CreateCoursePage />} />
          <Route exact path="/edit-course/:id" element={<EditCoursePage />} />
        </Route>
      );
    } else if (isAuth && role === 200) {
      return (
        <Route exact path="/" element={<Dashboard />}>
          <Route index element={<StartPage />} />
          <Route path="/all-courses" element={<AllCoursesPage />} />
          <Route path="/courses/:id" element={<SingleCoursePage />} />
        </Route>
      );
    } else if (isAuth && role === 100) {
      return (
        <Route exact path="/" element={<Dashboard />}>
          <Route index element={<StartPage />} />
          <Route path="/all-courses" element={<AllCoursesPage />} />
          <Route path="/courses/:id" element={<SingleCoursePage />} />
        </Route>
      );
    }
  }
  return <Routes>{renderRotes(isAuth, role)}</Routes>;
};

export default Pages;
