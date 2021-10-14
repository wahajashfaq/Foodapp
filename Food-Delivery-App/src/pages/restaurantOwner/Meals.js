import React, { useState, useEffect } from "react";
import { Button, Layout, Table, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import RestaurantContentHeader from "../../components/layout/RestaurantContentHeader";
import AddMealModal from "../../components/restaurantOwner/AddMealModal";
import EditMealModal from "../../components/restaurantOwner/EditMealModal";
import { db } from "../../firebase/firebase";
import { DB_COLLECTIONS } from "../../constants/constants";
import { deleteMeal } from "../../firebase/actions";
import { useRestaurant } from "../../contexts/RestaurantContext";


const {Content} = Layout;
const  Meals = () =>{
    const[addModalVisible,setAddModalVisible] = useState(false);
    const {restaurant} = useRestaurant();
    const[editMeal,setEditMeal] = useState(undefined);
    const [data,setData] = useState([])
    const columns = [
        {
            title: 'Image',
            key: 'image',
            dataIndex: 'image',
            render: src => <img src={src} style={{width: 100,height: 100}} alt="Meal" />
            ,
        },
        {
            title: 'Id',
            dataIndex: 'uid',
            key: 'uid',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Edit',
            dataIndex: 'uid',
            key: 'edit',
            render: val => <Button type="link" onClick={()=>{
                const meal = data.find(item => item.uid === val);
                setEditMeal(meal)
            }}>Edit</Button>
        },  
        {
            title: 'Delete',
            dataIndex: 'uid',
            key: 'delete',
            render: val => 
                <Button type="danger" onClick={()=>{
                    Modal.confirm({
                        title: 'Are you sure you want to delete this meal?',
                        icon: <ExclamationCircleOutlined />,
                        content: 'meal will be deleted',
                        okText: 'Confirm',
                        onCancel:e=>Modal.destroyAll(),
                        onOk: e=>deleteHandler(val),
                        cancelText: 'Cancel',
                    });
                }}>Delete</Button>
        },
    ];

    const deleteHandler = (val) =>{
        deleteMeal(val).then(res=>{
            message.success("Meal deleted successfully!");
        }).catch(err=>{
            message.error("Something went wrong could not delete meal!")
        }).finally(()=>{
            Modal.destroyAll();
        })
    }
    
    useEffect(()=>{
        db.collection(DB_COLLECTIONS.MEALS).where("ruid","==",restaurant.uid)
        .onSnapshot((querySnapshot) => {
            let meals = [];
            querySnapshot.forEach((doc) => {
                meals.push(doc.data());
            });
            setData(meals)
        });
  },[restaurant.uid])

    return(
        <Content style={{ margin: '0 16px' }}>
        <div className="site-layout-background" >
            <RestaurantContentHeader title="Meals" buttonText="Add Meal" buttonAction={()=>{setAddModalVisible(true)}}/>
          <Table columns={columns} dataSource={data}
            pagination={{
                total: data.length,
                showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} items`,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50', '100'],
                defaultCurrent: 1
            }}
          />
        </div>
        {addModalVisible  && <AddMealModal visible={addModalVisible} closeModal={()=>{setAddModalVisible(false)}}  />}
        {editMeal  && <EditMealModal mealData={editMeal} closeModal={()=>{setEditMeal(undefined)}}  />}
      </Content>
    )
}

export default Meals;