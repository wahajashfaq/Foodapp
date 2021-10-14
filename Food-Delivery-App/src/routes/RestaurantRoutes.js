import React from "react";
import {
    Switch,
    Route,
} from "react-router-dom";
import routes from "../routes/restaurantRoutesConfig";

const RestaurantRoutes = () =>{
    return (
        <Switch>
            {routes.map(({path,Component,exact})=><Route key={path} exact={exact} path={path} render={()=><Component />} />)}
        </Switch>
    )
}

export default RestaurantRoutes;