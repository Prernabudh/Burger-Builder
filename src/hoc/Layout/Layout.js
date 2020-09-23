import React, { useState } from "react";
import Aux from "../Auxx/Aux";
import "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };
  return (
    <Aux>
      <Toolbar drawerToggleClicked={sideDrawerToggleHandler}></Toolbar>
      <SideDrawer
        open={showSideDrawer}
        closed={sideDrawerClosedHandler}
      ></SideDrawer>
      <main className="content">{props.children}</main>
    </Aux>
  );
};

export default Layout;
