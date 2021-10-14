import React,{useMemo, useState } from "react";
import RestaurantCard from "./RestaurantCard";


const RestaurantList = ({restaurants}) =>{

    const [loading,setLoading] =  useState(true);

    const restaurantRows = useMemo(()=>{
        setLoading(true);
        let tempRestaurantsList = []
        const restaurantsList = []
        for(let i=0; i<restaurants.length; i++){
            tempRestaurantsList.push(restaurants[i])
            if(tempRestaurantsList.length === 4){
                restaurantsList.push(tempRestaurantsList);
                tempRestaurantsList=[]
            }
        } 
        if(tempRestaurantsList.length>0){
            restaurantsList.push(tempRestaurantsList)
        }
        setLoading(false)
        return restaurantsList;
    },[restaurants])
    return(
        <div className="restaurant-card-container">
            {restaurantRows.map((item,index) => <div key={index} className="restaurant-card-row">
                    {
                        item.map(obj => <RestaurantCard
                            key={obj.uid} 
                            name={obj.name}
                            image={obj.image} 
                            description={obj.description}
                            uid={obj.uid}
                            loading={loading}
                        /> )
                    }
                </div>
            )}
        </div>
    );
}

export default RestaurantList;