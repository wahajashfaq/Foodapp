import { Spin } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

const RestaurantCard = ({name,image,description,uid,loading}) =>{
    const history = useHistory();
    return(
        <div className="restaurant-card" onClick={()=>{
            history.push('/menu/'+uid)
        }}>
            <div className="image-placeholder" >
                { loading?    <Spin className="loader" />
                :
                <img className="image" src={image} alt={name}/>}
            </div> 
            <h3>{name}</h3>
            <p>{description}</p>
        </div>
    );
}

export default RestaurantCard;