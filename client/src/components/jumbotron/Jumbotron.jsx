import React from "react";
import './jumbotron.scss' ;

function Jumbotron({ children }) {
  return (
        <div className="jumbotron"> 
            <h1>Hello World</h1>
            {children}
        </div>
  );
}

export default Jumbotron;