import React, {useEffect,useMemo,useState} from "react";
import {Button, Layout, Table, Tag, message } from "antd";
import moment from "moment";
import RestaurantContentHeader from "../../components/layout/RestaurantContentHeader";
import { DB_COLLECTIONS, ORDER_STATUS } from "../../constants/constants";
import {db} from "../../firebase/firebase";
import { useRestaurant } from "../../contexts/RestaurantContext";
import OrderDetailsModal from "../../components/restaurantOwner/OrderDetailsModal";
import { addOrder } from "../../firebase/actions";
const {Content} = Layout;
const  Orders = () =>{
    const [orders,setOrders] = useState([]); 
    const [orderData,setOrderData] = useState(undefined);  
    const {restaurant} = useRestaurant();
    const columns = [
        {
            title: 'Id',
            dataIndex: 'uid',
            key: 'uid',
        },
        {
            title: 'User Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'User Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'User contact',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Total Price',
            key: 'price',
            dataIndex: 'price',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: status => {
                if(ORDER_STATUS.PLACED === status.val)
                  return  <Tag color="blue">{status.val}</Tag>
                else if(ORDER_STATUS.CANCELED === status.val)
                  return  <Tag color="red">{status.val}</Tag>
                else if(ORDER_STATUS.PROCESSING === status.val)
                  return  <Tag color="purple">{status.val}</Tag>
                else if(ORDER_STATUS.IN_ROUTE === status.val)
                  return  <Tag color="orange">{status.val}</Tag>
                else if(ORDER_STATUS.DELIVERED === status.val)
                  return  <Tag color="green">{status.val}</Tag>
            }
        },
        {
            title: 'Update Status',
            key: 'status',
            dataIndex: 'status',
            render: status => {
                if(ORDER_STATUS.PLACED === status.val)
                  return  <Button type="primary" onClick={e=>changeStatus(ORDER_STATUS.PROCESSING,status.uid)}>Change to {ORDER_STATUS.PROCESSING}</Button>
                else if(ORDER_STATUS.PROCESSING === status.val)
                  return  <Button type="primary" onClick={e=>changeStatus(ORDER_STATUS.IN_ROUTE,status.uid)}>Change to {ORDER_STATUS.IN_ROUTE}</Button>
                else if(ORDER_STATUS.IN_ROUTE === status.val)
                  return  <Button type="primary" onClick={e=>changeStatus(ORDER_STATUS.DELIVERED,status.uid)}>Change to {ORDER_STATUS.DELIVERED}</Button>
            }
        },
        {
            title: 'View',
            key: 'view',
            dataIndex: 'uid',
            render: val => 
                <Button type="link" onClick={(e)=>{
                    const order = orders.find(item => item.uid === val);
                    setOrderData(order)
                }}>View</Button>
        },
    ];

    const changeStatus=(status,uid)=>{
        const order = orders.find(item=>item.uid===uid);
        order.status.push({value:status,time: moment().unix()})
        addOrder(order).then(res =>{
            message.success("Status updated!")
        }).catch(err=>{
            message.error("Somethiong went wrong could not change status");
        })
    }

    useEffect(()=>{
        db.collection(DB_COLLECTIONS.ORDERS).where("restaurant.uid","==",restaurant.uid)
        .onSnapshot((querySnapshot) => {
            let orders = [];
            querySnapshot.forEach((doc) => {
                orders.push(doc.data());
            });
            setOrders(orders)
        });
    },[restaurant.uid])
    
    const data = useMemo(()=>{
        const compare = ( a, b ) => {
            if ( a.time < b.time ){
              return -1;
            }
            if ( a.time > b.time ){
              return 1;
            }
            return 0;
        }
        return orders.map(item =>{
            return {
                uid: item.uid,
                name: item.contactDetails.name,
                email: item.user.email,
                phone: item.contactDetails.phone,
                price: item.meals.map(obj => obj.price * obj.quantity).reduce((a,b)=>a+b),
                status: { val: item.status.sort(compare)[item.status.length -1].value, uid: item.uid}
            }
        })
    },[orders])

    
    return(
        <Content style={{ margin: '0 16px' }}>
        <div className="site-layout-background" >
          <RestaurantContentHeader title="Orders"/>
          <Table columns={columns} dataSource={data}
            pagination={{
                total: data.length,
                showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} items`,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50', '100'],
                defaultCurrent: 1
            }}
          />
          {orderData && <OrderDetailsModal orderData={orderData} closeModal={()=>{
              setOrderData(undefined);
          }}  />}
        </div>
      </Content>
    )
}

export default Orders;