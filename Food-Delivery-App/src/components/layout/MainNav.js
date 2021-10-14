import React from "react";
import {Button} from "antd";
import { useHistory } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faSignInAlt, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import Logo from "../layout/Logo"
import { useAuth } from "../../contexts/AuthContext"
import { ROLE } from "../../constants/constants";
import { useLayout } from "../../contexts/LayoutContext";
import { useStoreDispatch } from "../../contexts/StoreContext";


const MainNav = () =>{
    

    const { logout, role } = useAuth();
    const { width } = useLayout();
    const history = useHistory();
    const dispatch = useStoreDispatch();
    const handleLogout = async () => {
        try {
            await logout()
            history.push("/login")
        } catch(e) {
            console.log(e);
        }
    }

    const redirectSignIn = () =>{
        try {
            history.push("/login")
        } catch(e) {
            console.log(e);
        }
    }

    return(
            <div className="app-brand container-full">
                <Logo />
                <div className="content-right">
                    {role === ROLE.USER && <div className="cart-container">
                        <FontAwesomeIcon className="cart" onClick={()=>history.push('/orderhistory')} icon={faUserCircle} />
                    </div>}
                    <div className="logout-container">
                        <Button shape={width>712? "round": "circle" } className="action-logout" onClick={(e)=>{
                            if(role === ROLE.USER) handleLogout() 
                            else    redirectSignIn()
                        }}>
                            {role === ROLE.USER ? <>
                                {width>712 && 'Log Out'} <FontAwesomeIcon icon={faSignOutAlt} />  
                            </> : <>
                            {width>712 && 'Sign in'} <FontAwesomeIcon icon={faSignInAlt} />
                            </>}
                        </Button>
                    </div>
                    <div className="cart-container">
                         <FontAwesomeIcon onClick={()=>dispatch({type: 'TOOGLE_CART'})} className="cart" icon={faShoppingBasket} />
                    </div>
                </div>    
            </div>
    ) 
}

export default MainNav;