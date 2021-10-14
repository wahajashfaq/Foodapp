import React from "react";
import { useHistory } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons'

const Logo = () =>{

    const history = useHistory()
    
    return(
        <div className="app-logo" onClick={e => history.push('/')}>  
            <FontAwesomeIcon icon={faPizzaSlice} />
            Food Delivery
        </div>
    ) 
}

export default Logo;