import React from "react";
import  "./jumbotron.scss";

function Jumbotron({ children }) {
  return (
    <div
    style={{height: 560, clear: "both", paddingTop: 120, textAlign: "center" }}
    >
      {children}
    </div>
  );
}

export default Jumbotron;