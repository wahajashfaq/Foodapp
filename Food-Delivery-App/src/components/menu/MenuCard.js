import { Button, Spin, Modal } from "antd";
import React from "react";
import {PlusOutlined,ExclamationCircleOutlined} from "@ant-design/icons";
import { useStoreDispatch, useStoreState } from "../../contexts/StoreContext";
import { useParams } from "react-router-dom";

const MenuCard = ({name,image,description,uid,loading,price,menuRestaurant}) =>{
    const dispatch =  useStoreDispatch();
    const params = useParams();
    const {restaurant, meals } =  useStoreState();
    return(
        <div className="menu-card">
            <div className="image-placeholder" >
                { loading?    <Spin className="loader" />
                :<>
                <img className="image" src={image} alt={name}/>
                <Button type="primary" shape="circle" className="add-button" icon={<PlusOutlined />}
                onClick={()=>{
                    const ruid = params.id;
                    const meal = {
                        name,
                        image,
                        description,
                        uid,
                        price,
                        quantity: 1,
                    }
                    if(restaurant){
                        if(restaurant.uid  === ruid){
                            const copyMeals = [...meals];
                            const findMeal = copyMeals.find(item => item.uid === uid);
                            if(!findMeal){
                                copyMeals.push(meal)
                                dispatch({type: "UPDATE_CART_MEALS",meals: copyMeals});
                            }
                        }
                        else{
                                Modal.confirm({
                                    title: 'You already have item in cart from another restaurant!',
                                    icon: <ExclamationCircleOutlined />,
                                    content: 'do you want to remove it?',
                                    okText: 'Yes',
                                    okButtonProps: {
                                        style:{background:"#FFC600",border:"#FFC600 1px solid"}
                                    },
                                    onCancel:e=>Modal.destroyAll(),
                                    onOk: e=>{
                                        dispatch({type:"RESET_CART"})
                                        dispatch({type:"UPDATE_CART_RESTAURANT",restaurant: menuRestaurant})

                                        dispatch({type:"UPDATE_CART_MEALS",meals: [meal]})
                                        Modal.destroyAll();
                                    },
                                    cancelText: 'No',
                                });
                        }
                    }
                    else{
                        dispatch({type:"UPDATE_CART_RESTAURANT",restaurant: menuRestaurant})
                        dispatch({type:"UPDATE_CART_MEALS",meals: [meal]})
                    }
                }}
                ></Button>
                </>
                }
            </div>
             <div className="item-details">
                <div>
                <h3>{name}</h3>
                <p>{description}</p>
                </div>
                <div>
                    <p className="price">
                        Rs. {price.toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MenuCard;