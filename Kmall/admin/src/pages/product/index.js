import React,{Component} from 'react'
import {
  Switch,
  Route
} from "react-router-dom";
import ProductList from './list.js'
import ProductSave from './save.js'
import ProductDetail from './detail.js'

class Product extends Component{
	render(){
		return (
			<div className='Product'>
				<Switch>
					<Route path='/product' exact component={ProductList}></Route>
					<Route path='/product/save/:productId?' component={ProductSave}></Route>
					<Route path='/product/detail/:productId?' component={ProductDetail}></Route>
				</Switch>
			</div>
		)
	}
}

export default Product