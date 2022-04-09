import React from "react";
import './jumbotron.scss' ;

function Jumbotron({ children }) {
  return (
    <div>
        <div className="jumbotron"> 
            {/* <h1>Hello World</h1> */}
            {children}
        </div>
          <div>

<h1>Section 2 </h1>
          </div>


        </div>
  );
}

export default Jumbotron;