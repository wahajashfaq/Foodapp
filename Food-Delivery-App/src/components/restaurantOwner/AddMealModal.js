import React, { useState } from "react";
import { Modal, Form, Input, Button, InputNumber, message } from "antd";
import uuid from 'react-uuid';
import ImageUpload from "../../components/common/ImageUpload";
import { STORAGE } from "../../constants/constants";
import { useAuth } from "../../contexts/AuthContext";
import { addMeal } from "../../firebase/actions";


const AddMealModal = ({visible,closeModal}) =>{
    const { currentUser } = useAuth()
    const [loading,setLoading] = useState(false)
    const onFinish = (values) => {
        setLoading(true);
        const uid = uuid();
        const meal = {
            name: values.name,
            description: values.description,
            image: values.image,
            price: values.price,
            uid: uid,
            ruid: currentUser.uid,
        }
        addMeal(meal).then(res =>{
            message.success("Meal Added");
            closeModal()
            setLoading(false)
        })
        .catch(err =>{
            message.error("Something went wrong")
            setLoading(false);
        })
    }

    return(
        <Modal footer={null} title="Add Meal" visible={visible}  onCancel={e=>closeModal()}>
        <Form name="addmeal" onFinish={onFinish}>
            <Form.Item
                name="name"
                rules={[{ required: true, message: 'Meal name is required!' }]}
            >
              <Input size="large" placeholder="Meal Name"   />
            </Form.Item>
            <Form.Item name="description" 
              rules={[
                { required: true, message: 'Please input description about your meal!' },
                { max: 100, message: 'Max 100 characters allowed' },
              ]}
            >
              <Input.TextArea  rows={2} placeholder="Description"/>
            </Form.Item>
            <Form.Item 
              name="image" 
              rules={[{ required: true, message: 'Image is required!' }]}
              
            >
            <ImageUpload  folder={STORAGE.MEAL}  />
            </Form.Item>
            <Form.Item
              name="price"
              rules={[
                { required: true, message: 'Please input price!' },
                { pattern: new RegExp(/^[1-9]\d*$/), message: 'Price should be positive integer greater than 0'}
              ]}
            >
              <InputNumber size="large" className="price-input" placeholder="Price"  />
            </Form.Item>
            <Form.Item>
              <Button className="add-meal-button" disabled={loading} loading={loading}   size="large"  htmlType="submit" >
                  Add
              </Button>
            </Form.Item>
          </Form>
        </Modal>
    )
}

export default AddMealModal;