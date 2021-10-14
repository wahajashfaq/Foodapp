import React from "react";
import { useHistory } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons'

const RestaurantLoyoutLogo = ({collapsed}) =>{

    const history = useHistory()
    
    return(
        <div className="restaurant-layout-logo" onClick={e => history.push('/restaurat')}>  
            <FontAwesomeIcon icon={faPizzaSlice} />
            {!collapsed && 'Food Delivery'}
        </div>
    ) 
}

export default RestaurantLoyoutLogo;