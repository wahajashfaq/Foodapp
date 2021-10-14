import React, { useState } from "react"
import { Form, Button, Alert, Input } from "antd"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import Logo from "../components/layout/Logo"
import { ROLE, STORAGE, RESTAURANT_STATUS } from "../constants/constants";
import { addRestaurant } from "../firebase/actions";
import ImageUpload from "../components/common/ImageUpload"

const RestaurantSignup = () => {
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
 
  const onFinish = async (values) => {
    setError("")
    setSuccess("")
    
    setLoading(true)
    
    signup(values.email, values.password, values.name, ROLE.RESTAURANT_OWNER).then(res => {
          setSuccess("Account created successfully!")
          const { uid } = res.data;   
          const restaurant = {
            uid,
            email: values.email,
            image: values.image,
            name: values.name,
            description: values.description,
            phone: values.phone,
            address: values.address,
            role: ROLE.RESTAURANT_OWNER,
            status: RESTAURANT_STATUS.INACTIVE,
            users: []
          } 
          addRestaurant(restaurant).then(res => {
            setSuccess("Account created successfully!")
            setLoading(false)
          }).catch(err =>{
            setError(err.message)
          })
          setLoading(false)
    }).catch(err =>{
          if(err.response?.data?.message){
            setError(err.response.data.message)
          }
          else{
            setError(err.message)  
          }
          setLoading(false)
    })

  }

  return (
    <>
    <div className="login-logo">
        <Logo /> <Link to="/signup" className="link">
          <Button shape="round">Signup as User</Button></Link> 
    </div>  
    <div className="login-container">
      <div className="login-form-container restaurant-signup-container">
          <h2 className="text-center mb-4">Partner Sign Up</h2>
          {error && <Alert type="error" message={error} className="mb-3" closable={true}/>}
          {success && <Alert type="success" message={success} className="mb-3" closable={true}/>}
          <Form name="signup" onFinish={onFinish}>
            <Form.Item
                name="name"
                rules={[{ required: true, message: 'Restaurant name is required!' }]}
            >
              <Input size="large" placeholder="Restaurant Name"   />
            </Form.Item>
            <Form.Item name="description" 
              rules={[
                { required: true, message: 'Please input description about type of cusine served!' },
              ]}
            >
              <Input.TextArea  rows={2} placeholder="Description"/>
            </Form.Item>
            <Form.Item 
              name="image" 
              rules={[{ required: true, message: 'Image is required!' }]}
              
            >
            <ImageUpload  folder={STORAGE.RESTAURANT}  />
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[
                { required: true, message: 'Please input your phone number!' },
                { pattern: new RegExp(/^[0][3]\d{9}$/), message: 'Phone number format should be 03XXXXXXXXX'}
              ]}
            >
              <Input size="large" placeholder="Phone number 03XXXXXXXXX" />
            </Form.Item>
            <Form.Item name="address" 
              rules={[
                { required: true, message: 'Please input your address!' },
              ]}
            >
              <Input.TextArea  rows={2} placeholder="Address"/>
            </Form.Item>
            <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email!' },{type: "email",message: "Email format is not valid"}]}
            >
              <Input size="large" placeholder="Email"   />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password  size="large" placeholder="Password"  />
            </Form.Item>
            <Form.Item
              name="confirmpassword"
              dependencies={['password']}
              rules={[
                { 
                  required: true, 
                  message: 'Please confirm your password!' 
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                      }
                      return Promise.reject("Confirm Password did not matched!");
                  },
                }),
              ]}
            >
              <Input.Password  size="large" placeholder="Confirm Password"  />
            </Form.Item>
            <Form.Item>
              <Button className="button" disabled={loading}  size="large"  htmlType="submit" loading={loading}>
                  Sign Up 
              </Button>
            </Form.Item>
          </Form>
        <div className="text-center mt-3">
          Already have an account? <Link to="/login" className="link">Log In</Link>
        </div>
      </div>
      </div>
    </>
  )
}

export default RestaurantSignup;