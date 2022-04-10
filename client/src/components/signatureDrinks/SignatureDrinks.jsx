import React from "react";
import { Card, Container } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import {DRINKS} from '../../utils/queries'
import './signatureDrinks.scss'

const SignatureDrinks = () => {
    const {loading, data} = useQuery(DRINKS);
    const favoriteDrinks = data?.drinks;
    console.log(favoriteDrinks);

    if (loading) {
        return <h2>LOADING...</h2>;
    }
    return (
        <div>
            <Container>
                {favoriteDrinks.map((drink) => {
                    return (
                    <Card key={drink._id} border='dark'>
                        <Card.Img src={drink.image}/>
                        <Card.Body>
                            <Card.Title>{drink.name}</Card.Title>
                        </Card.Body>
                    </Card>
                    );
                })}
            </Container>
        </div>
    )
}

export default SignatureDrinks;