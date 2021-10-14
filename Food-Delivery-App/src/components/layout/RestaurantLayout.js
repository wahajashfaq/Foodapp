import React, { useState } from "react";
import { Layout, Menu } from 'antd';
import { useHistory } from "react-router-dom"
import {
  PieChartOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import RestaurantLoyoutLogo from "../layout/RestaurantLoyoutLogo";
import RestaurantHeader from "./RestauratHeader";
import RestaurantRoutes from "../../routes/RestaurantRoutes";
import { RestaurantProvider } from "../../contexts/RestaurantContext";

const { Footer, Sider } = Layout;

const LayoutRestaurant = () => {

  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };

    return (
      <RestaurantProvider>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} width={280} onCollapse={onCollapse}>
          <RestaurantLoyoutLogo  collapsed={collapsed}/>
          <Menu theme="dark" defaultSelectedKeys={['orders']} mode="inline">
            <Menu.Item key="orders" icon={<PieChartOutlined />} onClick={e=>history.replace('/restaurant/orders')}>
              Orders
            </Menu.Item>
            <Menu.Item key="meals" icon={<UnorderedListOutlined />} onClick={e=>history.replace('/restaurant/meals')}>
              Meals
            </Menu.Item>
            <Menu.Item key="users" icon={<UserOutlined />} onClick={e=>history.replace('/restaurant/users')}>
              Users
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <RestaurantHeader />
              <RestaurantRoutes />
          <Footer style={{ textAlign: 'center' }}>food delivery ©2021 </Footer>
        </Layout>
      </Layout>
      </RestaurantProvider>
    )
}

export default LayoutRestaurant;