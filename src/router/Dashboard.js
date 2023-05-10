import React from "react";
import { Outlet } from "react-router-dom";


const Dashboard = () => {
  return (
    <div className="wrapper" style={{ boxShadow: "box-shadow: 0 0 35px #eee" }}>
      {/* <Header /> */}
			top
      <div className="main">
        <Outlet />
      </div>
			bottom
      {/* <Footer /> */}
    </div>
  );
};

export default Dashboard;
