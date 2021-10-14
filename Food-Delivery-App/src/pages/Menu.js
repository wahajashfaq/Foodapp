import React, { useEffect, useState } from "react"
import { useParams} from "react-router-dom";
import MainNav from "../components/layout/MainNav";
import MenuList from "../components/menu/MenuList";
import {db} from "../firebase/firebase";
import { DB_COLLECTIONS } from "../constants/constants";
import Cart from "../components/common/Cart";
import { useLayout } from "../contexts/LayoutContext";
import { useStoreState } from "../contexts/StoreContext";


const Menu  = () => {
  const [restaurant,setRestaurant] = useState(undefined)
  const [meals,setMeals] = useState([]);
  const params = useParams();
  const {width} = useLayout()
  const {cartVisible} = useStoreState()

  useEffect(()=>{
    db.collection(DB_COLLECTIONS.RESTAURANTS).doc(params.id)
    .onSnapshot((doc) => {
        setRestaurant(doc.data())
    });
  },[params.id])

  useEffect(()=>{
    if(restaurant){
      db.collection(DB_COLLECTIONS.MEALS).where("ruid", "==", restaurant.uid)
          .onSnapshot((querySnapshot) => {
              let meals = [];
              querySnapshot.forEach((doc) => {
                  meals.push(doc.data());
              });
              setMeals(meals)
      });
    }
  },[restaurant])

  return (
    <>
      <MainNav />
      
      <div className="menu-list">
       {restaurant && <><div className="image" style={{backgroundImage: 'url('+restaurant.image+')'}}>
        </div>
        <div className="container menu-header">
          <h1>{restaurant.name}</h1>
          <p>{restaurant.description}</p>
        </div>
        <MenuList meals={meals} restaurant={restaurant}/>
        </>}
      </div>
      <Cart visible={width>1024? true: cartVisible}/>
    </>
  )
}

export default Menu;