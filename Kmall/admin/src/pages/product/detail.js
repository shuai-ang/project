import React,{Component} from 'react'
import Layout from 'common/layout'
import UploadImage from 'common/uploadImage'
import RichEditor from 'common/rich-editor'
import { Breadcrumb,Form, Select, Input, Button,InputNumber } from 'antd'
import { connect } from 'react-redux'
import './index.css'
import {actionCreator} from './store/index.js'
import {UPLOAD_PRODUCT_IMAGE,UPLOAD_PRODUCT_DETAIL_IMAGE} from 'api/config.js'

const { Option } = Select;

class ProductDetail extends Component{
	constructor(props){
		super(props)
		// console.log(this.props.match)
		this.state = {
			productId:this.props.match.params.productId
		}
	}
	componentDidMount(){
		if(this.state.productId){
			let id = this.state.productId;
			this.props.handleDetailProduct(id)
		}
	}
	
	render(){
		const { 
				category,
				categoryName,
				name,
				description,
				price,
				stock,
				mainImage,
				images,
				detail
		} = this.props
		// console.log(categories)
		return (
			<div className='ProductDetail'>
				<Layout>
					<Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>商品管理</Breadcrumb.Item>
                        <Breadcrumb.Item>编辑商品</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className='Content'>
                    	<Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
					        
					        <Form.Item label="商品分类">
						          <Input value={categoryName} disabled={true} />
					        </Form.Item>
					        <Form.Item label="商品名称">
						          <Input value={name} disabled={true} />
					        </Form.Item>
					        <Form.Item label="商品描述">
						          <Input value={description} disabled={true} />
					        </Form.Item>
					        <Form.Item label="商品价格">
						          <InputNumber value={price} disabled={true} min={0} />
					        </Form.Item>
					        <Form.Item label="商品库存">
						          <InputNumber value={stock} disabled={true} min={0} />
					        </Form.Item>
					        <Form.Item 
						        label="封面图片"
						        required={true}
						        
					        >
					          
					        </Form.Item>
					        <Form.Item 
						        label="商品图片"
						        required={true}
						        
					        >
					          
					        </Form.Item>
					        <Form.Item label="商品详情">
					          
					        </Form.Item>
					        
					    </Form>
                    </div>
				</Layout>
			</div>
		)
	}
}
//将属性映射到组件中
const mapStateToProps = (state)=>{
	// console.log('aa',state.get('category').get('categories').toJS())
	return {
		
		categoryName:state.get('product').get('categoryName'),
		category:state.get('product').get('category'),
		name:state.get('product').get('name'),
		description:state.get('product').get('description'),
		price:state.get('product').get('price'),
		stock:state.get('product').get('stock'),
		mainImage:state.get('product').get('mainImage'),
		images:state.get('product').get('images'),
		detail:state.get('product').get('detail')
	}
}
//将方法映射到组件
const mapDispatchToProps = (dispatch)=>{
	return {
		
		handleDetailProduct:(id)=>{
			dispatch(actionCreator.DetailProductAction(id))
		}
	}
}
const WrappedProductDetail = Form.create({ name: 'coordinated' })(ProductDetail);
export default connect(mapStateToProps,mapDispatchToProps)(WrappedProductDetail)
