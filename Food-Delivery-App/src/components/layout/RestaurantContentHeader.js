import React from "react";
import { PageHeader, Button } from "antd";

const RestaurantContentHeader = ({title,buttonText,buttonAction}) => {
    return (
        <div className="restaurant-content-header" >
            <PageHeader title={title} /> {buttonText &&<Button type="default" onClick={e=>buttonAction()}>{buttonText}</Button>}
        </div>
    );
}

export default RestaurantContentHeader;