import React, { useState } from "react"
import { Form, Button, Alert, Input } from "antd"
import { Link } from "react-router-dom"
import { addUser } from "../firebase/actions";
import { useAuth } from "../contexts/AuthContext"
import Logo from "../components/layout/Logo"
import { ROLE } from "../constants/constants";


const Signup = () => {
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
 
  const onFinish = (values) => {
    setError("")
    setSuccess("")
    setLoading(true)
    signup(values.email, values.password, values.name, ROLE.USER).then(res => {
          const { uid } = res.data;         
          const user = {
            uid,
            email: values.email,
            name: values.name,
            phone: values.phone,
            address: values.address,
            role: ROLE.USER
          } 
          addUser(user).then(res => {
            setSuccess("Account created successfully!")
            setLoading(false)
          }).catch(err =>{
            setError(err.message)
          })
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
        <Logo /> <Link to="/partner/signup" className="link">
          <Button shape="round">Become a Partner</Button></Link> 
    </div>  
    <div className="login-container">
      <div className="login-form-container">
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert type="error" message={error} className="mb-3" closable={true}/>}
          {success && <Alert type="success" message={success} className="mb-3" closable={true}/>}
          <Form name="signup" onFinish={onFinish}>
            <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please input your full name!' }]}
            >
              <Input size="large" placeholder="Full Name"   />
            </Form.Item>
            <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email!' },{type: "email",message: "Email format is not valid"}]}
            >
              <Input size="large" placeholder="Email"   />
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
                name="password"
                rules={[{ required: true, message: 'Please input your password!' },{ min: 6, message: 'Password should conttain atleast 6 characters' }]}
            >
              <Input.Password  size="large" placeholder="Password"/>
            </Form.Item>
            <Form.Item
              name="confirmpassword"
              dependencies={['password']}
              rules={[{ 
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

export default Signup;