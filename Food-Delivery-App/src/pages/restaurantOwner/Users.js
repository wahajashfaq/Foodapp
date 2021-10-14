import React, { useEffect, useState } from "react";
import {Layout, Table, Button, message} from "antd";
import RestaurantContentHeader from "../../components/layout/RestaurantContentHeader";
import {db} from "../../firebase/firebase";
import {DB_COLLECTIONS} from "../../constants/constants";
import { useRestaurant } from "../../contexts/RestaurantContext";
import { addRestaurant } from "../../firebase/actions";
const {Content} = Layout;
const  Users = () =>{
    const {restaurant} = useRestaurant();
    const [users,setUsers] = useState([]);
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Status',
            dataIndex: 'uid',
            key: 'status',
            render: (val)=>{
                if(restaurant.users && restaurant.users.includes(val)){
                    return "Blocked" 
                }
                else{
                    return "Allowed"
                }
            }
        },
        {
            title: 'Block/Unblock',
            dataIndex: 'uid',
            key: 'status',
            render: (val)=>{
                if(restaurant.users && restaurant.users.includes(val)){
                    return <Button type="primary" onClick={e=>unblockUser(val)}>
                        Unblock
                    </Button> 
                }
                else{
                    return <Button type="danger" onClick={e=>blockUser(val)}>
                    Block
                </Button>
                }
            }
        }
    ];

    const blockUser = (val)=>{
        const obj ={
            ...restaurant,
        }
        if(obj.users){
            if(!obj.users.includes(val))
                obj.users.push(val)
        }
        else {
            obj.users = [val]
        }
        addRestaurant(obj).then(res=>{
            message.success("User blocked successfully");
        }).catch(err=>{
            message.error("Something went wrong couuld not block user");
        })
    }

    const unblockUser = (val)=>{
        const obj ={
            ...restaurant,
        }
        if(obj.users && obj.users.includes(val)){
            const index = obj.users.findIndex(item=>item===val)
            obj.users.splice(index,1);
        }
       
        addRestaurant(obj).then(res=>{
            message.success("User unblocked successfully");
        }).catch(err=>{
            message.error("Something went wrong couuld not block user");
        })
    }

    useEffect(()=>{
        db.collection(DB_COLLECTIONS.USERS)
        .onSnapshot((querySnapshot) => {
            let users = [];
            querySnapshot.forEach((doc) => {
                users.push(doc.data());
            });
            setUsers(users)
        });
    })
    return(
        <Content style={{ margin: '0 16px' }}>
        <div className="site-layout-background" >
          <RestaurantContentHeader title="Users"/>
          <Table columns={columns} dataSource={users}
            pagination={{
                total: users.length,
                showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} items`,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50', '100'],
                defaultCurrent: 1
            }}
          />
        </div>
      </Content>
    )
}

export default Users;