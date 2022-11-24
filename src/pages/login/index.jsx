import React from "react";
import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import loginBoxLeftUrl from "../../assets/images/login_left.png";
import "./index.scss";
const Login = () => {
  const navigate = useNavigate();
  
  const onFinish = (values) => {
    navigate("/home");
  };

  return (
    <div className="login_bgc">
      <div className="login_box">
        <div className="login-box-left">
          <img className="box-left-img" src={loginBoxLeftUrl} alt="" />
        </div>
        <div className="login-box-right">
          <h1>登录</h1>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "请输入用户名!" }]}
              initialValue="admin"
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "请输入密码!" }]}
              initialValue="123456"
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                size="large"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
