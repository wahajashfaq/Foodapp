import React,{useMemo, useState } from "react";
import MenuCard from "./MenuCard";

const MenuList = ({meals,restaurant}) =>{
    const [loading,setLoading] = useState(true);
    const mealRows = useMemo(()=>{
        setLoading(true)
        let tempMealList = []
        const mealList = []
        for(let i=0; i<meals.length; i++){
            tempMealList.push(meals[i])
            if(tempMealList.length === 2){
                mealList.push(tempMealList);
                tempMealList=[]
            }
        } 
        if(tempMealList.length>0){
            mealList.push(tempMealList)
        }
        setLoading(false)
        return mealList;
    },[meals])
    return(
        <div className="menu-card-container">
            {mealRows.map((item,index) => <div key={index} className="menu-card-row container">
                    {
                        item.map(obj => <MenuCard
                            key={obj.uid} 
                            name={obj.name}
                            image={obj.image} 
                            description={obj.description}
                            uid={obj.uid}
                            price={obj.price}
                            loading={loading}
                            menuRestaurant={restaurant}
                        /> )
                    }
                </div>
                )}
        </div>
    );
}

export default MenuList;