import React, {  useState } from "react"
import { Form, Button, Input, Alert } from "antd"
import { Link, Redirect, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import Logo from "../components/layout/Logo"
import { ROLE } from "../constants/constants"


const Login = () => {
  const { login, role } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const location = useLocation()

  const onFinish = async (values) => {
    setError("")
    setLoading(true)
    try {
      await login(values.email, values.password);
    } catch {
      setError("Failed to login invalid email or password")
    }

    setLoading(false)
  };

  const { state } = location;  
  

  if(role===ROLE.USER)
    return state && state.from? <Redirect  to={state.from}/> : <Redirect  to="/"/>;
  else if(role===ROLE.RESTAURANT_OWNER)
    return <Redirect  to="/restaurant/orders"/>
  return (
    <>
      <div className="login-logo">
        <Logo /><Link to="/partner/signup" className="link">
          <Button shape="round">Become a Partner</Button></Link>
      </div>
      <div className="login-container">  
        <div className="login-form-container">
          <h2 className="text-center mb-4">Log In</h2>
            {error && <Alert className="mb-3" message={error} type="error" closable={true} />}
            <Form
              name="login"
              onFinish={onFinish}
            >
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
              <Form.Item>
                <Button  disabled={loading} className="button"  size="large"  htmlType="submit" loading={loading}>
                  Log In 
                </Button>
              </Form.Item>
            </Form>
            <div className="text-center">
                <Link to="/forgot-password" className="link">Forgot Password?</Link>
            </div>
            <div className="text-center">
              Need an account? <Link to="/signup" className="link">Sign Up</Link>
            </div>
        </div>
      </div>
    </>
  )
}

export default Login;