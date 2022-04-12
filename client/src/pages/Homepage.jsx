import React from "react";
import SignatureDrinks from "../components/signatureDrinks/SignatureDrinks";

function Homepage() {    
    return (
        <div className="homepage" id="homepage">
            <img src="https://i.ibb.co/mTtJXVD/jumbotron.png" alt="capuccino"className="jumbotronImg"></img>
            <SignatureDrinks/>
        </div>
    )
}

export default Homepage;