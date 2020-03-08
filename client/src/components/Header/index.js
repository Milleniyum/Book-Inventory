import React from "react";
import "./style.css";

function Header(props) {
  return (
    <div className="header text-center" style={{ backgroundImage: `url(${props.backgroundImage})` }}>
      {props.children}
    </div>
  );
}

export default Header;
