import React, { Children } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="p-2 flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;

// outlet is somewhat like {Children}
