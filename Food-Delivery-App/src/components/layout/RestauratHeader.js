import React from "react";
import { Button, Layout, message, Switch } from "antd";
import { useHistory } from "react-router-dom";
import { LogoutOutlined } from '@ant-design/icons';
import { useAuth } from "../../contexts/AuthContext";
import { useRestaurant } from "../../contexts/RestaurantContext";
import { RESTAURANT_STATUS } from "../../constants/constants";
import { addRestaurant } from "../../firebase/actions";
const { Header } = Layout;


const RestaurantHeader = () =>{
    const {restaurant} = useRestaurant();
    const { logout } = useAuth();
    const history = useHistory();
    const handleLogout = async () => {
        try {
            await logout()
            history.push("/login")
        } catch(e) {
            console.log(e);
        }
    }

    const restaurantStatusChange = (val)=>{
        const obj = {
            ...restaurant,
            status: val? RESTAURANT_STATUS.ACTIVE: RESTAURANT_STATUS.INACTIVE
        }
        addRestaurant(obj).then(res=>{
            message.success("Status changed successfully!")
        }).catch(res=>{
            message.error("Could not change restaurant");
        });
    }

    return(
        <Header className="restaurant-header">
            Go live <Switch checked={restaurant.status === RESTAURANT_STATUS.ACTIVE} onChange={restaurantStatusChange} className="switch"autoFocus={false}/>
            <Button onClick={(e)=>{
                handleLogout()
            }} shape="round" className="restaurant-header-logout">Logout <LogoutOutlined /></Button>
            
        </Header>  
    ) 
}

export default RestaurantHeader;