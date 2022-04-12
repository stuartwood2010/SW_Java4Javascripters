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
        <div>
            <h1 className="favDrinks">Featured Drinks</h1>
            <div className="drinksContainer">
                {favoriteDrinks.map((drink) => {
                return (
                    <div className="drinkContainer">
                        <h2 className="drinkName">{drink.name}</h2>   
                        <div key={drink._id} className="drinkCard">
                            <div className="drink">
                                <img src={drink.image} alt="{drink.name}" className="drinkPic"/>                  
                            </div>
                        </div>
                    </div>
                );
                })}
            </div>
        </div>
    )
}

export default SignatureDrinks;