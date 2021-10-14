import React, { useEffect, useState } from "react"
import MainNav from "../components/layout/MainNav"
import SearchInput from "../components/home/SearchInput"
import RestaurantList from "../components/home/RestaurantList"
import { db } from "../firebase/firebase";
import { DB_COLLECTIONS, RESTAURANT_STATUS } from "../constants/constants";
import { useAuth } from "../contexts/AuthContext";
import Cart from "../components/common/Cart";
import { useStoreState, useStoreDispatch } from "../contexts/StoreContext";


const Home  = () => {
  const {cartVisible} = useStoreState()
  const [restaurants,setRestaurants] = useState([])
  const dispatch = useStoreDispatch();
  const {currentUser} = useAuth();
  useEffect(()=>{
        db.collection(DB_COLLECTIONS.RESTAURANTS).where("status", "==", RESTAURANT_STATUS.ACTIVE)
        .onSnapshot((querySnapshot) => {
            let restaurants = [];
            querySnapshot.forEach((doc) => {
                restaurants.push(doc.data());
            });
            if(currentUser && currentUser.uid){
              restaurants = restaurants.filter(item => !item.users.includes(currentUser.uid))
            }
            setRestaurants(restaurants)
        });
  },[currentUser,dispatch])

  return (
    <>
      <MainNav />
      <div className="home-navbar container">
          <div className="search-container">
            <h1>Giving your Hunger<br/> a new Option!</h1> 
            <p>
            Order food from hundreds of restaurants in your neighborhood
            </p>
            <SearchInput />
          </div>
      </div>
      <div className="container restaurants-list">
        <h1>Popular restaurants</h1>
        <RestaurantList restaurants={restaurants} />
      </div>
      <Cart visible={cartVisible}/>
    </>
  )
}

export default Home;