import React,{Component} from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  // HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import {getUsername} from 'util'

import Login from 'pages/login'
import Home from 'pages/home'
import User from 'pages/user'
import Category from 'pages/category'
import Product from 'pages/product'
import Ad from 'pages/ad'
import Err from './common/err/index.js'
import api from 'api'

class App extends Component{
	
	render(){
		// api.login()
		const HomeRoute = ({component:Component,...rest})=>{
			return <Route
					{...rest}
					render={(props)=>{
						return getUsername() ? <Component/> : <Redirect to='/login'/>
					}}
				/>
		}
		const LoginRoute = ({component:Component,...rest})=>{
			return <Route
					{...rest}
					render={(props)=>{
						return getUsername() ? <Redirect to='/'/> : <Component/>
					}}
				/>
		}
		return(
			<Router forceRefresh={true}>
				<div className='App'>
					<Switch>
						<HomeRoute path='/' exact component={Home} />
						<HomeRoute path='/user' component={User} />
						<HomeRoute path='/category' component={Category} />
						<HomeRoute path='/product' component={Product} />
						<HomeRoute path='/ad' component={Ad} />
						<LoginRoute path='/login' component={Login} />
						<Route component={Err} />
					</Switch>
				</div>
			</Router>
		)
	}
}



export default App