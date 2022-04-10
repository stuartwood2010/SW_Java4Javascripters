import React from "react";
import Jumbotron from '../../components/jumbotron/Jumbotron';
import SignatureDrinks from "../../components/signatureDrinks/SignatureDrinks";
import "./homepage.scss";

function Homepage() {
    
    return (
        <div className="homepage" id="homepage">
            <Jumbotron/>        
            <SignatureDrinks/>
        </div>
    )
}

export default Homepage;