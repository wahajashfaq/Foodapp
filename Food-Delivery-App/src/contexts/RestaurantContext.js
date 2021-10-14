import React, { useContext, useState, useEffect } from "react"
import Loader from "../components/common/Loader";
import { DB_COLLECTIONS } from "../constants/constants"; 
import {db} from "../firebase/firebase";
import { useAuth } from "./AuthContext";
 
const RestaurantContext = React.createContext()


export const useRestaurant = () => {
  return useContext(RestaurantContext)
}

export const RestaurantProvider = ({ children }) => {
  const [restaurant, setRestaurant] = useState(undefined)
  const {currentUser} = useAuth();
  const uid = currentUser.uid;
  
  useEffect(() => {
    db.collection(DB_COLLECTIONS.RESTAURANTS).doc(uid)
    .onSnapshot((doc) => {
        setRestaurant(doc.data());
    });
  }, [uid])

  const value = {
    restaurant
  }

  return (
    <RestaurantContext.Provider value={value}>
      {!restaurant? <Loader wrapperCLass="loader-wrapper" loaderClass="loader"/> : children}
    </RestaurantContext.Provider>
  )
}