import { db } from "./firebase";
import { DB_COLLECTIONS } from "../constants/constants";


const addUser = (user) => {
    return new Promise((resolve,reject)=>{
        db.collection(DB_COLLECTIONS.USERS).doc(user.uid).set(user).then(() => {
            resolve(true)       
        })
        .catch((error) => {
            console.log(error);
            reject(false)
        });
    })
}

const addRestaurant = (restaurant) => {
    return new Promise((resolve,reject)=>{
        db.collection(DB_COLLECTIONS.RESTAURANTS).doc(restaurant.uid).set(restaurant).then(() => {
            resolve(true)       
        })
        .catch((error) => {
            console.log(error);
            reject(false)
        });
    })
}

const addMeal = (meal) => {
    return new Promise((resolve,reject)=>{
        db.collection(DB_COLLECTIONS.MEALS).doc(meal.uid).set(meal).then(() => {
            resolve(true)       
        })
        .catch((error) => {
            console.log(error);
            reject(false)
        });
    })
}

const deleteMeal = (uid) => {
    return new Promise((resolve,reject)=>{
        db.collection(DB_COLLECTIONS.MEALS).doc(uid).delete().then(() => {
            resolve(true)
        }).catch((error) => {
            console.error("Error removing document: ", error);
            reject(false)
        });
    })
}

const addOrder = (order) => {
    return new Promise((resolve,reject)=>{
        db.collection(DB_COLLECTIONS.ORDERS).doc(order.uid).set(order).then(() => {
            resolve(true)       
        })
        .catch((error) => {
            console.log(error);
            reject(false)
        });
    })
}

export { addUser, addRestaurant, addMeal, deleteMeal, addOrder }