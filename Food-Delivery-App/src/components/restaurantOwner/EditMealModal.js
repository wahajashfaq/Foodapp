import React, { useState } from "react";
import { Modal, Form, Input, Button, InputNumber, message } from "antd";
import ImageUpload from "../common/ImageUpload";
import { STORAGE } from "../../constants/constants";
import { useAuth } from "../../contexts/AuthContext";
import { addMeal } from "../../firebase/actions";


const EditMealModal = ({mealData,closeModal}) =>{
    const { currentUser } = useAuth()
    const [loading,setLoading] = useState(false)
    const onFinish = (values) => {
        setLoading(true);
        let meal = {
            name: values.name,
            description: values.description,
            price: values.price,
            uid: mealData.uid,
            image: mealData.image,
            ruid: currentUser.uid,
        }
        if(values.image){
          meal.image = values.image; 
        }
        addMeal(meal).then(res =>{
            message.success("Meal Updated");
            closeModal()
            setLoading(false);
        })
        .catch(err =>{
            message.error("Something went wrong")
            setLoading(false)
        })
    }

    const visible = mealData? true: false;

    return(
        <Modal footer={null} title="Edit Meal"  visible={visible}  onCancel={e=>closeModal()}>
        <Form name="addmeal" onFinish={onFinish}>
            <Form.Item
                name="name"
                rules={[{ required: true, message: 'Meal name is required!' }]}
                initialValue={mealData.name}
            >
              <Input size="large" placeholder="Meal Name"   />
            </Form.Item>
            <Form.Item name="description" 
              rules={[
                { required: true, message: 'Please input description about your meal!' },
                { max: 100, message: 'Max 100 characters allowed' },
              ]}
              initialValue={mealData.description}
            >
              <Input.TextArea  rows={2} placeholder="Description"/>
            </Form.Item>
            <Form.Item 
              name="image" 
            >
            <ImageUpload  folder={STORAGE.MEAL}  />
            </Form.Item>
            <Form.Item
              name="price"
              rules={[
                { required: true, message: 'Please input price!' },
                { pattern: new RegExp(/^[1-9]\d*$/), message: 'Price should be positive integer greater than 0'}
              ]}
              initialValue={mealData.price}
            >
              <InputNumber size="large" className="price-input" placeholder="Price"  />
            </Form.Item>
            <Form.Item>
              <Button className="add-meal-button" disabled={loading} loading={loading}  size="large"  htmlType="submit" >
                  Update
              </Button>
            </Form.Item>
          </Form>
        </Modal>
    )
}

export default EditMealModal;