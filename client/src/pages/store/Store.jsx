import React from "react";
import ProductCards from '../../components/card/Card';
import "./store.scss";

function Store() {
    return (
        <div className="store-page" id="store-page">
            <ProductCards/>
        </div>
    )
}

export default Store;