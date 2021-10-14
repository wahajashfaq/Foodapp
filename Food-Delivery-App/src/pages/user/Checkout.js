import React, { useEffect, useState } from "react";
import {Button, Form, Input, notification,} from "antd";
import { useHistory } from "react-router-dom";
import moment from "moment";
import MainNav from "../../components/layout/MainNav";
import { useStoreState, useStoreDispatch } from "../../contexts/StoreContext";
import {db} from "../../firebase/firebase";
import Cart from "../../components/common/Cart";
import { useLayout } from "../../contexts/LayoutContext";
import { DB_COLLECTIONS, ORDER_STATUS } from "../../constants/constants";
import { useAuth } from "../../contexts/AuthContext";
import uuid from "react-uuid";
import { addOrder } from "../../firebase/actions";

const Checkout = () =>{
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const {currentUser} = useAuth()
    const [user, setUser] = useState(undefined);
    const { restaurant, meals, cartVisible } = useStoreState();
    const dispatch = useStoreDispatch();
    const {width} = useLayout()
    const history = useHistory();
    const onFinish = (values)=>{
        setProcessing(true)
        const  order = {
            meals,
            restaurant,
            user,
            uid: uuid(),
            contactDetails: {
                name: values.name,
                phone: values.phone,
                address: values.address
            },
            status: [{
                value: ORDER_STATUS.PLACED,
                time: moment().unix(),
            }]
        }
        addOrder(order).then(res=>{
            setProcessing(false)
            notification.success({message: "Order placed sucessfully!"});
            dispatch({type:"RESET_CART"})
            history.push("/")
        })
        
    }

    useEffect(()=>{
        db.collection(DB_COLLECTIONS.USERS).doc(currentUser.uid)
        .onSnapshot((doc) => {
            setUser(doc.data());
            setLoading(false)
        });     
    },[currentUser.uid])

    return(
        <>
        <MainNav />
        <div className="container checkout-container">
            <h1>Order Confirmation</h1>
            {!loading && <Form name="order" onFinish={onFinish}>
            <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please input your full name!' }]}
                initialValue={user?.name}
            >
              <Input size="large" placeholder="Full Name"   />
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[
                { required: true, message: 'Please input your phone number!' },
                { pattern: new RegExp(/^[0][3]\d{9}$/), message: 'Phone number format should be 03XXXXXXXXX'}
              ]}
              initialValue={user?.phone}
            >
              <Input size="large" placeholder="Phone number 03XXXXXXXXX" />
            </Form.Item>
            <Form.Item name="address" 
              rules={[
                { required: true, message: 'Please input your address!' },
              ]}
              initialValue={user?.address}
            >
              <Input.TextArea  rows={2} placeholder="Address"/>
            </Form.Item>
            <Form.Item>
              <Button className="button" disabled={processing}  size="large"  htmlType="submit" loading={processing}>
                  Confirm Contact Details
              </Button>
            </Form.Item>
          </Form>}
        </div>
        <Cart visible={width>767? true: cartVisible}/>
        </>
    );
}
export default Checkout;