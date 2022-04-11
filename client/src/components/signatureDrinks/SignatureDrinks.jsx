import React from "react";
import { useQuery } from '@apollo/client';
import {DRINKS} from '../../utils/queries'

const SignatureDrinks = () => {
    const {loading, data} = useQuery(DRINKS);
    const favoriteDrinks = data?.drinks;
    if (loading) {
        return <h2>LOADING...</h2>;
    }
    return (
        <div className="drinkContainer">
            <div className="drinks">
                {favoriteDrinks.map((drink) => {
                    return (
                    <div key={drink._id} className="drinkCard">
                        {/* <Card.Img src={drink.image}/>                        */}
                        <p>{drink.name}</p>                    
                    </div>
                    );
                })}
            </div>            
        </div>
    )
}

export default SignatureDrinks;