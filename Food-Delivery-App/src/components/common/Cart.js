import { Button } from "antd";
import React, {useMemo} from "react";
import { useHistory } from "react-router-dom";
import { useStoreState } from "../../contexts/StoreContext";
import CartItem from "./CartItem";

const Cart = ({visible}) =>{
    const { restaurant, meals } = useStoreState();
    const history = useHistory();
    const totaPrice = useMemo(()=>{
        if(meals && meals.length>0){
            const prices = meals.map(item => item.price * item.quantity);
            return prices.reduce((a,b)=>a+b);
        }
        else{
            return 0;
        }
    },[meals])

    if(visible)
    return (<div className="order-cart">
        <div className="order-cart-first">
            {!restaurant?<div className="empty">
                <h1>Your Cart</h1>
                <p>Start adding items to your cart</p>
            </div>
            :
            <>
            <h1>Your Order From {restaurant.name}</h1>
            {
                meals.map(item => <CartItem key={item.uid} uid={item.uid} quantity={item.quantity} name={item.name} price={item.price}/>)    
            }
            </>}
        </div>
        <div className="order-cart-second">
            <table>
                <tbody>
                    <tr>
                    <td><strong>Total</strong></td>
                    <td className="price"><strong>Rs. {totaPrice}</strong></td>
                    </tr>
                </tbody>
            </table>
            <Button size="large" className="checkout" onClick={()=>{
                history.push('/checkout')
            }} disabled={meals && meals.length>0?false:true}>Go To Checkout</Button>
        </div>
    </div>)
    else return <></>
}

export default Cart;