import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import React,{Component} from 'react'
import {NavLink} from "react-router-dom";
import './index.css'

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class AdminSider extends Component{
   render(){
       return (
          <div className="AdminSider">
              <Sider width={200} style={{ background: '#fff',minHeight:760 }}>
                <Menu
                  style={{ height: '100%', borderRight: 0 }}
                >
                    <Menu.Item key="1">
                        <NavLink exact to="/">首页</NavLink>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <NavLink to="/user">用户管理</NavLink>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <NavLink to="/category">分类管理</NavLink>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <NavLink to="/product">商品管理</NavLink>
                    </Menu.Item>
                </Menu>
              </Sider>
          </div>
       )
   }
}

export default AdminSider