
import { faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Form, Button, Input,  Alert } from "antd";
import { useHistory } from "react-router-dom";
import Logo from "../components/layout/Logo"
import { useAuth } from "../contexts/AuthContext"

const ForgotPassword = () => {
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory();
  const onFinish = async (values) => {
    setSuccess("")
    setError("")
    setLoading(true)  
    try {
      await resetPassword(values.email)
      setSuccess("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  return (
    <>
      <div className="login-logo">
        <Logo />
      </div>
      <div className="login-container">
      <div className="login-form-container">
          <h2 className="text-center mb-4"><FontAwesomeIcon onClick={e => history.push("/login")} style={{float: 'left', cursor: 'pointer'}} icon={faArrowLeft}/>Password Reset</h2>
          {error && <Alert className="mb-3" message={error} type="error" closable={true} />}
          {success && <Alert className="mb-3" message={success} type="success" closable={true} />}
          <Form name="forgotpassword" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' },{type: "email",message: "Email format is not valid"}]}
          >
            <Input size="large" placeholder="Email"   />
          </Form.Item>
          <Button className="button" disabled={loading} size="large" htmlType="submit" loading={loading} >
            Reset Password 
          </Button>
          </Form>
      </div>
      </div>
    </>
  )
}

export default ForgotPassword;