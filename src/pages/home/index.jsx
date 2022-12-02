import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
const { Header, Sider, Content } = Layout;

import "./index.scss";

export default function index() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const menuItemClick = (menuInfo) => {
    navigate(menuInfo.key);
  };
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          onClick={menuItemClick}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "gui",
              icon: <UserOutlined />,
              label: "数据概览",
            },
            {
              key: "version",
              icon: <VideoCameraOutlined />,
              label: "版本管理",
            },
            {
              key: "star",
              icon: <UploadOutlined />,
              label: "星球管理",
            },
            {
              key: "demo",
              icon: <UploadOutlined />,
              label: "示例管理",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            paddingLeft: 20,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
