import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { Button } from "antd"


const SearchInput = () =>{

    return(
        <div className="input-icons">
            <FontAwesomeIcon className="icon" icon={faMapMarkerAlt}/>            
            <input className="input-field" type="text" placeholder="Enter your locality here"/>
            <Button size="large" className="serach-button">Search</Button>
        </div>
    )
}

export default SearchInput;