import React,{Component} from 'react'
import {
  Switch,
  Route
} from "react-router-dom";
import CategoryList from './list.js'
import CategoryAdd from './add.js'

class Category extends Component{
	render(){
		return (
			<div className='Category'>
				<Switch>
					<Route path='/category' exact component={CategoryList}></Route>
					<Route path='/category/add' component={CategoryAdd}></Route>
				</Switch>
			</div>
		)
	}
}

export default Category