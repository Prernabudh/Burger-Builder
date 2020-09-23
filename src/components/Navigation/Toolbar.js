import React from "react";
import "./Toolbar.css";
import Logo from "../../components/Logo/Logo";
import NavigationItems from "./NavigationItems/NavigationItems";
import DrawerToggle from "../Navigation/SideDrawer/DrawerToggle/DrawerToggle";

const Toolbar = (props) => {
  return (
    <header className="Toolbar">
      <DrawerToggle clicked={props.drawerToggleClicked}></DrawerToggle>
      <div style={{ height: "80%" }}>
        <Logo></Logo>
      </div>
      <nav className="DesktopOnly">
        <NavigationItems></NavigationItems>
      </nav>
    </header>
  );
};

export default Toolbar;
