import React from "react";
import Jumbotron from '../../components/jumbotron/Jumbotron'
import SignatureDrinks from "../../components/signatureDrinks/SignatureDrinks"
import "./homepage.scss";

function Homepage() {
    const drinks = ["Cold Brew", "Latte Macchiato", "Chai Tea"]
    return (
        <div className="homepage" id="homepage">
            <Jumbotron/>        
            <SignatureDrinks
            items={drinks}/>
        </div>
    )
}

export default Homepage;