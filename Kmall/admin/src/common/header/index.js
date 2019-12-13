import { Layout, Menu, Breadcrumb, Icon, Dropdown } from 'antd';
import React,{Component} from 'react'
import './index.css'
import {getUsername,removeUsername} from 'util'
import axios from 'axios'
import api from 'api'

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class AdminHeader extends Component{
   constructor(props){
      super(props)
      this.handleLogout = this.handleLogout.bind(this)
   }
   handleLogout(){
      /*
      axios({
        method: 'delete',
        url: 'http://127.0.0.1:3000/sessions/users'
      })
      .then(result=>{
        const data = result.data;
        if(data.code == 0){
           removeUsername();
           window.location.href = '/login'
        }
      })
      .catch(err=>{
         console.log(err)
      })
      */
      api.logout()
      .then(result=>{
        const data = result.data;
        if(data.code == 0){
           removeUsername();
           window.location.href = '/login'
        }
      })
      .catch(err=>{
         console.log(err)
      })
   }
   render(){
       const menu = (
           <Menu>
            <Menu.Item key="0" onClick={this.handleLogout}>
                <Icon type="logout" />退出
            </Menu.Item>
          </Menu>
        )
       return (
          <div className="AdminHeader">
              <Header className="header">
                <div className="logo">
                  <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                  >
                    <Menu.Item key="1">Kmall 后台管理系统</Menu.Item>
                  </Menu>
                </div>
                <Dropdown overlay={menu} trigger={['click']} className="drop-down">
                  <a className="ant-dropdown-link" href="#">
                    {getUsername()} <Icon type="down" />
                  </a>
                </Dropdown>
              </Header>
          </div>
       )
   }
}

export default AdminHeader