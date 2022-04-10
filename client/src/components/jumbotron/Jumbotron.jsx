import React from "react";
import './jumbotron.scss' ;

function Jumbotron({ children }) {
  return (
        <div className="jumbotron"> 
            {children}
        </div>
  );
}

export default Jumbotron;