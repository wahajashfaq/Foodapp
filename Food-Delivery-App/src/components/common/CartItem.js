import React from "react";
import {PlusOutlined, MinusOutlined, DeleteOutlined} from "@ant-design/icons"
import { useStoreDispatch, useStoreState } from "../../contexts/StoreContext";
import { Button } from "antd";
const CartItem = ({name,price,quantity,uid}) =>{
    const dispatch = useStoreDispatch();
    const { meals} = useStoreState();
    const addQuantity = () =>{
        const copyMeals = [...meals]
        const index = copyMeals.findIndex(item => item.uid === uid)
        copyMeals[index].quantity = copyMeals[index].quantity +1; 
        dispatch({type:"UPDATE_CART_MEALS",meals: copyMeals})
    }
    const reduceQuantity = () =>{
        const copyMeals = [...meals]
        const index = copyMeals.findIndex(item => item.uid === uid)
        copyMeals[index].quantity = copyMeals[index].quantity -1; 
        dispatch({type:"UPDATE_CART_MEALS",meals: copyMeals})
    }
    const removeItem = () =>{
        const copyMeals = [...meals]
        const filterMeals = copyMeals.filter(item => item.uid !== uid);
        dispatch({type:"UPDATE_CART_MEALS",meals: filterMeals})
        if(filterMeals.length<1)
        dispatch({type:"UPDATE_CART_RESTAURANT",restaurant: null})
    }
    return (<div className="cart-item-card">
        <table>
            <tbody>
                <tr>
                    <td className="name">
                        <strong>{name}</strong>
                    </td>
                    <td className="price">
                        Rs. {price}
                    </td>
                </tr>
            </tbody>
        </table>
        <div className="actions">
            <span>{quantity>1?
            <Button  onClick={()=>reduceQuantity()}><MinusOutlined className="icon" /></Button>:
            <Button  onClick={()=>removeItem()}><DeleteOutlined className="icon" /></Button>}<span className="count">{quantity}</span></span>
            <span><Button onClick={()=>addQuantity()}><PlusOutlined className="icon" /></Button></span>
        </div>
    </div>)
}

export default CartItem;